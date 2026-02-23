## MODIFIED Requirements

### Requirement: Font configuration
The site SHALL self-host Space Grotesk (weights: 400, 600, 700) and Inter (weights: 400, 500) as WOFF2 files in `public/fonts/`. The fonts SHALL be loaded via `@font-face` declarations in `global.css` with `font-display: swap`. The fonts SHALL be available as Tailwind utilities via `--font-heading` (Space Grotesk) and `--font-body` (Inter). External Google Fonts `<link>` tags SHALL be removed from all layouts.

#### Scenario: Fonts load from self-hosted files
- **WHEN** the page loads
- **THEN** fonts are loaded from `/fonts/*.woff2` (no requests to `fonts.googleapis.com` or `fonts.gstatic.com`)

#### Scenario: Fonts are available as Tailwind classes
- **WHEN** a component uses `font-heading` or `font-body` Tailwind classes
- **THEN** the correct font family is applied

#### Scenario: Font display swap prevents FOIT
- **WHEN** the page loads and fonts are not yet cached
- **THEN** text renders immediately in a fallback font and swaps to the correct font when loaded
