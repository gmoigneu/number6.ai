"""
Integration test: full assessment conversation flow.

Walks through the entire assessment from welcome to report generation
and verifies the report is stored in the database.

Requires a running Postgres and valid OPENAI_API_KEY.
Run with: uv run pytest tests/test_assessment_flow.py -v -s
"""

import json

import pytest
from httpx import AsyncClient

from assessment_agent import db
from tests.conftest import send_msg

pytestmark = pytest.mark.asyncio(loop_scope="session")

# Scripted answers that simulate a real user going through the assessment.
# These are designed to give the agent enough signal to score all 4 dimensions.
SCRIPTED_ANSWERS = [
    # Name + role
    "My name is Test User and I'm the CTO",
    # Company context
    "We're Acme Corp, a fintech company with about 150 employees",
    # Data Readiness
    "We collect data from multiple sources but it's mostly in spreadsheets",
    "Data quality is moderate, maybe a 5 out of 10",
    "It's hard to access, siloed across departments",
    # Process Maturity
    "Our processes are partially documented",
    "Mostly manual with some basic automation",
    "The team is quite open to change",
    # Team Capability
    "Technical skills are strong overall",
    "Somewhat familiar with AI concepts",
    "We don't really have a learning culture around AI yet",
    # Strategic Alignment
    "Our AI goals are not clearly defined yet",
    "We're hoping to implement within the next 6 months",
    "We have executive support and some budget allocated",
    # Email capture
    "test@acmecorp.com",
]


async def _run_assessment(client: AsyncClient) -> tuple[str, list[dict]]:
    """Drive a full assessment and return (session_id, all_responses)."""
    # Start conversation
    resp = await client.post("/api/conversations")
    assert resp.status_code == 200
    data = resp.json()
    session_id = data["session_id"]
    welcome = data["message"]

    assert welcome["role"] == "assistant"
    assert len(welcome["content"]) > 0

    all_responses = [data]

    for answer in SCRIPTED_ANSWERS:
        body = await send_msg(client, session_id, answer)
        msg = body["message"]
        all_responses.append(body)

        # Check that every response has valid structure
        assert msg["role"] == "assistant"
        assert len(msg["content"]) > 0
        assert msg["metadata"] is not None

        # If the agent generated the report, stop sending answers
        if msg["metadata"].get("is_report"):
            break

    return session_id, all_responses


@pytest.mark.timeout(120)
async def test_full_assessment_produces_report(client: AsyncClient):
    """A complete assessment should end with a report containing scores."""
    session_id, responses = await _run_assessment(client)

    # The last response should be the report
    last_msg = responses[-1]["message"]
    meta = last_msg["metadata"]

    assert meta["is_report"] is True, "Assessment did not produce a report"
    report = meta["report"]
    assert report is not None

    # Verify report structure
    assert 0 <= report["overall_score"] <= 100
    assert report["overall_tier"] in [
        "Early Stage",
        "Building Foundations",
        "Progressing",
        "Advanced",
    ]
    assert len(report["summary"]) > 0
    assert len(report["dimensions"]) == 4
    assert len(report["recommendations"]) >= 3

    for dim in report["dimensions"]:
        assert dim["dimension"] in [
            "Data Readiness",
            "Process Maturity",
            "Team Capability",
            "Strategic Alignment",
        ]
        assert 0 <= dim["score"] <= 100
        assert len(dim["analysis"]) > 0


@pytest.mark.timeout(120)
async def test_report_stored_in_database(client: AsyncClient):
    """After a completed assessment, results should be in the assessment_results table."""
    session_id, responses = await _run_assessment(client)

    last_msg = responses[-1]["message"]
    if not last_msg["metadata"].get("is_report"):
        pytest.skip("Agent did not produce a report in this run")

    # Check assessment_results table
    pool = db.get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            "SELECT scores, report FROM assessment_results WHERE session_id = $1",
            __import__("uuid").UUID(session_id),
        )

    assert row is not None, "Report was not saved to assessment_results"
    scores = json.loads(row["scores"])
    report = json.loads(row["report"])

    assert len(scores) == 4
    assert "overall_score" in report
    assert len(report["dimensions"]) == 4
    assert len(report["recommendations"]) >= 3


@pytest.mark.timeout(120)
async def test_lead_data_captured(client: AsyncClient):
    """The agent should extract and store lead data (name, email) in the session."""
    session_id, _ = await _run_assessment(client)

    session = await db.get_session(__import__("uuid").UUID(session_id))
    assert session is not None

    lead_data = session["lead_data"]
    # The agent should have captured at least the email
    assert "email" in lead_data or "name" in lead_data, (
        f"No lead data captured. Got: {lead_data}"
    )


@pytest.mark.timeout(120)
async def test_conversation_state_endpoint(client: AsyncClient):
    """GET /api/conversations/{id} should return the full conversation."""
    session_id, _ = await _run_assessment(client)

    resp = await client.get(f"/api/conversations/{session_id}")
    assert resp.status_code == 200

    state = resp.json()
    assert state["session_id"] == session_id
    assert len(state["messages"]) > 2  # At least welcome + some exchanges
    assert state["progress"] > 0
