## ADDED Requirements

### Requirement: Services page route and layout
The site SHALL provide a `/services` route at `src/pages/services.astro` that uses `BaseLayout.astro` and renders all services sections in order: ServicesHero, HowServicesWork, TrackLearn, TrackPlan, TrackBuild, TrackGrow, BundlePackages, PricingNotes, ServicesCta.

#### Scenario: Page renders all sections
- **WHEN** a user navigates to `/services`
- **THEN** all 9 content sections render vertically between the Header and Footer

#### Scenario: Page uses shared layout
- **WHEN** the page loads
- **THEN** it renders inside BaseLayout with the shared Header, Footer, fonts, and meta tags

### Requirement: Services Hero section
The ServicesHero SHALL display:
- Label: "SERVICES & PRICING" (terracotta, Space Grotesk 11px, weight 600, letter-spacing 2px, uppercase)
- Headline: "Transparent pricing.\nNo hidden fees. No surprises." (Space Grotesk 56px, weight 700, letter-spacing -2px, line-height 1.1, centered, max-width 900px)
- Subtitle: "In an industry where 89% of competitors hide their rates, we publish ours. All prices are starting points — final scope is confirmed after a free discovery call." (Inter 17px, gray, line-height 1.6, centered, max-width 680px)
- CTA button: "BOOK A FREE DISCOVERY CALL" with arrow-right icon (terracotta bg, light text, Space Grotesk 14px, weight 600, letter-spacing 1px)
- Full-width dark divider (4px height) at bottom

Section padding: 100px top, 80px bottom, 64px horizontal. Light background. All items center-aligned.

#### Scenario: Hero renders correctly
- **WHEN** the services page loads
- **THEN** the hero section displays label, headline, subtitle, CTA button, and dark divider

### Requirement: How Services Work section
The HowServicesWork section SHALL display:
- Headline: "Four tracks. One clear path." (Space Grotesk 40px, weight 700, letter-spacing -2px, centered)
- Body: "We've organized everything we do into four tracks: Learn, Plan, Build, and Grow. Most clients start with Learn or Plan, then progress naturally. Every engagement includes direct access to our senior team." (Inter 16px, gray, line-height 1.6, centered, max-width 700px)
- Four track navigation cards in a horizontal row, each containing:
  - Number (terracotta, Space Grotesk 36px, weight 700, letter-spacing -1px)
  - Title (uppercase, Space Grotesk 18px, weight 700, letter-spacing 1px)
  - Description (Inter 13px, gray, line-height 1.5)
  - Starting price (terracotta, Space Grotesk 14px, weight 600)

Track nav cards: 01 LEARN (dark bg, light text) "Understand AI before you invest" From $2,500 | 02 PLAN "Strategy before you spend" From $3,500 | 03 BUILD "Custom AI solutions, deployed" From $10,000 | 04 GROW "Ongoing AI partnership" From $2,000/mo. Cards 02-04 have light bg with 1px dark border.

Section padding: 80px vertical, 64px horizontal. Gap 48px between elements.

#### Scenario: Track navigation displays
- **WHEN** the user views the How Services Work section
- **THEN** four track cards are visible with numbers, titles, descriptions, and starting prices

### Requirement: Track 1 LEARN section
The TrackLearn section SHALL have a dark (`#1A1A1A`) background and display:
- Header row: left side with "TRACK 01" label (terracotta) and "LEARN" title (Space Grotesk 64px, light text), right side with description "For teams that want to understand AI before they invest in it." (gray, Inter 16px, max-width 400px)
- Divider: 1px line in `#333`
- Two rows of two service cards each (4 total), with 20px gap between cards

Service cards SHALL have 1px `#333` border, 32px padding, vertical layout with 20px gap:

**Card 1 — AI Kickstart** (HALF-DAY WORKSHOP): Workshop description, includes list (3.5-hour session up to 15 people, live demos, hands-on exercises, resource pack, 30-day email support), best-for note in italic, price $2,500.

