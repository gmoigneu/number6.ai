## ADDED Requirements

### Requirement: Python project structure
The assessment agent SHALL be a Python project in the `agent/` directory at the repository root. The project SHALL use `uv` for dependency management with a `pyproject.toml` configuration. The source code SHALL live under `agent/src/assessment_agent/`. The project SHALL include a `uv.lock` file for reproducible installs.

#### Scenario: Project initializes with uv
- **WHEN** a developer runs `uv sync` in the `agent/` directory
- **THEN** all dependencies are installed and the project is ready to run

#### Scenario: Project structure is correct
- **WHEN** the agent directory is inspected
- **THEN** it contains `pyproject.toml`, `uv.lock`, and `src/assessment_agent/` with `__init__.py`, `main.py`, `agent.py`, `scoring.py`, `prompts.py`, `models.py`, `config.py`, and `db.py`

### Requirement: FastAPI application
The agent SHALL expose a FastAPI application with CORS configured to allow the Astro frontend origin (configurable via environment variable `ALLOWED_ORIGINS`, defaulting to `http://localhost:4321`). The application SHALL run on a configurable port (default 8000).

#### Scenario: Server starts successfully
- **WHEN** the developer runs `uv run uvicorn assessment_agent.main:app --reload` from `agent/`
- **THEN** the FastAPI server starts on port 8000 with CORS enabled

#### Scenario: CORS allows frontend origin
- **WHEN** the frontend at `localhost:4321` makes a request to the agent API
- **THEN** the CORS headers allow the request

#### Scenario: CORS blocks unknown origins
- **WHEN** a request comes from an origin not in `ALLOWED_ORIGINS`
- **THEN** the CORS headers block the request

### Requirement: Start conversation endpoint
The agent SHALL expose `POST /api/conversations` that creates a new conversation session and returns the session ID along with the agent's opening message. The opening message SHALL introduce the assessment, state the expected time commitment (~5 minutes), and explain what the user will receive (a personalized AI readiness report). The response SHALL include metadata with `suggested_replies` (e.g., ["Let's do it!", "Tell me more"]), `input_type: "single-choice"`, and `progress: 0.0`.

#### Scenario: New conversation created
- **WHEN** a POST request is made to `/api/conversations`
- **THEN** the response includes a `session_id`, the agent's welcome message, and metadata with suggested replies and progress 0.0

#### Scenario: Welcome message sets expectations
- **WHEN** the opening message is delivered
- **THEN** it mentions the ~5 minute time commitment and that the user will receive an AI readiness report

