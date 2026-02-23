## ADDED Requirements

### Requirement: robots.txt exists
The site SHALL serve a `robots.txt` file at `/robots.txt` that allows all crawlers and references the sitemap.

#### Scenario: robots.txt is accessible
- **WHEN** a crawler requests `/robots.txt`
- **THEN** it receives a response with `User-agent: *`, `Allow: /`, and `Sitemap: https://number6.ai/sitemap-index.xml`

### Requirement: XML sitemap generation
The site SHALL generate an XML sitemap using the `@astrojs/sitemap` Astro integration. Legal pages (privacy, terms, cookies) SHALL be filtered out of the sitemap.

#### Scenario: Sitemap includes content pages
- **WHEN** the sitemap is generated at build time
- **THEN** it includes homepage, about, services, contact, blog listing, blog articles, and category pages

#### Scenario: Sitemap excludes legal pages
- **WHEN** the sitemap is generated
- **THEN** `/privacy`, `/terms`, and `/cookies` are not included

### Requirement: Sitemap integration in Astro config
The `astro.config.mjs` SHALL import and include `@astrojs/sitemap` in the integrations array with a filter function to exclude legal pages.

#### Scenario: Sitemap integration is configured
- **WHEN** the Astro build runs
- **THEN** the sitemap integration generates `sitemap-index.xml` and associated sitemap files in the output directory
