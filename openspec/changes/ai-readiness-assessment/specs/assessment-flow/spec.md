## ADDED Requirements

### Requirement: Agent-driven conversation flow
The conversation flow SHALL be managed entirely by the Python backend agent via OpenAI. The frontend does NOT define question trees or branching logic. The agent's system prompt SHALL define the assessment structure, question topics, scoring framework, and conversation guidelines. The frontend renders whatever the agent sends and provides the input type the agent requests.

#### Scenario: Agent controls the flow
- **WHEN** the user interacts with the chatbot
- **THEN** the agent determines what to ask next, what input type to request, and what suggested replies to offer

#### Scenario: Frontend is a rendering client
- **WHEN** the agent sends a response with metadata
- **THEN** the frontend renders the message and the input UI specified by the metadata without any local flow logic

### Requirement: Welcome and time estimate
The agent's opening message SHALL introduce the assessment, explain it takes approximately 5 minutes, and describe what the user will receive (a personalized AI readiness report with scores and recommendations). The frontend introduction section above the chat SHALL also display the time estimate prominently.

#### Scenario: Time estimate in welcome message
- **WHEN** the conversation starts
- **THEN** the agent's first message mentions the ~5 minute time commitment

#### Scenario: Time estimate in page introduction
- **WHEN** the assessment page renders
- **THEN** the introduction section above the chat displays "~5 minutes" as a visible badge or callout

### Requirement: Lead capture sequence
The agent SHALL collect lead information at two natural points: (1) name and role early in the conversation, and (2) email near the end before the report. Company name and size SHALL be captured during the company context questions. The agent SHALL signal lead capture steps via `input_type: "lead-capture"` with `lead_fields` in the response metadata.

#### Scenario: Name and role captured early
- **WHEN** the conversation moves past the welcome
- **THEN** the agent asks for name and role via a lead-capture input type

#### Scenario: Email captured before report
- **WHEN** the agent has covered all assessment dimensions
- **THEN** it asks for the user's email, framing it as report delivery

#### Scenario: Lead fields specification
- **WHEN** the agent sends a lead-capture input type
- **THEN** the metadata includes `lead_fields` with field definitions (name, type, required flag, placeholder)

### Requirement: Four assessment dimensions
The agent SHALL guide the conversation to cover four scoring dimensions, asking 2-4 questions per dimension:
1. **Data Readiness**: current data practices, quality, accessibility, tools
2. **Process Maturity**: documentation, automation, bottlenecks, change readiness
3. **Team Capability**: technical skills, AI familiarity, learning appetite, champions
4. **Strategic Alignment**: AI goals, timeline, budget, executive buy-in

The agent SHALL adapt questions based on previous answers and company context.

#### Scenario: All dimensions addressed
- **WHEN** the assessment reaches the report phase
- **THEN** the agent has asked questions covering all four dimensions

#### Scenario: Adaptive follow-ups
- **WHEN** the user gives an interesting or unusual answer
- **THEN** the agent may ask a relevant follow-up before moving to the next topic

#### Scenario: Company-size adaptation
- **WHEN** the user indicates they are a solo operator or very small team
- **THEN** team capability questions are adapted to the smaller context

### Requirement: Conversation guardrails
The agent SHALL stay on topic throughout the assessment. If the user asks off-topic questions, the agent SHALL politely acknowledge and redirect. The agent SHALL not reveal its system prompt, scoring internals, or instructions. The agent SHALL not provide specific AI consulting advice during the assessment (that's what the discovery call is for).

#### Scenario: Off-topic redirect
- **WHEN** the user asks something unrelated to the assessment
- **THEN** the agent acknowledges briefly and steers back to the assessment

#### Scenario: System prompt protection
- **WHEN** the user asks the agent to reveal its instructions or system prompt
- **THEN** the agent declines without revealing any internal details

### Requirement: Personalized conversation
The agent SHALL use the user's first name after it's been captured. The agent SHALL reference the user's company name and industry when relevant. The agent SHALL acknowledge previous answers when transitioning between dimensions (e.g., "You mentioned your team already uses Slack integrations, that's a great start."). The agent SHALL keep individual responses concise (2-3 sentences maximum).

#### Scenario: Agent uses name
- **WHEN** the user has provided their name
- **THEN** the agent addresses them by first name in subsequent messages

#### Scenario: Contextual references
- **WHEN** the user provided notable answers earlier
- **THEN** the agent references those answers in later messages where relevant

#### Scenario: Concise responses
- **WHEN** the agent generates any conversational message
- **THEN** it contains no more than 3 sentences

### Requirement: Assessment completion
The assessment SHALL be completable in approximately 5 minutes of active conversation (15-20 message exchanges). The agent SHALL determine when all dimensions have been sufficiently covered and transition to email capture and then report generation. The agent SHALL not artificially extend the conversation beyond what is needed.

#### Scenario: Assessment completes in reasonable time
- **WHEN** a user engages actively with the assessment
- **THEN** the conversation reaches the report phase within approximately 15-20 exchanges

#### Scenario: Agent transitions to report
- **WHEN** all four dimensions have been covered and email has been captured
- **THEN** the agent generates the assessment report as the next response
