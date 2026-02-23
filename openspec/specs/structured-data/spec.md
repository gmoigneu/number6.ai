## ADDED Requirements

### Requirement: SchemaOrg component renders JSON-LD
A `SchemaOrg.astro` component at `src/components/SchemaOrg.astro` SHALL accept a `schemas` prop (array of JSON-LD objects) and render them inside a single `<script type="application/ld+json">` tag as a JSON array.

#### Scenario: Single schema renders
- **WHEN** SchemaOrg is given one Organization schema object
- **THEN** it renders `<script type="application/ld+json">[{...}]</script>` with the object

#### Scenario: Multiple schemas render
- **WHEN** SchemaOrg is given Organization and WebSite schema objects
- **THEN** both appear in the JSON array inside the script tag

### Requirement: Organization schema on homepage
The homepage SHALL include an Organization JSON-LD schema with: `@type: "ProfessionalService"`, name, url, logo, description, address (Houston + Manchester), contactPoint with email, sameAs (LinkedIn), and areaServed.

#### Scenario: Organization schema renders on homepage
- **WHEN** the homepage loads
- **THEN** the page contains a JSON-LD script with `@type: "ProfessionalService"` and business details

### Requirement: WebSite schema on homepage
The homepage SHALL include a WebSite JSON-LD schema with: `@type: "WebSite"`, name, url, and potentialAction (SearchAction) if applicable.

#### Scenario: WebSite schema renders on homepage
- **WHEN** the homepage loads
- **THEN** the page contains a JSON-LD script with `@type: "WebSite"` and the site URL

### Requirement: BlogPosting schema on blog articles
Each blog article page SHALL include a BlogPosting JSON-LD schema with: headline, datePublished (ISO 8601), author (Person with name and url), description, image (absolute URL), publisher (Organization), and mainEntityOfPage.

#### Scenario: BlogPosting schema renders on article
- **WHEN** a blog article page loads
- **THEN** the page contains a JSON-LD script with `@type: "BlogPosting"` populated from frontmatter

### Requirement: Service schema on services page
The services page SHALL include Service JSON-LD schemas for each service offering with: `@type: "Service"`, name, description, provider (Organization), and offers with price and priceCurrency.

#### Scenario: Service schemas render on services page
- **WHEN** the `/services` page loads
- **THEN** the page contains JSON-LD with multiple Service objects including pricing

### Requirement: BreadcrumbList schema on inner pages
All inner pages (not homepage) SHALL include a BreadcrumbList JSON-LD schema with the navigation path: Home > Section > Page.

#### Scenario: Breadcrumb schema renders on about page
- **WHEN** the `/about` page loads
- **THEN** the page contains a JSON-LD script with `@type: "BreadcrumbList"` listing Home and About items

#### Scenario: Breadcrumb schema renders on blog article
- **WHEN** a blog article page loads
- **THEN** the page contains a BreadcrumbList with Home > Blog > Article Title

### Requirement: Business data constants
A `src/data/business.ts` file SHALL export shared business data (company name, URLs, addresses, contact info) used by structured data schemas to avoid duplication across pages.

#### Scenario: Business data is centralized
- **WHEN** a page needs Organization schema fields
- **THEN** it imports from `src/data/business.ts` rather than hardcoding values

### Requirement: FAQPage schema on the FAQ page
The FAQ page SHALL include a FAQPage JSON-LD schema injected via `SchemaOrg.astro`. The schema MUST include a `mainEntity` array with one `Question` object per FAQ item. Each `Question` SHALL have: `@type: "Question"`, `name` (the question text), and `acceptedAnswer` with `@type: "Answer"` and `text` (the full answer text).

#### Scenario: FAQPage schema renders on /faq
- **WHEN** the `/faq` page loads
- **THEN** the page contains a JSON-LD script with `@type: "FAQPage"` and a `mainEntity` array of 20 Question objects

#### Scenario: Each Question has a valid acceptedAnswer
- **WHEN** the FAQPage schema is parsed
- **THEN** every item in `mainEntity` has `@type: "Question"`, a non-empty `name`, and an `acceptedAnswer` with `@type: "Answer"` and non-empty `text`
