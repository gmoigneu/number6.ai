## ADDED Requirements

### Requirement: Assessment page route
The assessment SHALL be available at the `/assessment` route via a new Astro page file at `src/pages/assessment.astro`. The page SHALL use `BaseLayout.astro` with title "AI Readiness Assessment" and a descriptive meta description about evaluating AI readiness.

#### Scenario: Page accessible at /assessment
- **WHEN** a user navigates to `/assessment`
- **THEN** the assessment page loads with the correct title and meta description

#### Scenario: Page uses BaseLayout
- **WHEN** the assessment page renders
- **THEN** it includes the standard Header and Footer from BaseLayout

### Requirement: Full dedicated page layout
The assessment SHALL be a full dedicated page (not a dialog, popup, or overlay). The page SHALL contain: (1) an introduction section with warm off-white background, (2) the chat window embedded inline below the introduction on a dark background, and (3) the standard site footer. The chat window is part of the page flow and scrolls naturally with the page content.

#### Scenario: Page renders as full page
- **WHEN** the assessment page loads
- **THEN** it renders as a full page with introduction section, inline chat window, and footer in sequence

#### Scenario: Chat is inline, not a dialog
- **WHEN** the chat window renders
- **THEN** it is embedded in the page flow below the introduction section, not floating or overlaid

### Requirement: Introduction section
The introduction section above the chat SHALL include: a terracotta uppercase label "AI READINESS ASSESSMENT", a headline (Space Grotesk, large), a brief description paragraph explaining the assessment value, a prominent time estimate badge showing "~5 minutes", and a "What you'll get" list (personalized score, dimension breakdown, actionable recommendations). The section SHALL use the warm off-white site background.

#### Scenario: Introduction renders with all elements
- **WHEN** the assessment page loads
- **THEN** the introduction section shows the label, headline, description, time estimate, and benefits list

#### Scenario: Time estimate is prominent
- **WHEN** the user views the introduction section
- **THEN** the ~5 minutes time estimate is clearly visible as a badge or callout (not buried in body text)

### Requirement: Assessment page SEO
The page SHALL include: a title tag "AI Readiness Assessment | Number6", a meta description explaining the assessment, Open Graph tags (og:title, og:description, og:type="website"), and JSON-LD structured data using the `WebApplication` schema type.

#### Scenario: SEO meta tags present
- **WHEN** a search engine crawls `/assessment`
- **THEN** the page has a title tag, meta description, OG tags, and JSON-LD structured data

### Requirement: Header navigation link
The assessment SHALL be accessible from the site header. A "Free AI Assessment" link or button SHALL appear in the header navigation, styled distinctly from other nav links (terracotta text or a small badge/indicator to draw attention). On mobile, the link SHALL appear in the mobile navigation menu.

#### Scenario: Header link visible on desktop
- **WHEN** the site header renders on desktop
- **THEN** a "Free AI Assessment" link is visible in the navigation

#### Scenario: Header link visible on mobile
- **WHEN** the mobile navigation menu opens
- **THEN** a "Free AI Assessment" link is present in the menu

#### Scenario: Header link navigates to assessment
- **WHEN** the user clicks the "Free AI Assessment" header link
- **THEN** they navigate to `/assessment`

### Requirement: Homepage CTA integration
The homepage SHALL include a reference to the AI Readiness Assessment. This SHALL be implemented as either: a new dedicated section, or an addition to the existing Final CTA section. The CTA SHALL include a compelling headline, brief description of the assessment value, the time estimate (~5 minutes), and a button linking to `/assessment`.

#### Scenario: Homepage promotes assessment
- **WHEN** the homepage loads
- **THEN** at least one section includes a CTA directing users to the AI Readiness Assessment

#### Scenario: CTA links to assessment page
- **WHEN** the user clicks the assessment CTA on the homepage
- **THEN** they navigate to `/assessment`

### Requirement: Assessment page responsive design
The assessment page layout SHALL be fully responsive. The introduction section SHALL reduce font sizes on mobile (headline from 48px to 32px). The chatbot container SHALL adjust from centered max-width 720px on desktop to full-width with 20px padding on mobile. Desktop horizontal padding SHALL be 64px.

#### Scenario: Desktop layout
- **WHEN** viewport is 1024px or wider
- **THEN** the page renders with 64px horizontal padding, centered content, and large typography

#### Scenario: Mobile layout
- **WHEN** viewport is narrower than 768px
- **THEN** the page renders with 20px horizontal padding, full-width chatbot, and reduced typography

### Requirement: Assessment structured data
The page SHALL include JSON-LD structured data with: a `WebApplication` schema including name, description, url, and applicationCategory "BusinessApplication". It SHALL also include a `BreadcrumbList` schema with Home > AI Readiness Assessment.

#### Scenario: Structured data present
- **WHEN** the assessment page loads
- **THEN** the page contains JSON-LD with WebApplication and BreadcrumbList schemas

### Requirement: Design document for Pencil
A design document SHALL be created specifying the visual design for the assessment page and chatbot UI. The document SHALL cover: full page layout with introduction section and inline chat window, chatbot container dimensions and styling, message bubble designs (bot and user), quick reply button states (default, hover, selected, disabled), lead capture field styling, typing indicator animation, progress bar design, resume prompt design, report layout with score visualizations, CTA section design, time estimate badge design, and all responsive breakpoints. The document SHALL reference existing Number6 design tokens and patterns from the design system.

#### Scenario: Design document covers all components
- **WHEN** the designer reviews the design document
- **THEN** it includes specifications for every visual component of the assessment page and chatbot

#### Scenario: Design document uses existing tokens
- **WHEN** the design document specifies colors, fonts, and spacing
- **THEN** it references the existing Number6 design system tokens (terracotta, dark foreground, Space Grotesk, Inter, etc.)
