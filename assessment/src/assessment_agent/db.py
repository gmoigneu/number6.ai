from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone

import asyncpg

_pool: asyncpg.Pool | None = None


async def init_pool(database_url: str) -> asyncpg.Pool:
    global _pool
    _pool = await asyncpg.create_pool(database_url, min_size=2, max_size=10)
    await _create_tables()
    return _pool


async def close_pool() -> None:
    global _pool
    if _pool:
        await _pool.close()
        _pool = None


def get_pool() -> asyncpg.Pool:
    if _pool is None:
        raise RuntimeError("Database pool not initialised")
    return _pool


# ---------------------------------------------------------------------------
# Schema
# ---------------------------------------------------------------------------

_CREATE_TABLES = """
CREATE TABLE IF NOT EXISTS sessions (
    id          UUID PRIMARY KEY,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    status      TEXT NOT NULL DEFAULT 'active',
    lead_data   JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS messages (
    id          UUID PRIMARY KEY,
    session_id  UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    role        TEXT NOT NULL,
    content     TEXT NOT NULL,
    metadata    JSONB DEFAULT '{}'::jsonb,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_session
    ON messages (session_id, created_at);

CREATE TABLE IF NOT EXISTS assessment_results (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id  UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    scores      JSONB NOT NULL,
    report      JSONB NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
"""


async def _create_tables() -> None:
    pool = get_pool()
    async with pool.acquire() as conn:
        await conn.execute(_CREATE_TABLES)


# ---------------------------------------------------------------------------
# CRUD helpers
# ---------------------------------------------------------------------------


async def create_session() -> uuid.UUID:
    pool = get_pool()
    session_id = uuid.uuid4()
    now = datetime.now(timezone.utc)
    async with pool.acquire() as conn:
        await conn.execute(
            "INSERT INTO sessions (id, created_at, updated_at) VALUES ($1, $2, $3)",
            session_id,
            now,
            now,
        )
    return session_id


async def get_session(session_id: uuid.UUID) -> dict | None:
    pool = get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            "SELECT id, created_at, updated_at, status, lead_data FROM sessions WHERE id = $1",
            session_id,
        )
    if row is None:
        return None
    return {
        "id": row["id"],
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
        "status": row["status"],
        "lead_data": json.loads(row["lead_data"]) if row["lead_data"] else {},
    }


async def update_session_lead_data(
    session_id: uuid.UUID, lead_data: dict
) -> None:
    pool = get_pool()
    async with pool.acquire() as conn:
        await conn.execute(
            """
            UPDATE sessions
            SET lead_data = lead_data || $2::jsonb,
                updated_at = now()
            WHERE id = $1
            """,
            session_id,
            json.dumps(lead_data),
        )


async def touch_session(session_id: uuid.UUID) -> None:
    pool = get_pool()
    async with pool.acquire() as conn:
        await conn.execute(
            "UPDATE sessions SET updated_at = now() WHERE id = $1",
            session_id,
        )


async def add_message(
    session_id: uuid.UUID,
    role: str,
    content: str,
    metadata: dict | None = None,
) -> uuid.UUID:
    pool = get_pool()
    msg_id = uuid.uuid4()
    async with pool.acquire() as conn:
        await conn.execute(
            """
            INSERT INTO messages (id, session_id, role, content, metadata, created_at)
            VALUES ($1, $2, $3, $4, $5::jsonb, now())
            """,
            msg_id,
            session_id,
            role,
            content,
            json.dumps(metadata or {}),
        )
    return msg_id


async def get_messages_by_session(session_id: uuid.UUID) -> list[dict]:
    pool = get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            """
            SELECT id, role, content, metadata, created_at
            FROM messages
            WHERE session_id = $1
            ORDER BY created_at
            """,
            session_id,
        )
    return [
        {
            "id": row["id"],
            "role": row["role"],
            "content": row["content"],
            "metadata": json.loads(row["metadata"]) if row["metadata"] else {},
            "created_at": row["created_at"],
        }
        for row in rows
    ]


async def save_assessment_results(
    session_id: uuid.UUID,
    scores: dict,
    report: dict,
) -> None:
    pool = get_pool()
    async with pool.acquire() as conn:
        await conn.execute(
            """
            INSERT INTO assessment_results (session_id, scores, report, created_at)
            VALUES ($1, $2::jsonb, $3::jsonb, now())
            """,
            session_id,
            json.dumps(scores),
            json.dumps(report),
        )
        await conn.execute(
            "UPDATE sessions SET status = 'completed', updated_at = now() WHERE id = $1",
            session_id,
        )


async def get_message_count(session_id: uuid.UUID) -> int:
    pool = get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            "SELECT count(*) AS cnt FROM messages WHERE session_id = $1",
            session_id,
        )
    return row["cnt"] if row else 0
