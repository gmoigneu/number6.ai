## ADDED Requirements

### Requirement: Full author identities
The author data file (`src/data/authors.ts`) SHALL use full names instead of initials for all authors. Each author record SHALL include a complete LinkedIn profile URL (not just the base URL) and a detailed bio with credentials.

#### Scenario: Author names are full names
- **WHEN** a blog post or about page displays an author
- **THEN** the author's full name is shown (not initials like "G." or "GQ.")

#### Scenario: Author LinkedIn URLs are complete
- **WHEN** an author's LinkedIn link is rendered
- **THEN** the URL points to a specific LinkedIn profile (not `https://www.linkedin.com/in/` without a slug)

### Requirement: About page breadcrumb schema
The about page SHALL include BreadcrumbList JSON-LD with: Home > About.

#### Scenario: About breadcrumb renders
- **WHEN** the `/about` page loads
- **THEN** the page contains BreadcrumbList JSON-LD with two items

### Requirement: About page improved title
The about page title SHALL be descriptive: "About Us - Meet the AI Consultants | number6.ai" instead of "About | number6.ai".

#### Scenario: About page has descriptive title
- **WHEN** the `/about` page loads
- **THEN** the `<title>` is "About Us - Meet the AI Consultants | number6.ai"
