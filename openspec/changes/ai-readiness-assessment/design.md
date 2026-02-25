## Context

Number6.ai is a static Astro 5 + React marketing site for an AI agency. The site currently captures leads through a standard contact form and a newsletter signup, both using Web3Forms for submission. Interactive components are React islands hydrated with `client:visible` or `client:load`. The design system uses Tailwind CSS with brand tokens (terracotta accent, dark foreground, warm off-white background, Space Grotesk headings, Inter body).

The AI Readiness Assessment is a live conversational AI experience that guides users through an evaluation of their organization's AI readiness. It is powered by an OpenAI-backed Python agent deployed as a separate service. The assessment doubles as a showcase of Number6's chatbot-building capabilities.

## Goals / Non-Goals

**Goals:**

- Build a live AI-powered conversational experience that feels natural, adaptive, and engaging
- Deploy the assessment agent as a separate Python backend service using uv for dependency management
- Present the assessment as a full dedicated page with an introduction section and embedded chat window (not a popup or dialog)
- Capture qualified lead data (name, email, company, role) naturally within the conversation flow
- Score responses across four AI readiness dimensions and generate a personalized report
- Persist conversation history in localStorage so users can navigate away and resume
- Communicate expected time commitment (~5 minutes) upfront
- Deliver the report on-screen and via email (Web3Forms)
- Demonstrate Number6's ability to build and deploy conversational AI agents

**Non-Goals:**

- No user accounts or server-side session persistence (localStorage only)
- No admin dashboard for viewing assessment results (Web3Forms inbox + agent logs are sufficient)
- No PDF report generation (HTML on-screen and email only)
- No streaming responses in v1 (complete messages from the agent, not token-by-token streaming)
- No fine-tuned model, we use the OpenAI API with prompt engineering
- No admin UI for browsing assessment results (query Postgres directly or build later)

## Decisions

### 1. Live OpenAI agent, not a scripted flow

**Decision**: Use a Python backend agent powered by OpenAI to manage the conversation dynamically.

**Rationale**: A live AI agent delivers genuinely adaptive conversation that responds naturally to user input, asks contextual follow-ups, and feels like talking to an intelligent assistant. This directly demonstrates Number6's ability to build and deploy AI agents, making the assessment itself a proof of concept. The experience is dramatically more engaging than a scripted question tree.

**Alternatives considered**: Scripted question tree in TypeScript (simpler, no backend needed, but feels robotic and misses the showcase opportunity). Client-side OpenAI calls (exposes API key, no control over conversation guardrails).

### 2. Python FastAPI backend with uv

**Decision**: Build the agent as a Python FastAPI service in an `agent/` subfolder at the project root. Use `uv` for Python dependency and project management. Deploy separately from the Astro static site.

**Rationale**: Python is the natural choice for AI/ML work with the best OpenAI SDK support. FastAPI provides async performance, automatic OpenAPI docs, and simple deployment. uv handles dependency management fast and reliably. Keeping it in a subfolder maintains monorepo convenience while allowing independent deployment.

**Structure**:
```
agent/
├── pyproject.toml          # uv project config
├── uv.lock                 # lockfile
├── src/
│   └── assessment_agent/
│       ├── __init__.py
│       ├── main.py         # FastAPI app, CORS, routes, lifespan
│       ├── agent.py        # OpenAI conversation logic, system prompt
│       ├── scoring.py      # Dimension scoring engine
│       ├── prompts.py      # System prompts and prompt templates
│       ├── models.py       # Pydantic models for API request/response
│       ├── db.py           # PostgreSQL connection, queries, table creation
│       └── config.py       # Settings (OpenAI key, DB URL, allowed origins)
```

**Alternatives considered**: Node.js/TypeScript backend (would match the frontend stack but Python has better AI tooling). Serverless functions (cold start latency hurts conversational UX). Edge functions (limited runtime for OpenAI SDK).

### 3. Agent conversation design

**Decision**: The agent uses a structured system prompt that defines its persona, the assessment framework, scoring criteria, and conversation guidelines. The agent manages conversation state server-side within each session, tracking which topics have been covered, scores accumulated, and lead data captured.

**Key agent behaviors**:
- Introduces itself and sets expectations (time estimate: ~5 minutes)
- Guides the conversation through four assessment dimensions naturally
- Asks follow-up questions based on responses (not a rigid sequence)
- Weaves in lead capture (name/role early, email near the end)
- Uses the user's name and company in subsequent messages
- Keeps responses concise (2-3 sentences max per message)
- Provides quick-reply suggestions for common answers while allowing free-text
- When all dimensions are covered and email is captured, generates a structured report as a JSON response

