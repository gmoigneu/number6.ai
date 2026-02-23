## ADDED Requirements

### Requirement: Homepage section structure
The homepage SHALL render all sections in this order: Hero, Trust Bar, The Problem, What We Do, How We Work, Why number6, Who It's For, Social Proof, The Name, Final CTA. Each section SHALL be a separate Astro component under `src/components/sections/`.

#### Scenario: All sections render
- **WHEN** the homepage loads
- **THEN** all 10 content sections render vertically in the correct order between the Header and Footer

### Requirement: Hero section
The Hero SHALL display:
- Headline: "AI that works.\nFor people who work." (Space Grotesk, 72px on desktop, weight 700, letter-spacing -3px, centered)
- Subheadline: descriptive paragraph (Inter, 18px, gray `#888`, max-width 700px, centered)
- Two CTA buttons: primary "BOOK A FREE DISCOVERY CALL" (terracotta bg with arrow-right icon) and secondary "SEE HOW WE WORK" (outlined with arrow-down icon)
- Full-width dark divider at the bottom (4px height)
- Section padding: 120px top, 100px bottom, 64px horizontal

#### Scenario: Hero renders with CTAs
- **WHEN** the homepage loads
- **THEN** the Hero section shows headline, subheadline, two CTA buttons, and a dark divider

### Requirement: Trust Bar section
The Trust Bar SHALL display three statistics on a dark background with vertical dividers between them. Stats: "60%" / "77%" / "91%" in terracotta, each with a description below in gray.

#### Scenario: Trust Bar displays stats
- **WHEN** the user scrolls past the Hero
- **THEN** three statistics are visible with terracotta numbers and gray descriptions

### Requirement: The Problem section
The Problem SHALL display a section label ("THE PROBLEM" in terracotta, uppercase, small), a headline ("AI is everywhere.\nClarity isn't." in Space Grotesk 56px), and two body paragraphs followed by a bold callout ("That's where we come in.").

#### Scenario: Problem section renders
- **WHEN** the user views The Problem section
- **THEN** they see the label, headline, body paragraphs, and bold callout text

### Requirement: What We Do section
The What We Do section SHALL display a header (label, headline, subtitle) and four service cards in a horizontal row. Each card SHALL have: a number (01-04 in terracotta 44px), title (uppercase), subtitle, description, and a "LEARN MORE" link with arrow-right icon linking to `/services`. Cards SHALL have a 1px border and 32px padding.

#### Scenario: Service cards display
- **WHEN** the user views What We Do
- **THEN** four cards are visible: Learn (01), Plan (02), Build (03), Grow (04)

#### Scenario: Learn more links work
- **WHEN** the user clicks any "LEARN MORE" link in What We Do
- **THEN** they navigate to `/services` (not `/services/companies`)

### Requirement: How We Work section
The How We Work section SHALL have a dark background with a header and three step cards in a row. Each step SHALL have: a large number (01-03, terracotta 64px), title (uppercase, white), and description (gray). Cards SHALL have a 1px border in `#333` and 40px padding.

#### Scenario: Steps display on dark background
- **WHEN** the user views How We Work
- **THEN** three steps are visible: "WE LISTEN", "WE PLAN (HONESTLY)", "WE BUILD & TEACH"

### Requirement: Why number6 section
The Why number6 section SHALL display a header (label, headline, full-width divider) and five differentiator cards in a vertical stack. Each card SHALL have: an icon in a bordered square, a title (Space Grotesk 24px, bold), and description. Cards have a 1px border and 40px padding. Icons: tag, shield-check, users, globe, graduation-cap.

#### Scenario: Five differentiators display
- **WHEN** the user views Why number6
- **THEN** five cards are visible with icons, titles, and descriptions

### Requirement: Who It's For section
The Who It's For section SHALL have a warm beige (`#E8E4DD`) background. It displays a header, four audience cards in a row, and a footnote. Each card SHALL have: a Lucide icon (terracotta), uppercase title, and description. Cards have warm white (`#F5F2ED`) background and 2px dark border.

#### Scenario: Audience cards display
- **WHEN** the user views Who It's For
- **THEN** four cards are visible: Professional Services, Marketing & Creative, Operations-Heavy, Tech-Forward SMBs

### Requirement: Social Proof section
The Social Proof section SHALL display a header (label + headline), a bordered quote block with large terracotta quotation mark, and four stat cards in a row (5-10 hrs, 30-90 days, 8-25 members, 80%+).

#### Scenario: Quote and stats display
- **WHEN** the user views Social Proof
- **THEN** the quote block and four stat cards are visible

### Requirement: The Name section
The Name section SHALL have a beige background with a large semi-transparent "6" (terracotta, 200px, opacity 0.2) positioned alongside the text content (headline + two paragraphs).

#### Scenario: Brand story renders
- **WHEN** the user views The Name section
- **THEN** the large "6" and explanation text are visible

### Requirement: Final CTA section
The Final CTA SHALL have a terracotta (`#C45A3B`) background with centered headline (Space Grotesk 48px, light text), subtitle, a dark button "BOOK YOUR FREE CALL" with arrow-right icon, and supporting text below. Padding: 120px top/bottom, 64px horizontal.

#### Scenario: CTA renders on terracotta
- **WHEN** the user views the Final CTA
- **THEN** the headline, button, and supporting text are visible on the terracotta background

### Requirement: Homepage structured data
The homepage SHALL include Organization (ProfessionalService) and WebSite JSON-LD schemas via the SchemaOrg component, injected through the head slot.

#### Scenario: Homepage has Organization schema
- **WHEN** the homepage loads
- **THEN** the page contains a `<script type="application/ld+json">` with ProfessionalService and WebSite schemas
