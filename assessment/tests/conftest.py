"""
Shared fixtures for assessment agent tests.

These are integration tests that require:
- A running PostgreSQL instance (docker compose up -d)
- A valid OPENAI_API_KEY in .env
"""

import asyncio

import pytest
from httpx import ASGITransport, AsyncClient

from assessment_agent import db
from assessment_agent.config import get_settings
from assessment_agent.main import app


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session", autouse=True)
async def setup_db():
    """Initialize the DB pool once for the entire test session."""
    settings = get_settings()
    await db.init_pool(settings.database_url)
    yield
    await db.close_pool()


@pytest.fixture
async def client():
    """Async HTTP client that talks directly to the FastAPI app."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


async def send_msg(client: AsyncClient, session_id: str, content: str) -> dict:
    """Helper: send a user message and return the parsed response body."""
    resp = await client.post(
        f"/api/conversations/{session_id}/messages",
        json={"content": content},
    )
    assert resp.status_code == 200, f"send_msg failed: {resp.status_code} {resp.text}"
    return resp.json()