**Scoring dimensions** (same as before, now evaluated by the agent):
- Data Readiness (0-100)
- Process Maturity (0-100)
- Team Capability (0-100)
- Strategic Alignment (0-100)

### 4. API design

**Decision**: Simple REST API with conversation sessions.

**Endpoints**:
```
POST /api/conversations          # Start a new conversation, returns session_id + first message
POST /api/conversations/{id}/messages   # Send user message, returns agent response
GET  /api/conversations/{id}     # Get conversation state (for resume after reconnect)
GET  /api/health                 # Health check
```

**Message format**:
```json
{
  "role": "assistant",
  "content": "Welcome! I'm the Number6 AI Readiness Assessment...",
  "metadata": {
    "suggested_replies": ["Let's do it!", "Tell me more first"],
    "input_type": "single-choice" | "free-text" | "lead-capture",
    "lead_fields": [...],
    "progress": 0.15,
    "is_report": false
  }
}
```

When the assessment is complete, the agent returns `is_report: true` with a structured report payload containing scores, tiers, analysis, and recommendations.

**Rationale**: REST is simple and well-understood. Session state is persisted in PostgreSQL so conversations survive server restarts and can be queried for analytics. The metadata field lets the agent control the UI (suggested replies, input types) without the frontend needing to understand assessment logic.

### 5. PostgreSQL for conversation persistence

**Decision**: Store all conversations, messages, lead data, and assessment results in a PostgreSQL database.

**Rationale**: Postgres gives us durable conversation storage that survives server restarts, enables querying lead data and assessment results for analytics, and provides a reliable backend for the conversation resume flow. Using JSONB columns for flexible metadata (lead data, scores, report) keeps the schema simple while allowing structured queries.

**Schema**:
```sql
sessions (id UUID PK, created_at, updated_at, status, lead_data JSONB)
messages (id UUID PK, session_id FK, role, content, metadata JSONB, created_at)
assessment_results (session_id FK, scores JSONB, report JSONB, created_at)
```

**Alternatives considered**: In-memory storage (data lost on restart, no analytics). Redis (good for caching but overkill for this volume, less queryable). SQLite (not suitable for concurrent access in production).

### 6. Full dedicated page, not a dialog

**Decision**: The assessment lives on a full `/assessment` page with an introduction section at the top and the chat window embedded below it (inline on the page, scrolling naturally with the page content).

**Page structure**:
```
┌─────────────────────────────────┐
│ Header (standard site nav)      │
├─────────────────────────────────┤
│ Introduction section            │
│   - Terracotta label            │
│   - Headline                    │
│   - Description + time estimate │
│   - What you'll get             │
├─────────────────────────────────┤
│ Chat window (embedded inline)   │
│   - Messages area               │
│   - Input area                  │
├─────────────────────────────────┤
│ Footer (standard site footer)   │
└─────────────────────────────────┘
```

**Rationale**: A full page gives the assessment the weight and presence it deserves. The introduction section sets expectations and context before the user engages. Inline embedding (not a floating dialog) makes it a natural part of the page flow, works well on mobile, and avoids the modal/popup pattern that feels interruptive.

### 6. localStorage conversation persistence

**Decision**: Store the full conversation history (messages array, session ID, lead data, progress) in localStorage. On page load, check for existing session data and offer to resume or start fresh.

**Storage key**: `n6-assessment-session`
**Stored data**:
```json
{
  "sessionId": "abc123",
  "messages": [...],
  "leadData": { "name": "...", "email": "...", "company": "...", "role": "..." },
  "progress": 0.45,
  "startedAt": "2026-02-24T10:00:00Z",
  "lastMessageAt": "2026-02-24T10:03:00Z"
}
```

**Resume behavior**: If a session exists and is less than 24 hours old, show a prompt: "Welcome back! You have an assessment in progress. Would you like to continue where you left off?" with "Continue" and "Start fresh" options. Sessions older than 24 hours are automatically cleared.

**Rationale**: Users may navigate to other pages (services, about) during the assessment to learn more about Number6. localStorage ensures they don't lose progress. No server-side session persistence needed for v1 since the conversation context is also maintained by the agent via session ID.

### 7. Frontend communicates with agent via API

**Decision**: The React chatbot component communicates with the Python agent via fetch calls. The agent URL is configured via an environment variable (`PUBLIC_ASSESSMENT_API_URL`). The frontend handles rendering, input, localStorage, and UI state. The backend handles conversation logic, scoring, and report generation.