**Card 2 — AI Foundations** (FULL-DAY INTENSIVE): Full-day description, includes list (7 hours up to 20 participants, advanced prompt engineering, AI tool landscape, role-specific breakouts, custom AI playbook, 60-day email support), best-for note, price $5,000.

**Card 3 — AI Coaching** (1-ON-1 EXECUTIVE SESSIONS): Private sessions description, includes list (4 x 90-minute sessions over 4-6 weeks, custom curriculum, assignments, tool setup, direct messaging), best-for note, price $3,000 (4-session package · Single: $900 · 8-pack: $5,500).

**Card 4 — Team Training** (4-WEEK COHORT COURSE): Comprehensive program description, includes list (4 x 2-hour weekly sessions, progressive curriculum, async materials, group channel, certificates), best-for note, price $8,000 (up to 15 participants · +$400 each max 25).

Card text colors: title in light `#F5F2ED`, subtitle in terracotta, description in `#999`, includes label in `#888`, includes list in `#777`, best-for in `#999` italic, price in light `#F5F2ED`.

Section padding: 80px vertical, 64px horizontal. Gap 48px.

#### Scenario: LEARN track renders with 4 service cards
- **WHEN** the user views Track 1
- **THEN** the header, divider, and 4 service cards are visible with all content

#### Scenario: Card content is complete
- **WHEN** the user reads any LEARN service card
- **THEN** it shows title, subtitle, description, includes list, best-for note, and price

### Requirement: Track 2 PLAN section
The TrackPlan section SHALL have a light background and display:
- Header row: "TRACK 02" label + "PLAN" title (Space Grotesk 64px, dark text) on left, description on right
- Divider: 4px dark line
- Two service cards in a row (equal height), plus one wide card below

**Card 1 — AI Readiness Index™** (QUICK ASSESSMENT): One-week assessment across 6 dimensions, includes list (intake questionnaire, 90-min interview, 6-dimension assessment, scored report, top 5 opportunities, review call, exec summary), best-for note, price $3,500. Cards have 2px dark border.

**Card 2 — AI Strategy & Roadmap** (COMPREHENSIVE STRATEGY): 3-4 week audit with stakeholder interviews, includes list (full readiness index, up to 8 interviews, workflow analysis, 12-month roadmap, top 3 business cases, tool recommendations, governance assessment, 90-day advisory), best-for note, price $12,000 – $18,000 (scope confirmed after discovery call).

**Card 3 — AI Workflow Audit** (DEPARTMENT DEEP-DIVE): Wide card with two-column layout (left: content, right: includes + price). Department-focused engagement, includes list (2-3 week engagement, up to 5 interviews, workflow mapping, tool recommendations, savings projections, implementation plan), best-for note, price $6,000 – $9,000. 2px dark border, 40px padding, 64px gap between columns.

Section padding: 80px vertical, 64px horizontal. Gap 48px.

#### Scenario: PLAN track renders with 3 service cards
- **WHEN** the user views Track 2
- **THEN** the header, divider, 2 top cards, and 1 wide bottom card are visible

### Requirement: Track 3 BUILD section
The TrackBuild section SHALL have a dark (`#1A1A1A`) background and display:
- Header row: "TRACK 03" label + "BUILD" title (light text) on left, description on right
- Divider: 1px line in `#333`
- Three service cards stacked vertically, each with two-column layout (left: content, right: includes + price), 40px padding, 64px gap between columns, 1px `#333` border

**Card 1 — AI Pilot Project** (ONE FOCUSED AI SOLUTION): End-to-end build of one use case, examples listed, includes list (use case workshop, solution design, 4-8 week development, tool integration, team training, 30-day support, documentation), best-for note, price $10,000 – $20,000.

**Card 2 — Custom AI Agent** (PURPOSE-BUILT AI WITH MEMORY & CONTEXT): Custom agents with memory/context/tools, examples listed, includes list (agent design workshop, architecture, knowledge base, testing, guardrails, 60-day support, monitoring dashboard, documentation), best-for note, price $18,000 – $35,000.