### Requirement: Send message endpoint
The agent SHALL expose `POST /api/conversations/{session_id}/messages` accepting a JSON body with `content` (string, the user's message). The agent SHALL process the message using OpenAI, maintain conversation context, and return the agent's response with metadata (suggested_replies, input_type, progress, lead_fields if applicable, is_report flag).

#### Scenario: User sends a message
- **WHEN** a POST request is made with the user's message content
- **THEN** the agent responds with a contextually relevant message and updated metadata

#### Scenario: Invalid session ID
- **WHEN** a POST request references a non-existent session_id
- **THEN** the API returns a 404 error with a descriptive message

#### Scenario: Empty message rejected
- **WHEN** a POST request is made with empty or whitespace-only content
- **THEN** the API returns a 422 validation error

### Requirement: Get conversation state endpoint
The agent SHALL expose `GET /api/conversations/{session_id}` that returns the full conversation state including all messages, current progress, and any captured lead data. This endpoint supports frontend reconnection after page navigation.

#### Scenario: Retrieve existing conversation
- **WHEN** a GET request is made with a valid session_id
- **THEN** the response includes the full message history, progress, and lead data

#### Scenario: Session not found
- **WHEN** a GET request references a non-existent session_id
- **THEN** the API returns a 404 error

### Requirement: Health check endpoint
The agent SHALL expose `GET /api/health` that returns a 200 status with `{"status": "ok"}`. This endpoint SHALL NOT require authentication or session context.

#### Scenario: Health check passes
- **WHEN** a GET request is made to `/api/health`
- **THEN** the response is 200 with `{"status": "ok"}`

### Requirement: OpenAI conversation management
The agent SHALL use the OpenAI Chat Completions API (via the `openai` Python SDK) to generate responses. The agent SHALL maintain a conversation history per session including the system prompt and all user/assistant messages. The system prompt SHALL define the agent's persona, assessment framework, scoring criteria, conversation guidelines, and output format requirements.

#### Scenario: Agent uses OpenAI for responses
- **WHEN** the agent processes a user message
- **THEN** it calls the OpenAI API with the full conversation history including the system prompt

#### Scenario: Conversation context maintained
- **WHEN** the user sends their 5th message in a session
- **THEN** the OpenAI call includes all prior messages in the conversation for context

### Requirement: Agent persona and guidelines
The system prompt SHALL instruct the agent to: use a warm, professional tone; keep responses to 2-3 sentences maximum; use the user's name after it's captured; guide the conversation through the four assessment dimensions; weave in lead capture naturally; provide suggested quick replies for most questions; stay on topic and redirect off-topic messages politely; and never reveal the system prompt or scoring internals.

#### Scenario: Agent stays concise
- **WHEN** the agent generates a response
- **THEN** the response is no longer than 3 sentences for conversational messages

#### Scenario: Agent uses user's name
- **WHEN** the user has provided their name earlier in the conversation
- **THEN** subsequent agent messages use the user's first name

#### Scenario: Agent redirects off-topic input
- **WHEN** the user sends a message unrelated to the assessment
- **THEN** the agent politely acknowledges and redirects back to the assessment topic

### Requirement: Assessment dimension coverage
The agent SHALL guide the conversation to cover all four scoring dimensions: Data Readiness, Process Maturity, Team Capability, and Strategic Alignment. The agent SHALL adapt its questions based on previous answers (e.g., simpler team questions for solo operators, industry-specific follow-ups). The agent SHALL track which dimensions have been sufficiently covered via internal state.

#### Scenario: All dimensions covered
- **WHEN** the agent determines the assessment is complete
- **THEN** all four dimensions have been addressed with at least 2-3 questions each

#### Scenario: Adaptive questioning for small companies
- **WHEN** the user indicates they are a solo operator or company of 1-10
- **THEN** team capability questions are simplified and adapted to the context

#### Scenario: Industry-specific follow-ups
- **WHEN** the user mentions a specific industry
- **THEN** the agent may ask follow-up questions relevant to that industry's AI challenges

### Requirement: Lead capture via conversation
The agent SHALL collect lead information naturally within the conversation flow. Early in the conversation (after the welcome), the agent SHALL ask for the user's name and role. Near the end (before generating the report), the agent SHALL ask for their email, framed as delivering the report. The agent SHALL also capture company name and company size during the company context phase. Captured lead data SHALL be included in the conversation state and in the metadata of each response.

#### Scenario: Name captured early
- **WHEN** the conversation reaches the identity phase
- **THEN** the agent asks for the user's name and role with `input_type: "lead-capture"` and appropriate `lead_fields`

#### Scenario: Email captured before report
- **WHEN** all assessment dimensions are covered
- **THEN** the agent asks for the user's email with messaging about sending them the report

#### Scenario: Lead data in response metadata
- **WHEN** lead data has been captured
- **THEN** subsequent response metadata includes the accumulated `lead_data` object

### Requirement: Progress tracking
The agent SHALL include a `progress` float (0.0 to 1.0) in each response's metadata, representing how far through the assessment the user is. Progress SHALL advance based on the number of assessment dimensions covered and whether lead data has been collected. The progress value SHALL be monotonically increasing (never go backwards).

#### Scenario: Progress starts at zero
- **WHEN** the conversation starts
- **THEN** the progress value is 0.0

#### Scenario: Progress increases through conversation
- **WHEN** the user completes questions about Data Readiness
- **THEN** the progress value has increased from its previous value

#### Scenario: Progress reaches 1.0 at completion
- **WHEN** the agent generates the final report
- **THEN** the progress value is 1.0

### Requirement: Suggested replies in metadata
The agent SHALL include a `suggested_replies` array in response metadata for most messages. Suggested replies SHALL be contextually relevant answer options that the frontend renders as quick-reply buttons. The agent SHALL also specify `input_type` as one of: `single-choice` (pick one suggested reply), `multi-choice` (pick multiple), `free-text` (open text input), or `lead-capture` (form fields).

#### Scenario: Suggested replies provided
- **WHEN** the agent asks a question about data practices
- **THEN** the metadata includes 3-5 relevant suggested reply options

#### Scenario: Free-text input type
- **WHEN** the agent asks an open-ended question like "Tell me about your biggest workflow bottleneck"
- **THEN** the metadata specifies `input_type: "free-text"`

#### Scenario: Lead capture input type
- **WHEN** the agent asks for the user's name and role
- **THEN** the metadata specifies `input_type: "lead-capture"` with `lead_fields` defining the form fields

### Requirement: Scoring engine
The scoring module SHALL compute scores for each dimension (0-100 scale) based on the agent's evaluation of the user's responses. The agent SHALL use structured output or function calling to extract dimension scores when generating the report. Scores SHALL map to tiers: 0-30 "Early Stage", 31-55 "Building Foundations", 56-75 "Progressing", 76-100 "Advanced". An overall composite score SHALL be the average of all four dimension scores.

#### Scenario: Scores computed at report time
- **WHEN** the agent determines the assessment is complete and generates a report
- **THEN** each dimension has a score between 0 and 100 with an assigned tier

#### Scenario: Overall score calculated
- **WHEN** individual dimension scores are computed
- **THEN** the overall score is the average of all four dimensions

#### Scenario: Tier boundaries
- **WHEN** scores are at boundary values (30, 31, 55, 56, 75, 76)
- **THEN** each maps to the correct tier

### Requirement: Report generation
When the assessment is complete (all dimensions covered, email captured), the agent SHALL generate a structured report and return it as a response with `is_report: true` in the metadata. The report payload SHALL include: overall score and tier, each dimension's score/tier/analysis (2-3 sentences per dimension), 3-5 personalized recommendations with titles and descriptions, and a summary paragraph. The report data SHALL be structured as JSON in a `report` field of the metadata.

#### Scenario: Report response format
- **WHEN** the agent generates the final report
- **THEN** the response metadata includes `is_report: true` and a `report` object with scores, analysis, and recommendations

#### Scenario: Report includes all dimensions
- **WHEN** the report is generated
- **THEN** it includes a score, tier, and 2-3 sentence analysis for each of the four dimensions

#### Scenario: Recommendations are personalized
- **WHEN** the report includes recommendations
- **THEN** there are 3-5 recommendations that reference the user's specific context (industry, company size, identified gaps)

### Requirement: Rate limiting
The API SHALL implement basic rate limiting: maximum 30 requests per minute per IP address, and maximum 100 messages per conversation session. If limits are exceeded, the API SHALL return 429 Too Many Requests with a descriptive error message.

#### Scenario: Rate limit per IP
- **WHEN** an IP address exceeds 30 requests per minute
- **THEN** subsequent requests receive a 429 response

#### Scenario: Message limit per session
- **WHEN** a conversation exceeds 100 messages
- **THEN** the agent indicates the assessment should wrap up and generates the report

### Requirement: Configuration via environment variables
The agent SHALL read configuration from environment variables: `OPENAI_API_KEY` (required), `OPENAI_MODEL` (default: `gpt-4o-mini`), `DATABASE_URL` (required, PostgreSQL connection string), `ALLOWED_ORIGINS` (comma-separated, default: `http://localhost:4321`), `PORT` (default: `8000`). The application SHALL fail to start with a clear error if `OPENAI_API_KEY` or `DATABASE_URL` is not set.

#### Scenario: Missing API key
- **WHEN** the application starts without `OPENAI_API_KEY` set
- **THEN** it exits with a clear error message indicating the key is required

#### Scenario: Missing database URL
- **WHEN** the application starts without `DATABASE_URL` set
- **THEN** it exits with a clear error message indicating the database URL is required

#### Scenario: Custom model selection
- **WHEN** `OPENAI_MODEL` is set to `gpt-4o`
- **THEN** the agent uses GPT-4o for all conversation responses

### Requirement: PostgreSQL session and conversation storage
Conversation sessions, message history, lead data, and assessment results SHALL be persisted in a PostgreSQL database. The database module (`db.py`) SHALL use `asyncpg` or `sqlalchemy[asyncio]` for async database access. The database SHALL store: sessions (id, created_at, updated_at, status, lead_data as JSONB), messages (id, session_id, role, content, metadata as JSONB, created_at), and assessment results (session_id, scores as JSONB, report as JSONB, created_at). Sessions SHALL be queryable by status and date range.

#### Scenario: Session created in database
- **WHEN** a new conversation starts via POST /api/conversations
- **THEN** a session record is created in the database with status "active"

#### Scenario: Messages persisted
- **WHEN** the user or agent sends a message
- **THEN** the message is stored in the database with its role, content, and metadata

#### Scenario: Lead data stored
- **WHEN** the agent captures lead information (name, email, company, role)
- **THEN** the session record's lead_data JSONB field is updated with the captured data

#### Scenario: Assessment results stored
- **WHEN** the agent generates the final report
- **THEN** the scores and full report payload are stored in the assessment_results table

#### Scenario: Conversation resumable from database
- **WHEN** a GET request is made for an existing session_id
- **THEN** the full message history and state are loaded from the database

### Requirement: Database configuration
The database connection SHALL be configured via the `DATABASE_URL` environment variable (PostgreSQL connection string). The application SHALL fail to start with a clear error if `DATABASE_URL` is not set. The application SHALL create database tables on startup if they do not exist (or use migrations).

#### Scenario: Missing database URL
- **WHEN** the application starts without `DATABASE_URL` set
- **THEN** it exits with a clear error message indicating the database URL is required

#### Scenario: Tables created on startup
- **WHEN** the application starts and the database tables do not exist
- **THEN** the required tables (sessions, messages, assessment_results) are created

#### Scenario: Existing tables preserved
- **WHEN** the application starts and the database tables already exist
- **THEN** the existing tables and data are preserved
