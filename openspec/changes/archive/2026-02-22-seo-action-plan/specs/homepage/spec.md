## MODIFIED Requirements

### Requirement: What We Do section
The What We Do section SHALL display a header (label, headline, subtitle) and four service cards in a horizontal row. Each card SHALL have: a number (01-04 in terracotta 44px), title (uppercase), subtitle, description, and a "LEARN MORE" link with arrow-right icon linking to `/services`. Cards SHALL have a 1px border and 32px padding.

#### Scenario: Service cards display
- **WHEN** the user views What We Do
- **THEN** four cards are visible: Learn (01), Plan (02), Build (03), Grow (04)

#### Scenario: Learn more links work
- **WHEN** the user clicks any "LEARN MORE" link in What We Do
- **THEN** they navigate to `/services` (not `/services/companies`)

## ADDED Requirements

### Requirement: Homepage structured data
The homepage SHALL include Organization (ProfessionalService) and WebSite JSON-LD schemas via the SchemaOrg component, injected through the head slot.

#### Scenario: Homepage has Organization schema
- **WHEN** the homepage loads
- **THEN** the page contains a `<script type="application/ld+json">` with ProfessionalService and WebSite schemas
