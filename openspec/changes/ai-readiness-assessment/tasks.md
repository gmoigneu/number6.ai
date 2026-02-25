## 1. Python agent project setup

- [x] 1.1 Initialize `assessment/` directory with `uv init` and configure `pyproject.toml` (Python 3.14, project name `assessment-agent`)
- [x] 1.2 Add dependencies: `fastapi`, `uvicorn`, `openai`, `asyncpg`, `pydantic`, `pydantic-settings`
- [x] 1.3 Create source structure: `assessment/src/assessment_agent/` with `__init__.py`, `main.py`, `agent.py`, `scoring.py`, `prompts.py`, `models.py`, `db.py`, `config.py`
- [x] 1.4 Create `config.py` with pydantic-settings: `OPENAI_API_KEY`, `OPENAI_MODEL`, `DATABASE_URL`, `ALLOWED_ORIGINS`, `PORT` with validation and defaults
- [x] 1.5 Run `uv sync` to generate `uv.lock`
- [x] 1.6 Add `.env.example` with all required environment variables documented

## 2. Database layer

- [x] 2.1 Create `db.py` with async PostgreSQL connection pool setup and teardown (lifespan hook in FastAPI)
- [x] 2.2 Define schema: `sessions` table (id UUID, created_at, updated_at, status, lead_data JSONB)
- [x] 2.3 Define schema: `messages` table (id UUID, session_id FK, role, content, metadata JSONB, created_at)
- [x] 2.4 Define schema: `assessment_results` table (session_id FK, scores JSONB, report JSONB, created_at)
- [x] 2.5 Implement auto-creation of tables on startup if they don't exist
- [x] 2.6 Implement CRUD functions: create_session, get_session, update_session_lead_data, add_message, get_messages_by_session, save_assessment_results

## 3. FastAPI application and routes

- [x] 3.1 Create `main.py` with FastAPI app, CORS middleware (configurable origins), and lifespan for DB pool
- [x] 3.2 Implement `POST /api/conversations`: create session in DB, generate welcome message via agent, store messages, return session_id + response
- [x] 3.3 Implement `POST /api/conversations/{session_id}/messages`: validate session, call agent with conversation history from DB, store messages, return response
- [x] 3.4 Implement `GET /api/conversations/{session_id}`: load full conversation state from DB (messages, lead data, progress)
- [x] 3.5 Implement `GET /api/health`: simple health check returning `{"status": "ok"}`
- [x] 3.6 Add rate limiting: 30 requests/minute per IP, 100 messages per session
- [x] 3.7 Add error handling: 404 for missing sessions, 422 for validation errors, 429 for rate limits, 500 with safe error messages

## 4. Pydantic models

- [x] 4.1 Create `models.py` with request/response models: `CreateConversationResponse`, `SendMessageRequest`, `SendMessageResponse`, `ConversationState`
- [x] 4.2 Define `MessageMetadata` model: `suggested_replies`, `input_type`, `lead_fields`, `progress`, `is_report`, `report`, `lead_data`
- [x] 4.3 Define `ReportPayload` model: overall score/tier, dimension scores/tiers/analysis, recommendations, summary
- [x] 4.4 Define `LeadField` model: name, type, required, placeholder

## 5. Agent conversation logic

- [x] 5.1 Create `prompts.py` with the system prompt defining: agent persona, assessment framework, four dimensions, scoring criteria, conversation guidelines, output format, lead capture instructions, guardrails
- [x] 5.2 Create `agent.py` with OpenAI Chat Completions integration: build message history from DB, call API, parse response
- [x] 5.3 Implement structured metadata extraction: agent returns JSON metadata alongside conversational text (suggested_replies, input_type, progress, lead_fields)
- [x] 5.4 Implement lead data extraction: detect when lead info is captured from conversation, update session lead_data in DB
- [x] 5.5 Implement conversation guardrails: off-topic redirect, system prompt protection, concise response enforcement
- [x] 5.6 Implement assessment completion detection: agent determines when all dimensions are covered and email is captured, triggers report generation

## 6. Scoring and report generation

- [x] 6.1 Create `scoring.py` with dimension score types and tier mapping (0-30 Early Stage, 31-55 Building Foundations, 56-75 Progressing, 76-100 Advanced)
- [x] 6.2 Implement report generation: agent uses structured output or function calling to produce dimension scores, analysis, and recommendations
- [x] 6.3 Implement recommendation generation: 3-5 personalized recommendations based on scores, industry, and company context
- [x] 6.4 Store completed assessment results in the `assessment_results` DB table

## 7. Chatbot UI components (frontend)

