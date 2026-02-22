## ADDED Requirements

### Requirement: Terms & Conditions page at /terms
The site SHALL serve a Terms & Conditions page at the `/terms` route using `LegalLayout` with title "Terms & Conditions", breadcrumb label "Terms & Conditions", and last updated date "February 22, 2026".

#### Scenario: Terms page loads
- **WHEN** a user navigates to `/terms`
- **THEN** the page renders with the LegalLayout, showing the full Terms & Conditions content from `docs/10-terms-and-conditions.md`

#### Scenario: Terms TOC
- **WHEN** the Terms page renders
- **THEN** the TOC sidebar lists all 18 sections from the Terms document as anchor links

### Requirement: Privacy Policy page at /privacy
The site SHALL serve a Privacy Policy page at the `/privacy` route using `LegalLayout` with title "Privacy Policy", breadcrumb label "Privacy Policy", and last updated date "February 22, 2026".

#### Scenario: Privacy page loads
- **WHEN** a user navigates to `/privacy`
- **THEN** the page renders with the LegalLayout, showing the full Privacy Policy content from `docs/11-privacy-policy.md`

#### Scenario: Privacy TOC
- **WHEN** the Privacy page renders
- **THEN** the TOC sidebar lists all 13 sections from the Privacy Policy document as anchor links

### Requirement: Cookie Policy page at /cookies
The site SHALL serve a Cookie Policy page at the `/cookies` route using `LegalLayout` with title "Cookie Policy", breadcrumb label "Cookie Policy", and last updated date "February 22, 2026".

#### Scenario: Cookies page loads
- **WHEN** a user navigates to `/cookies`
- **THEN** the page renders with the LegalLayout, showing the full Cookie Policy content from `docs/12-cookie-policy.md`

#### Scenario: Cookies TOC
- **WHEN** the Cookies page renders
- **THEN** the TOC sidebar lists all 8 sections from the Cookie Policy document as anchor links

### Requirement: Legal page content uses semantic HTML
All three legal pages SHALL render their content using semantic HTML elements: `<h2>` for section headings, `<p>` for paragraphs, `<ul>`/`<li>` for lists, `<strong>` for bold text, `<blockquote>` for callout quotes, and `<table>` for tabular data where present in the source documents.

#### Scenario: Content uses semantic markup
- **WHEN** a legal page renders its body content
- **THEN** the content uses appropriate semantic HTML elements matching the source document structure

### Requirement: Legal pages include section anchors
Each content section heading on all three legal pages SHALL have an `id` attribute matching the TOC entry's `id`, enabling anchor link navigation from the TOC.

#### Scenario: TOC link navigates to section
- **WHEN** a user clicks a TOC entry
- **THEN** the page scrolls to the corresponding section heading via its `id` anchor
