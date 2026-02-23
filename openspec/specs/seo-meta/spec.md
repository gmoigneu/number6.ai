## ADDED Requirements

### Requirement: Canonical URL on every page
Every page SHALL include a `<link rel="canonical">` tag in the `<head>` with the full absolute URL of the current page, derived from `Astro.url.href`.

#### Scenario: Canonical tag renders on homepage
- **WHEN** the homepage loads
- **THEN** the `<head>` contains `<link rel="canonical" href="https://number6.ai/" />`

#### Scenario: Canonical tag renders on inner page
- **WHEN** the `/about` page loads
- **THEN** the `<head>` contains `<link rel="canonical" href="https://number6.ai/about/" />`

### Requirement: Default OG meta tags in BaseLayout
BaseLayout SHALL render default Open Graph tags in `<head>`:
- `og:title` from the page title prop
- `og:description` from the page description prop
- `og:url` from `Astro.url.href`
- `og:type` set to `"website"`
- `og:site_name` set to `"number6.ai"`

#### Scenario: OG tags render on a standard page
- **WHEN** the `/services` page loads
- **THEN** the `<head>` contains `og:title`, `og:description`, `og:url`, `og:type="website"`, and `og:site_name="number6.ai"`

### Requirement: Default Twitter Card meta tags in BaseLayout
BaseLayout SHALL render Twitter Card tags in `<head>`:
- `twitter:card` set to `"summary"`
- `twitter:title` from the page title prop
- `twitter:description` from the page description prop

#### Scenario: Twitter tags render on a standard page
- **WHEN** the `/about` page loads
- **THEN** the `<head>` contains `twitter:card="summary"`, `twitter:title`, and `twitter:description`

### Requirement: Head slot for page-specific meta
BaseLayout SHALL include a `<slot name="head" />` inside `<head>` so that individual pages can inject page-specific meta tags (e.g., `og:type="article"`, JSON-LD, additional OG tags).

#### Scenario: Page injects custom meta via head slot
- **WHEN** a blog article page uses BaseLayout and provides content for the `head` slot
- **THEN** the custom meta tags appear in the `<head>` alongside the default tags

### Requirement: Astro site configuration
The `astro.config.mjs` SHALL include `site: "https://number6.ai"` so that `Astro.site` and `Astro.url` resolve to correct absolute URLs.

#### Scenario: Astro.site returns correct URL
- **WHEN** any page accesses `Astro.site`
- **THEN** it returns `https://number6.ai`
