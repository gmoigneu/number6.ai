from __future__ import annotations

import uuid
from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, Field


class InputType(StrEnum):
    SINGLE_CHOICE = "single-choice"
    MULTI_CHOICE = "multi-choice"
    FREE_TEXT = "free-text"
    LEAD_CAPTURE = "lead-capture"


class LeadField(BaseModel):
    name: str
    type: str = "text"
    required: bool = False
    placeholder: str = ""


class DimensionScore(BaseModel):
    dimension: str
    score: int = Field(ge=0, le=100)
    tier: str
    analysis: str


class Recommendation(BaseModel):
    title: str
    description: str
    service_area: str


class ReportPayload(BaseModel):
    overall_score: int = Field(ge=0, le=100)
    overall_tier: str
    summary: str
    dimensions: list[DimensionScore]
    recommendations: list[Recommendation]


class MessageMetadata(BaseModel):
    suggested_replies: list[str] = Field(default_factory=list)
    input_type: InputType = InputType.FREE_TEXT
    lead_fields: list[LeadField] = Field(default_factory=list)
    progress: float = Field(ge=0.0, le=1.0, default=0.0)
    is_report: bool = False
    report: ReportPayload | None = None
    lead_data: dict | None = None


class MessageOut(BaseModel):
    role: str
    content: str
    metadata: MessageMetadata | None = None
    created_at: datetime | None = None


# --- Request / Response models ---


class CreateConversationResponse(BaseModel):
    session_id: uuid.UUID
    message: MessageOut


class SendMessageRequest(BaseModel):
    content: str = Field(min_length=1, max_length=5000)


class SendMessageResponse(BaseModel):
    message: MessageOut


class ConversationState(BaseModel):
    session_id: uuid.UUID
    messages: list[MessageOut]
    lead_data: dict | None = None
    progress: float = 0.0
    status: str = "active"
    created_at: datetime | None = None
