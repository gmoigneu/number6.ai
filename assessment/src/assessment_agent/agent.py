from __future__ import annotations

import json
import logging
import uuid

from openai import AsyncOpenAI

from assessment_agent import db
from assessment_agent.config import settings
from assessment_agent.guardrails import (
    SANDWICH_REMINDER,
    check_output_for_leaks,
    enclose_user_message,
)
from assessment_agent.models import MessageMetadata, MessageOut
from assessment_agent.prompts import SYSTEM_PROMPT

logger = logging.getLogger(__name__)

_client: AsyncOpenAI | None = None


def _get_client() -> AsyncOpenAI:
    global _client
    if _client is None:
        _client = AsyncOpenAI(api_key=settings.openai_api_key)
    return _client


def _build_chat_history(db_messages: list[dict]) -> list[dict]:
    """Convert stored messages into the OpenAI chat format.

    Applies two structural defenses:
    - Layer 2 (random enclosure): wraps user messages in unique boundary tokens
    - Layer 4 (sandwich defense): appends a system reminder after the last user message
    """
    history: list[dict] = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in db_messages:
        role = msg["role"]
        if role == "assistant":
            # Reconstruct the full JSON the model originally returned so it
            # sees its own structured outputs in context.
            meta = msg.get("metadata", {})
            full_json = json.dumps({"content": msg["content"], "metadata": meta})
            history.append({"role": "assistant", "content": full_json})
        else:
            # Layer 2: wrap user input in random boundary
            history.append({"role": "user", "content": enclose_user_message(msg["content"])})

    # Layer 4: sandwich defense, closing system reminder after all messages
    history.append({"role": "system", "content": SANDWICH_REMINDER})
    return history


def _extract_json(raw: str) -> dict | None:
    """Try multiple strategies to extract a JSON object from the model output."""
    # Strategy 1: direct parse
    try:
        data = json.loads(raw)
        if isinstance(data, dict):
            return data
    except json.JSONDecodeError:
        pass

    # Strategy 2: find the first { ... } block (handles markdown fences, preamble text)
    start = raw.find("{")
    end = raw.rfind("}")
    if start != -1 and end > start:
        try:
            data = json.loads(raw[start : end + 1])
            if isinstance(data, dict):
                return data
        except json.JSONDecodeError:
            pass

    return None


def _normalize_lead_fields(meta_raw: dict) -> dict:
    """Coerce lead_fields strings into LeadField-compatible dicts."""
    fields = meta_raw.get("lead_fields")
    if not isinstance(fields, list):
        return meta_raw
    normalized = []
    for f in fields:
        if isinstance(f, str):
            normalized.append({
                "name": f,
                "type": "email" if f == "email" else "text",
                "required": f in ("name", "email"),
                "placeholder": f.capitalize(),
            })
        else:
            normalized.append(f)
    if normalized != fields:
        meta_raw = {**meta_raw, "lead_fields": normalized}
    return meta_raw


def _parse_agent_response(raw: str) -> tuple[str, MessageMetadata]:
    """Parse the agent's JSON response into content + metadata."""
    data = _extract_json(raw)
    if data and "content" in data:
        content = data["content"]
        meta_raw = _normalize_lead_fields(data.get("metadata", {}))
        try:
            metadata = MessageMetadata.model_validate(meta_raw)
        except Exception as exc:
            logger.warning("Failed to validate metadata: %s", exc)
            metadata = MessageMetadata()

        # Layer 5: check for system prompt leakage in the response
        replacement = check_output_for_leaks(content, SYSTEM_PROMPT)
        if replacement:
            return replacement, MessageMetadata()

        return content, metadata

    logger.warning("Could not extract JSON from agent response, using raw text")

    # Layer 5: also check raw text responses for leaks
    replacement = check_output_for_leaks(raw, SYSTEM_PROMPT)
    if replacement:
        return replacement, MessageMetadata()

    return raw, MessageMetadata()


async def generate_welcome(session_id: uuid.UUID) -> MessageOut:
    """Start a new conversation and return the welcome message."""
    client = _get_client()

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                "[SYSTEM] The user has just opened the assessment page. "
                "Send your welcome message to start the conversation."
            ),
        },
    ]

    response = await client.chat.completions.create(
        model=settings.openai_model,
        messages=messages,
        temperature=0.7,
        max_tokens=500,
    )

    raw = response.choices[0].message.content or ""
    content, metadata = _parse_agent_response(raw)

    # Store the welcome message (skip the [SYSTEM] user prompt)
    await db.add_message(
        session_id, "assistant", content, metadata.model_dump(mode="json")
    )

    return MessageOut(role="assistant", content=content, metadata=metadata)


async def handle_message(
    session_id: uuid.UUID, user_content: str
) -> MessageOut:
    """Process a user message and return the agent's response."""
    client = _get_client()

    # Store user message
    await db.add_message(session_id, "user", user_content)
    await db.touch_session(session_id)

    # Build full history from DB
    db_messages = await db.get_messages_by_session(session_id)
    chat_history = _build_chat_history(db_messages)

    response = await client.chat.completions.create(
        model=settings.openai_model,
        messages=chat_history,
        temperature=0.7,
        max_tokens=2000,
    )

    raw = response.choices[0].message.content or ""
    content, metadata = _parse_agent_response(raw)

    # Extract and persist lead data if present
    if metadata.lead_data:
        await db.update_session_lead_data(session_id, metadata.lead_data)

    # If this is the report, persist results
    if metadata.is_report and metadata.report:
        scores = {
            d.dimension: {"score": d.score, "tier": d.tier}
            for d in metadata.report.dimensions
        }
        await db.save_assessment_results(
            session_id,
            scores=scores,
            report=metadata.report.model_dump(mode="json"),
        )

    # Store assistant message
    await db.add_message(
        session_id, "assistant", content, metadata.model_dump(mode="json")
    )

    return MessageOut(role="assistant", content=content, metadata=metadata)