- [x] 7.1 Create `src/components/sections/assessment/` directory structure
- [x] 7.2 Build `MessageBubble.tsx`: bot messages (left-aligned, dark card, "6" avatar) and user messages (right-aligned, terracotta)
- [x] 7.3 Build `TypingIndicator.tsx`: three animated dots with "Agent is thinking..." label, shown during API calls
- [x] 7.4 Build `QuickReplyButtons.tsx`: render suggested_replies from agent metadata, single-choice (disable on select) and multi-choice (toggle + Continue) modes
- [x] 7.5 Build `FreeTextInput.tsx`: always-visible text input with send button, Enter to submit, disabled during API calls, empty submission prevention
- [x] 7.6 Build `LeadCaptureStep.tsx`: inline form fields from agent's lead_fields metadata, dark input style, email validation
- [x] 7.7 Build `ProgressBar.tsx`: thin terracotta bar at top of chat, reads progress from agent metadata
- [x] 7.8 Build `ChatWindow.tsx`: scrollable message list with auto-scroll (pause when user scrolls up, resume at bottom)
- [x] 7.9 Build `ResumePrompt.tsx`: "Welcome back!" prompt with "Continue where I left off" and "Start fresh" buttons

## 8. Chatbot orchestrator (frontend)

- [x] 8.1 Build `AssessmentChatbot.tsx`: main component managing API communication, message state, and localStorage sync
- [x] 8.2 Implement API integration: POST /api/conversations to start, POST /api/conversations/{id}/messages to send, GET /api/conversations/{id} to resume
- [x] 8.3 Implement localStorage persistence: save/load session_id, messages, lead_data, progress, timestamps under `n6-assessment-session` key
- [x] 8.4 Implement session resume logic: check localStorage on mount, verify session with GET API call, show ResumePrompt if valid, clear if expired (24h)
- [x] 8.5 Implement error handling: API failures show inline error with retry, expired sessions clear and restart
- [x] 8.6 Wire up environment variable `PUBLIC_ASSESSMENT_API_URL` for agent API base URL

## 9. Report view (frontend)

- [x] 9.1 Build `ScoreBar.tsx`: horizontal progress bar with terracotta fill, numeric score, and tier label
- [x] 9.2 Build `ReportView.tsx`: render agent's report payload with overall score (large number + tier), four dimension score bars, dimension detail cards with analysis text
- [x] 9.3 Build recommendations section: render 3-5 recommendation cards from agent data with title, explanation, and service area tag
- [x] 9.4 Build report CTA section: terracotta background with "Book a free discovery call" and "Explore our services" buttons
- [x] 9.5 Implement report generation animation: "Generating your report..." transition (1-2 seconds) when `is_report` is received
- [ ] 9.6 Implement share results: "Copy link" button that encodes scores in URL params, simplified public view for shared links

## 10. Email delivery (frontend)

- [ ] 10.1 Set up dedicated Web3Forms access key for assessment report emails
- [x] 10.2 Implement Web3Forms submission when report is received: send name, email, company, role, scores, tiers, recommendations
- [x] 10.3 Handle submission success ("We've sent a copy to [email]") and failure (subtle error with fallback)

## 11. Assessment page and routing

- [x] 11.1 Create `src/pages/assessment.astro` with BaseLayout, full-page layout (introduction section + inline chat window, not a dialog)
- [x] 11.2 Build introduction section: terracotta label, headline, description, prominent "~5 minutes" time estimate badge, "What you'll get" list
- [x] 11.3 Embed AssessmentChatbot component with `client:load` below the introduction section
- [x] 11.4 Add SEO meta tags: title "AI Readiness Assessment | Number6", description, OG tags
- [x] 11.5 Add JSON-LD structured data (WebApplication + BreadcrumbList schemas)
- [x] 11.6 Implement responsive layout: desktop 64px padding / max-width 720px centered, mobile 20px padding / full-width, headline 48px→32px

## 12. Navigation and homepage integration

- [x] 12.1 Add "Free AI Assessment" link to Header.astro desktop navigation (styled distinctly with terracotta text or badge)
- [x] 12.2 Add "Free AI Assessment" link to mobile navigation menu
- [x] 12.3 Add assessment CTA to homepage (new section or addition to Final CTA) with headline, description, time estimate, and button linking to `/assessment`

## 13. Design document

- [ ] 13.1 Create design brief covering: full page layout (introduction + inline chat), chatbot container, message bubbles (bot/user), quick reply button states, lead capture fields, typing indicator, progress bar, resume prompt, report layout with score visualizations, CTA section, time estimate badge, responsive breakpoints
- [ ] 13.2 Reference existing Number6 design tokens and patterns, provide specifications for the designer to work in Pencil

## 14. Mobile optimization and polish

- [x] 14.1 Handle mobile keyboard: adjust chat layout when software keyboard appears, keep input visible
- [x] 14.2 Test and fix auto-scroll behavior across browsers and devices
- [x] 14.3 Ensure dark theme consistency across all components (colors, fonts, spacing match site dark sections)
- [x] 14.4 Run Biome lint/format check and react-doctor on all new frontend components

## 15. Agent testing and local development

- [x] 15.1 Add a `docker-compose.yml` in `assessment/` for local Postgres
- [x] 15.2 Dev server starts via `uv run uvicorn assessment_agent.main:app --reload`
- [ ] 15.3 Test full conversation flow end-to-end: welcome → lead capture → dimensions → email → report
- [ ] 15.4 Test session resume: start conversation, stop server, restart, verify conversation loads from DB
- [ ] 15.5 Test error cases: invalid session, rate limiting, OpenAI API failure, database connection failure
