## ADDED Requirements

### Requirement: Contact page route
The system SHALL serve a contact page at the `/contact` URL path using the shared `BaseLayout.astro` with title "Contact Us — number6.ai".

#### Scenario: Page loads at /contact
- **WHEN** a user navigates to `/contact`
- **THEN** the page renders with the site header, all contact page sections, and the site footer

### Requirement: Contact Hero section
The system SHALL display a hero section with:
- A "CONTACT" label in terracotta uppercase
- Headline: "Let's talk. No pitch, no pressure — just a conversation."
- Descriptive subtext
- A horizontal divider line

#### Scenario: Hero renders on page load
- **WHEN** the contact page loads
- **THEN** the hero section is visible at the top with the headline, label, subtext, and divider

### Requirement: Contact Options section
The system SHALL display three contact option cards in a horizontal row:
1. **Discovery Call card** (dark background) — with video icon, "Book a Discovery Call" title, description, and "BOOK YOUR FREE CALL" CTA button linking to a booking URL
2. **Send Message card** (light background, dark border) — with mail icon, "Send Us a Message" title, description, and "SCROLL TO FORM" button that scrolls to the form section
3. **Email card** (light background, dark border) — with at-sign icon, "Email Us Directly" title, description, and "hello@number6.ai" mailto link

#### Scenario: Three option cards display
- **WHEN** the contact page loads
- **THEN** three cards are visible in a row with distinct styling (first dark, second and third light with borders)

#### Scenario: Scroll to form button
- **WHEN** a user clicks the "SCROLL TO FORM" button on the Send Message card
- **THEN** the page scrolls smoothly to the contact form section

#### Scenario: Email link
- **WHEN** a user clicks the email address on the Email card
- **THEN** the user's email client opens with a new message to hello@number6.ai

### Requirement: What to Expect section
The system SHALL display a "Here's what happens next." section with three numbered steps (01, 02, 03), each with a terracotta top border, step number, title, and description text.

#### Scenario: Three steps display
- **WHEN** the contact page loads
- **THEN** three steps are visible with numbers 01, 02, 03 and corresponding titles and descriptions

### Requirement: FAQ section
The system SHALL display an FAQ section with 5 accordion items on a warm beige background. Each item has a question title and expandable answer. Only one item SHALL be open at a time.

#### Scenario: FAQ renders with first item open
- **WHEN** the contact page loads
- **THEN** the FAQ section displays with 5 questions, the first item expanded showing its answer, and the rest collapsed

#### Scenario: Toggle FAQ item
- **WHEN** a user clicks a collapsed FAQ question
- **THEN** that item expands to show its answer and any previously open item collapses

#### Scenario: Collapse open FAQ item
- **WHEN** a user clicks an already-open FAQ question
- **THEN** that item collapses and no items are open

### Requirement: Locations section
The system SHALL display a "We're where you are." section with two location cards (Houston, Texas and Manchester, United Kingdom), each showing a map-pin icon, city name, timezone, and availability description. A note below explains virtual delivery worldwide.

#### Scenario: Two location cards display
- **WHEN** the contact page loads
- **THEN** two location cards are visible with city names, timezones, and descriptions

### Requirement: Contact Final CTA section
The system SHALL display a full-width terracotta CTA section with headline "Still thinking about it? That's fine.", descriptive text, and a "BOOK YOUR FREE DISCOVERY CALL" button on a dark background.

#### Scenario: Final CTA renders
- **WHEN** the contact page loads
- **THEN** the terracotta CTA section is visible with headline and booking button

### Requirement: Responsive layout
All contact page sections SHALL be responsive, stacking vertically on mobile viewports. The three-column layouts (Contact Options, What to Expect) SHALL collapse to single-column on screens narrower than 768px.

#### Scenario: Mobile layout
- **WHEN** the page is viewed on a viewport narrower than 768px
- **THEN** multi-column sections stack vertically and text sizes adjust appropriately