**Separation of concerns**:
- **Frontend**: Message rendering, input handling, localStorage, progress display, report rendering, Web3Forms email submission
- **Backend**: Conversation management, OpenAI interaction, scoring, question flow, report data generation

**Rationale**: Clean separation. The frontend is a "dumb" chat client that renders whatever the agent tells it to. The agent controls the conversation flow via metadata (what input type to show, what suggested replies to offer, when to show the report). This means updating the assessment logic requires only backend changes.

### 8. Component architecture (updated)

```
src/components/sections/assessment/
├── AssessmentChatbot.tsx     // Main orchestrator: API calls, state, localStorage
├── ChatWindow.tsx            // Message list + scroll management
├── MessageBubble.tsx         // Individual bot/user message bubble
├── QuickReplyButtons.tsx     // Suggested reply buttons from agent metadata
├── FreeTextInput.tsx         // Open-ended text input + send button
├── LeadCaptureStep.tsx       // Inline form fields for name/email/company/role
├── TypingIndicator.tsx       // "Agent is thinking..." animation
├── ProgressBar.tsx           // Visual progress from agent metadata
├── ResumePrompt.tsx          // "Continue or start fresh?" on return visit
├── ReportView.tsx            // Final report with scores and recommendations
└── ScoreBar.tsx              // Horizontal score bar for dimension scores
```

### 9. Visual design direction

Same as before: dark-themed chat interface consistent with Number6 dark sections.

**Key visual elements**:
- Full page layout with warm off-white introduction section transitioning to dark chat area
- Bot avatar: Number6 "6" mark in terracotta circle
- Bot messages: Dark card with subtle border, left-aligned
- User messages: Terracotta background, right-aligned
- Quick reply buttons: Outlined chips that fill on selection
- Typing indicator: Three bouncing dots with "thinking" label
- Progress bar: Thin terracotta line at top of chat window
- Time estimate badge: "~5 min" shown in the introduction section
- Report: Card-based layout with score bars, dimension breakdowns, recommendations

### 10. Assessment flow (managed by agent)

The agent manages the flow, but the general structure is:

1. **Welcome** (intro, time estimate, "Let's go" button)
2. **Lead capture part 1**: Name and role
3. **Company context**: Company name, industry, size
4. **Data Readiness** (3-4 questions, adaptive follow-ups)
5. **Process Maturity** (3-4 questions, adaptive follow-ups)
6. **Team Capability** (3-4 questions, adapted to company size)
7. **Strategic Alignment** (2-3 questions)
8. **Lead capture part 2**: Email (framed as report delivery)
9. **Report generation**: Agent computes scores and returns structured report data

The key difference from a scripted flow: the agent can ask follow-up questions, respond to unexpected answers gracefully, and adapt the conversation tone and depth based on the user's engagement level.

## Risks / Trade-offs

**[API latency]** Each response requires an OpenAI API call, adding 1-3 seconds per message.
→ Show a typing indicator with natural animation. Keep agent responses concise to minimize token generation time. Consider response caching for the initial welcome message.

**[Cost per lead]** Each assessment costs OpenAI API tokens (~$0.02-0.05 per complete assessment with GPT-4o-mini).
→ Acceptable cost per qualified lead. Use GPT-4o-mini for cost efficiency. Monitor usage.

**[Agent goes off-script]** The AI could generate inappropriate or off-brand responses.
→ Strong system prompt with guardrails. The agent has a defined persona, topic boundaries, and explicit instructions to stay on-track. Add content moderation if needed.

**[Backend availability]** The agent service must be running for the assessment to work, unlike the rest of the static site.
→ Show a graceful error state if the API is unreachable ("Our assessment is temporarily unavailable. Please try again later or contact us directly."). Monitor uptime.

**[LocalStorage limits]** Conversation history could grow large in localStorage.
→ Store only message content and metadata, not full API payloads. Cap at 50 messages. 24-hour expiry cleans up old sessions.

**[Mobile experience]** Chat interfaces on mobile need careful keyboard and scroll handling.
→ Fixed input area at bottom of chat window, auto-scroll on new messages, handle mobile keyboard events.

**[CORS and security]** Frontend calls a separate backend service.
→ Configure CORS on the FastAPI backend to allow only the production domain and localhost for development. Rate limit the API to prevent abuse.

## Open Questions

- What hosting platform for the Python agent and Postgres? (Fly.io, Railway, a VPS, etc.)
- Should we use GPT-4o-mini or GPT-4o for the agent? (Cost vs. quality tradeoff)
- Do we need database migrations tooling (alembic) or is auto-create-on-startup sufficient for now?
