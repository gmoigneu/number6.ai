## ADDED Requirements

### Requirement: Chat window layout
The chat window SHALL display as an inline embedded section on the assessment page (not a dialog or popup), positioned below the introduction section. The chat container SHALL have a maximum width of 720px, centered on the page, with a minimum height of 500px on desktop and a minimum height of 400px on mobile. The chat window SHALL scroll naturally with the page.

#### Scenario: Chat window renders on desktop
- **WHEN** the assessment page loads on a viewport wider than 1024px
- **THEN** the chat window renders centered with max-width 720px, minimum height 500px, embedded inline below the introduction section

#### Scenario: Chat window renders on mobile
- **WHEN** the assessment page loads on a viewport narrower than 768px
- **THEN** the chat window fills the full width with 20px horizontal padding and minimum height 400px

### Requirement: Bot message bubbles
Bot messages SHALL render as left-aligned message cards with a dark background (`#1A1A1A`), subtle border (`#333`), rounded corners, and a bot avatar (Number6 "6" mark in a terracotta circle) to the left. Messages SHALL use Inter font at 15px with `#E0E0E0` text color. Messages SHALL support markdown-style bold and line breaks.

#### Scenario: Bot sends a message
- **WHEN** the agent delivers a new message via the API
- **THEN** the message appears left-aligned with the bot avatar, dark background card, and properly formatted text

#### Scenario: Bot message with formatting
- **WHEN** a bot message contains bold text or line breaks
- **THEN** the formatting renders correctly within the message bubble

### Requirement: User message bubbles
User messages SHALL render as right-aligned message cards with a terracotta background (`#C45A3B`) and light text (`#FFFFFF`). User messages SHALL NOT show an avatar. Messages SHALL use Inter font at 15px.

#### Scenario: User sends a message
- **WHEN** the user submits a response (quick reply or free text)
- **THEN** the message appears right-aligned with terracotta background and white text

### Requirement: Typing indicator
The bot SHALL display a typing indicator (three animated dots with an "Agent is thinking..." label) while waiting for the API response. The indicator SHALL appear immediately when the user sends a message and disappear when the agent's response arrives. The typing indicator SHALL appear in the same position as a bot message bubble with the bot avatar.

#### Scenario: Typing indicator during API call
- **WHEN** the user sends a message and the API call is in progress
- **THEN** a typing indicator with animated dots appears until the response arrives

#### Scenario: Typing indicator scroll behavior
- **WHEN** the typing indicator appears
- **THEN** the chat window auto-scrolls to keep the typing indicator visible

### Requirement: Quick reply buttons
When the agent's response metadata includes `suggested_replies`, the chat SHALL display quick reply buttons below the bot's message. Buttons SHALL render as outlined chips with a 1px border (`#444`), Inter font at 14px, and terracotta text. On hover, buttons SHALL show a terracotta border. On selection, the selected button SHALL animate to a filled terracotta state and the button text SHALL be sent as the user's message. For `single-choice` input_type, unselected buttons SHALL fade out and become disabled after selection. For `multi-choice`, a "Continue" button SHALL appear after at least one selection.

#### Scenario: Single-choice quick reply
- **WHEN** the agent provides suggested_replies with input_type "single-choice"
- **THEN** quick reply buttons appear, tapping one sends it as the user's response while disabling the others

#### Scenario: Multi-choice quick reply
- **WHEN** the agent provides suggested_replies with input_type "multi-choice"
- **THEN** quick reply buttons appear, multiple can be toggled, and a "Continue" button appears after at least one is selected

#### Scenario: Quick reply button hover
- **WHEN** the user hovers over a quick reply button
- **THEN** the button border changes to terracotta

### Requirement: Free text input
The chat SHALL always display a text input field at the bottom of the chat window with a send button (arrow icon in terracotta). The input SHALL accept free-text responses at all times (users can type even when quick replies are shown). The user SHALL be able to submit by pressing Enter or clicking the send button. The input SHALL be disabled while waiting for an API response (typing indicator active).

#### Scenario: Free text input available
- **WHEN** the chat window is active and not waiting for a response
- **THEN** the text input at the bottom is enabled and accepts input

#### Scenario: Submit free text via Enter
- **WHEN** the user types text and presses Enter
- **THEN** the text is sent as a user message and the input clears

#### Scenario: Submit free text via button
- **WHEN** the user types text and clicks the send button
- **THEN** the text is sent as a user message and the input clears

#### Scenario: Empty submission prevented
- **WHEN** the user tries to submit an empty text input
- **THEN** nothing happens and the input remains focused

#### Scenario: Input disabled during API call
- **WHEN** the chatbot is waiting for an agent response
- **THEN** the text input is disabled and shows a muted state

### Requirement: Lead capture step
When the agent's response metadata includes `input_type: "lead-capture"` with `lead_fields`, the chat SHALL display inline form fields within the chat flow. Fields SHALL match the dark input style used in the contact form (`#2A2A2A` background, light text). Required fields SHALL validate before allowing submission. The captured data SHALL be sent as a structured message to the agent API.

#### Scenario: Lead capture fields render
- **WHEN** the agent sends a response with input_type "lead-capture"
- **THEN** form fields render inline in the chat based on the lead_fields specification

#### Scenario: Email validation on lead capture
- **WHEN** the user submits a lead-capture step with an invalid email format
- **THEN** an inline error message appears below the email field and submission is blocked