**Card 3 — RAG Knowledge System** (ENTERPRISE-GRADE KNOWLEDGE RETRIEVAL): Organizational knowledge search via natural language, includes list (data audit, ingestion pipeline, vector DB, LLM with citations, web UI, access control, admin dashboard, 90-day support), best-for note, price $35,000 – $50,000.

Section padding: 80px vertical, 64px horizontal. Gap 48px.

#### Scenario: BUILD track renders with 3 service cards
- **WHEN** the user views Track 3
- **THEN** the header, divider, and 3 two-column service cards are visible

### Requirement: Track 4 GROW section
The TrackGrow section SHALL have a light background and display:
- Header row: "TRACK 04" label + "GROW" title (dark text) on left, description on right
- Divider: 4px dark line
- Three service cards in a horizontal row (equal height), 2px dark border, 32px padding

**Card 1 — Advisory Retainer** (ESSENTIALS): Fractional AI advisor description, bullet list (2 sessions/month, priority email 24hr, monthly brief, quarterly review, monthly office hours), price $3,000/mo (min 3-month commitment).

**Card 2 — Advisory Retainer** (GROWTH): Everything in Essentials plus hands-on, bullet list (4 sessions/month, 8 hrs hands-on/month, quarterly workshop, priority scoping, dedicated Slack), price $6,000/mo (min 3-month commitment).

**Card 3 — Managed AI Services** (ONGOING SYSTEM MANAGEMENT): System maintenance description, bullet list (monitoring, monthly reports, KB maintenance, prompt optimization, cost optimization, quarterly review), price $2,000 – $5,000/mo (scoped individually).

Section padding: 80px vertical, 64px horizontal. Gap 48px.

#### Scenario: GROW track renders with 3 cards
- **WHEN** the user views Track 4
- **THEN** the header, divider, and 3 retainer/managed service cards are visible

### Requirement: Bundle Packages section
The BundlePackages section SHALL have a muted beige (`#E8E4DD`) background with center-aligned content:
- Label: "COMMON JOURNEYS" (terracotta, uppercase, Space Grotesk 11px)
- Headline: "Save when you bundle." (Space Grotesk 48px, weight 700, letter-spacing -2px)
- Three bundle cards in a horizontal row (equal height), 2px dark border, 32px padding

**Card 1 — THE STARTER** (light bg): "For companies just beginning with AI", items with individual prices, original $12,000 crossed/muted, bundle price $10,500 (terracotta), "SAVE $1,500" badge (dark bg, light text).

**Card 2 — THE BUILDER** (dark bg): "For companies ready to implement", items with individual prices, original $35,000, bundle price $30,000 (terracotta), "SAVE $5,000" badge (terracotta bg, light text). Text colors inverted for dark card.

**Card 3 — THE ALL-IN** (light bg): "For companies going deep on AI", items with individual prices, original $57,000, bundle price $48,000 (terracotta), "SAVE $9,000" badge (dark bg, light text).

Section padding: 80px vertical, 64px horizontal. Gap 48px.

#### Scenario: Bundle cards display with savings
- **WHEN** the user views the Bundle Packages section
- **THEN** three bundle cards show items, original price, discounted price, and savings badge

### Requirement: Pricing Notes section
The PricingNotes section SHALL display:
- Header: "GOOD TO KNOW" label (terracotta) + "Pricing notes." title (Space Grotesk 40px, weight 700, letter-spacing -2px)
- Divider: 2px dark line
- Two-column grid (48px gap) with 6 notes total (3 per column):

Column 1: "Free discovery call" — Every engagement starts with a free 30-minute call | "All prices in USD" — UK/European clients invoiced in GBP/EUR | "Payment terms" — tiered by project size.

Column 2: "Travel" — virtual standard, Houston/Manchester free, others quoted | "What's not included" — third-party licenses, API costs | "Satisfaction guarantee" — redo or refund policy.

Each note: title (Space Grotesk 16px, weight 700) + description (Inter 14px, gray, line-height 1.6), 8px gap between title and description, 32px gap between notes.

