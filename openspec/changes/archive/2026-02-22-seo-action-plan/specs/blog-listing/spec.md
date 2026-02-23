## ADDED Requirements

### Requirement: Noindex empty category pages
Category pages with zero matching posts SHALL include `<meta name="robots" content="noindex, follow">` in the `<head>` to prevent indexing of thin content.

#### Scenario: Empty category page has noindex
- **WHEN** a user navigates to `/blog/category/90-day-wins` and there are no posts in that category
- **THEN** the page `<head>` contains `<meta name="robots" content="noindex, follow">`

#### Scenario: Category page with posts is indexable
- **WHEN** a user navigates to `/blog/category/honest-take` and there are posts in that category
- **THEN** the page does NOT contain a noindex meta tag