#### Scenario: Lead capture submission
- **WHEN** the user fills in the required fields and submits
- **THEN** the data is sent to the agent API as a structured message and stored in localStorage

### Requirement: Auto-scroll behavior
The chat window SHALL automatically scroll to the bottom when new messages appear (bot or user). If the user has manually scrolled up to review previous messages, auto-scroll SHALL NOT activate until the user scrolls back to within 100px of the bottom.

#### Scenario: Auto-scroll on new message
- **WHEN** a new message appears and the user is at or near the bottom of the chat
- **THEN** the chat window smoothly scrolls to show the new message

#### Scenario: Preserve scroll position when reviewing
- **WHEN** the user has scrolled up more than 100px from the bottom and a new message appears
- **THEN** the chat window does NOT auto-scroll, preserving the user's reading position

### Requirement: Progress indicator
A thin progress bar SHALL appear at the top of the chat window showing the user's progression through the assessment. The bar SHALL use terracotta fill on a muted background. Progress SHALL be read from the agent's response metadata `progress` field (0.0 to 1.0).

#### Scenario: Progress updates from agent metadata
- **WHEN** the agent returns a response with progress 0.35
- **THEN** the progress bar fills to 35%

#### Scenario: Progress reaches 100%
- **WHEN** the agent returns a response with progress 1.0
- **THEN** the progress bar fills to 100% before transitioning to the report view

### Requirement: API communication
The chatbot component SHALL communicate with the assessment agent via fetch calls to the configured API URL (from `PUBLIC_ASSESSMENT_API_URL` environment variable). On mount, the component SHALL either start a new conversation (`POST /api/conversations`) or resume an existing one (using session ID from localStorage with `GET /api/conversations/{id}`). User messages SHALL be sent via `POST /api/conversations/{id}/messages`.

#### Scenario: Start new conversation
- **WHEN** the chatbot mounts with no existing session in localStorage
- **THEN** it calls POST /api/conversations and displays the welcome message

#### Scenario: Resume existing conversation
- **WHEN** the chatbot mounts with a valid session in localStorage
- **THEN** it calls GET /api/conversations/{id} to verify the session and displays the stored messages

#### Scenario: API error handling
- **WHEN** an API call fails (network error, 500, timeout)
- **THEN** an error message appears in the chat: "Something went wrong. Please try again." with a retry option

#### Scenario: Session expired on resume
- **WHEN** the chatbot tries to resume a session that has expired on the server (404)
- **THEN** it clears localStorage and starts a new conversation

### Requirement: localStorage persistence
The chatbot SHALL persist conversation state to localStorage under the key `n6-assessment-session`. Stored data SHALL include: session_id, messages array, lead_data object, progress float, startedAt timestamp, and lastMessageAt timestamp. The state SHALL be updated after every message exchange. Sessions older than 24 hours SHALL be automatically cleared on page load.

#### Scenario: State saved after each message
- **WHEN** a user sends a message and receives a response
- **THEN** the full conversation state is saved to localStorage

#### Scenario: State restored on page load
- **WHEN** the user navigates away and returns to the assessment page within 24 hours
- **THEN** the chatbot displays a resume prompt with the stored conversation

#### Scenario: Expired session cleared
- **WHEN** the stored session is older than 24 hours
- **THEN** it is cleared from localStorage and a fresh conversation starts

### Requirement: Resume prompt
When a stored session exists and is less than 24 hours old, the chatbot SHALL display a resume prompt before the chat window: "Welcome back! You have an assessment in progress." with two buttons: "Continue where I left off" and "Start fresh". Selecting "Continue" restores the conversation. Selecting "Start fresh" clears localStorage and begins a new session.

#### Scenario: Resume prompt shown
- **WHEN** the assessment page loads with a valid stored session
- **THEN** a resume prompt appears with Continue and Start fresh options

#### Scenario: User chooses to continue
- **WHEN** the user clicks "Continue where I left off"
- **THEN** the stored messages are displayed and the conversation resumes from the last point

#### Scenario: User chooses to start fresh
- **WHEN** the user clicks "Start fresh"
- **THEN** localStorage is cleared and a new conversation begins

### Requirement: Dark theme consistency
The entire chatbot interface SHALL use the dark color scheme: background `#111111`, card backgrounds `#1A1A1A`, borders `#333`, text `#E0E0E0` for body and `#FFFFFF` for headings. Accent color `#C45A3B` (terracotta) for interactive elements, user messages, and highlights. This matches the dark sections used elsewhere on the site (How We Work, contact form).

#### Scenario: Visual theme matches site dark sections
- **WHEN** the chatbot renders
- **THEN** all colors, fonts, and spacing are consistent with the Number6 dark theme used in other site sections

### Requirement: Mobile keyboard handling
On mobile devices, when the free-text input receives focus and the software keyboard appears, the chat window SHALL adjust its layout to keep the input visible. The input area SHALL not be hidden behind the keyboard.

#### Scenario: Mobile keyboard opens
- **WHEN** the user taps the text input on a mobile device
- **THEN** the chat adjusts and the input remains visible above the keyboard

#### Scenario: Mobile keyboard closes
- **WHEN** the user dismisses the keyboard on mobile
- **THEN** the chat window returns to its normal layout