Section padding: 80px vertical, 64px horizontal. Gap 48px.

#### Scenario: Pricing notes display in two columns
- **WHEN** the user views the Pricing Notes section
- **THEN** six notes are visible in a two-column layout

### Requirement: Services Final CTA section
The ServicesCta section SHALL have a terracotta (`#C45A3B`) background with center-aligned content:
- Headline: "Ready to get started?" (Space Grotesk 48px, weight 700, letter-spacing -2px, light text)
- Subtitle: "Book a free 30-minute discovery call. We'll figure out the right engagement together — no pitch, no pressure." (Inter 17px, light text with slight transparency, line-height 1.6, max-width 600px)
- Button: "BOOK YOUR FREE CALL" with arrow-right icon (dark bg `#1A1A1A`, light text, padding 20px/40px)

Section padding: 100px vertical, 64px horizontal. Gap 40px.

#### Scenario: CTA renders on terracotta background
- **WHEN** the user views the final CTA
- **THEN** the headline, subtitle, and dark button are visible on the terracotta background

### Requirement: Service structured data on services page
The services page SHALL include Service JSON-LD schemas for all service offerings. Each service SHALL have `@type: "Service"`, name, description, provider (Organization reference), and offers with priceSpecification including price, priceCurrency (USD), and unitText where applicable.

#### Scenario: Service schemas render
- **WHEN** the `/services` page loads
- **THEN** the page contains `<script type="application/ld+json">` with Service objects for AI Kickstart, AI Foundations, AI Coaching, Team Training, AI Readiness Index, AI Strategy & Roadmap, AI Workflow Audit, AI Pilot Project, Custom AI Agent, RAG Knowledge System, Advisory Retainer (Essentials), Advisory Retainer (Growth), and Managed AI Services

### Requirement: Services page breadcrumb schema
The services page SHALL include BreadcrumbList JSON-LD with: Home > Services & Pricing.

#### Scenario: Services breadcrumb renders
- **WHEN** the `/services` page loads
- **THEN** the page contains BreadcrumbList JSON-LD with two items

### Requirement: Track headers responsive layout
Each track section header (LEARN, PLAN, BUILD, GROW) with title and description side-by-side SHALL stack vertically on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** track title and description stack vertically

#### Scenario: Desktop viewport
- **WHEN** viewport is 768px or greater
- **THEN** track title and description display side-by-side

### Requirement: TrackLearn card rows layout
The TrackLearn service card rows (2 cards per row) SHALL stack to 1 column on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** service cards in each row stack vertically

#### Scenario: Tablet and above
- **WHEN** viewport is 768px or greater
- **THEN** service cards display 2 per row

### Requirement: TrackPlan cards layout
The TrackPlan top cards (2 side-by-side) SHALL stack on mobile. The bottom wide card (horizontal with sidebar) SHALL stack its content and sidebar vertically on mobile.

#### Scenario: Top cards on mobile
- **WHEN** viewport is less than 768px
- **THEN** the 2 plan cards stack vertically

#### Scenario: Bottom card on mobile
- **WHEN** viewport is less than 768px
- **THEN** the card description and includes sidebar stack vertically, sidebar becomes full-width

### Requirement: TrackBuild cards layout
The TrackBuild horizontal service cards (description + includes sidebar) SHALL stack their content vertically on mobile, with the fixed-width sidebar becoming full-width.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** card description and includes sidebar stack vertically

### Requirement: TrackGrow cards layout
The TrackGrow 3 service cards SHALL stack to 1 column on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** service cards stack vertically

#### Scenario: Tablet and above
- **WHEN** viewport is 768px or greater
- **THEN** service cards display side-by-side

### Requirement: HowServicesWork tracks layout
The 4 track overview cards SHALL stack on mobile and display in a row on desktop.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** track cards stack vertically

### Requirement: BundlePackages layout
The 3 bundle cards SHALL stack to 1 column on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** bundle cards stack vertically

#### Scenario: Tablet and above
- **WHEN** viewport is 768px or greater
- **THEN** bundle cards display side-by-side
