## Context

The homepage is fully implemented with 10 section components under `src/components/sections/`, a `BaseLayout.astro` wrapping Header + Footer, and a global theme in `src/styles/global.css`. The Services page design is in `design/number6.pen` frame `IJLnZ` — it reuses the same header, footer, and color system.

## Goals / Non-Goals

**Goals:**
- Implement the Services & Pricing page matching the design exactly
- Reuse the existing BaseLayout, Header, Footer, and theme system
- Follow the same component architecture as the homepage (Astro components, no client-side JS needed)

**Non-Goals:**
- No interactive tab switching between tracks (each track is a full section on a single scrolling page)
- No dynamic pricing or CMS integration — all content is static
- No modifications to Header, Footer, or BaseLayout
- No mobile-responsive breakpoints beyond what Tailwind provides by default (can be a follow-up)

## Decisions

### 1. Single page at `/services` (not split into `/services/companies` + `/services/individuals`)

The design shows a single unified services page. The sitemap mentions separate routes, but the design consolidates everything into one page. We'll implement what the design shows.

**Alternative considered**: Split routes per audience. Rejected because the design doesn't separate by audience — it organizes by track (Learn, Plan, Build, Grow).

### 2. Section components in `src/components/sections/services/` subdirectory

Homepage sections live in `src/components/sections/`. Services sections will go in `src/components/sections/services/` to keep them organized and avoid name collisions (both pages have a Hero and FinalCta).

**Alternative considered**: Flat in `sections/` with `Services` prefix (e.g., `ServicesHero.astro`). The subdirectory is cleaner with 10 new components.

### 3. Pure Astro components — no React islands needed

The services page is entirely static content. No interactive elements (tabs, accordions, modals) are needed. Astro components ship zero JS.

### 4. Reuse section-level patterns from homepage

Each section follows the same pattern: full-width container with padding, vertical layout, consistent use of theme variables. We'll use the same Tailwind utility approach.

## Risks / Trade-offs

- **[Long page]** → The page has 10 content-heavy sections. Acceptable for a services/pricing page — users expect to scroll. Track navigation at top provides orientation.
- **[Content duplication]** → Service details (titles, prices, descriptions) are hardcoded in templates. Acceptable for a marketing site with infrequent changes. A CMS layer can be added later if needed.
- **[No anchor links]** → Track navigation cards in "How Services Work" are visual only, not linked to sections. Could be enhanced with scroll-to anchors as a follow-up.
