from __future__ import annotations

import logging
import time
import uuid
from collections import defaultdict
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from assessment_agent import agent, db
from assessment_agent.config import settings
from assessment_agent.guardrails import InputBlocked, validate_input
from assessment_agent.models import (
    ConversationState,
    CreateConversationResponse,
    MessageOut,
    MessageMetadata,
    SendMessageRequest,
    SendMessageResponse,
)

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


# ---------------------------------------------------------------------------
# Lifespan (DB pool)
# ---------------------------------------------------------------------------


@asynccontextmanager
async def lifespan(_app: FastAPI):
    logger.info("Connecting to database...")
    await db.init_pool(settings.database_url)
    logger.info("Database ready.")
    yield
    logger.info("Shutting down database pool...")
    await db.close_pool()


app = FastAPI(
    title="Number6 Assessment Agent",
    version="0.1.0",
    lifespan=lifespan,
)

_origins = settings.origins_list
_wildcard = "*" in _origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if _wildcard else _origins,
    allow_credentials=not _wildcard,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Rate limiting (simple in-memory)
# ---------------------------------------------------------------------------

_ip_requests: dict[str, list[float]] = defaultdict(list)
_RATE_LIMIT_WINDOW = 60  # seconds
_RATE_LIMIT_MAX = 30  # requests per window
_SESSION_MESSAGE_LIMIT = 100


def _check_ip_rate_limit(ip: str) -> None:
    now = time.time()
    timestamps = _ip_requests[ip]
    # Prune old entries
    _ip_requests[ip] = [t for t in timestamps if now - t < _RATE_LIMIT_WINDOW]
    if len(_ip_requests[ip]) >= _RATE_LIMIT_MAX:
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Please wait a moment and try again.",
        )
    _ip_requests[ip].append(now)


# ---------------------------------------------------------------------------
# Error handler
# ---------------------------------------------------------------------------


@app.exception_handler(Exception)
async def global_exception_handler(_request: Request, exc: Exception):
    logger.exception("Unhandled error: %s", exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred. Please try again later."},
    )


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.post("/api/conversations", response_model=CreateConversationResponse)
async def create_conversation(request: Request):
    _check_ip_rate_limit(request.client.host if request.client else "unknown")

    session_id = await db.create_session()
    welcome = await agent.generate_welcome(session_id)

    return CreateConversationResponse(session_id=session_id, message=welcome)


@app.post(
    "/api/conversations/{session_id}/messages",
    response_model=SendMessageResponse,
)
async def send_message(
    session_id: uuid.UUID, body: SendMessageRequest, request: Request
):
    _check_ip_rate_limit(request.client.host if request.client else "unknown")

    session = await db.get_session(session_id)
    if session is None:
        raise HTTPException(status_code=404, detail="Session not found.")

    # Check message limit
    msg_count = await db.get_message_count(session_id)
    if msg_count >= _SESSION_MESSAGE_LIMIT:
        raise HTTPException(
            status_code=429,
            detail="Message limit reached for this session.",
        )

    # Layer 1: input validation (regex patterns)
    try:
        validate_input(body.content)
    except InputBlocked:
        # Return a polite redirect instead of an error. We don't want to
        # reveal that a guardrail triggered (that helps attackers iterate).
        redirect_msg = MessageOut(
            role="assistant",
            content=(
                "Let's stay focused on your AI readiness assessment! "
                "Could you tell me a bit about your organisation?"
            ),
            metadata=MessageMetadata(),
        )
        # Store both the user message and redirect so the conversation
        # history remains coherent.
        await db.add_message(session_id, "user", body.content)
        await db.add_message(
            session_id,
            "assistant",
            redirect_msg.content,
            redirect_msg.metadata.model_dump(mode="json"),
        )
        return SendMessageResponse(message=redirect_msg)

    response_msg = await agent.handle_message(session_id, body.content)
    return SendMessageResponse(message=response_msg)


@app.get(
    "/api/conversations/{session_id}",
    response_model=ConversationState,
)
async def get_conversation(session_id: uuid.UUID):
    session = await db.get_session(session_id)
    if session is None:
        raise HTTPException(status_code=404, detail="Session not found.")

    db_messages = await db.get_messages_by_session(session_id)
    messages = []
    last_progress = 0.0
    for msg in db_messages:
        meta = msg.get("metadata")
        if meta and "progress" in meta:
            last_progress = meta["progress"]
        messages.append(
            MessageOut(
                role=msg["role"],
                content=msg["content"],
                metadata=meta,
                created_at=msg["created_at"],
            )
        )

    return ConversationState(
        session_id=session["id"],
        messages=messages,
        lead_data=session.get("lead_data"),
        progress=last_progress,
        status=session["status"],
        created_at=session["created_at"],
    )
