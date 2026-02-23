## ADDED Requirements

### Requirement: Custom 404 page
The site SHALL provide a branded 404 page at `src/pages/404.astro` using BaseLayout. The page SHALL include:
- A heading indicating the page was not found
- Helpful navigation links to key pages (Homepage, Services, Blog, Contact)
- Consistent styling with the rest of the site

#### Scenario: 404 page renders for unknown routes
- **WHEN** a user navigates to a URL that does not exist
- **THEN** the branded 404 page renders with site branding, navigation, and helpful links

#### Scenario: 404 page has noindex
- **WHEN** the 404 page renders
- **THEN** the `<head>` contains `<meta name="robots" content="noindex">`
