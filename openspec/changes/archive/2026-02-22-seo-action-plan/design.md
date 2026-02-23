## Context

The site is an Astro 5 static site for an AI consulting agency. It scores 46/100 on SEO health due to missing crawlability basics (no robots.txt, no sitemap, no `site` in config), zero structured data, broken internal links, no mobile navigation, and inconsistent meta tags. The blog article layout already has OG/Twitter/canonical tags, but all other pages lack them. Performance is strong (92/100) - the architecture is sound, just missing SEO fundamentals.

## Goals / Non-Goals

**Goals:**
- Raise SEO health score from 46 to 74+ (critical + high priority items)
- Make every page crawlable, indexable, and shareable with correct meta tags
- Add structured data (JSON-LD) to every page type for rich result eligibility
- Make the site fully usable on mobile devices
- Self-host fonts to eliminate third-party render-blocking requests
- Fix all broken links and placeholder URLs

**Non-Goals:**
- Content writing (expanding blog posts, writing new articles)
- Analytics or tracking integration
- Switching React to Preact (backlog item, separate change)
- Service worker implementation
- Production hosting configuration (security headers, caching, Brotli - these are deployment-level, not code-level)

## Decisions

### 1. Single `SchemaOrg.astro` component for all structured data
**Decision:** Create one component that accepts a `schemas` prop (array of JSON-LD objects) and renders them in a single `<script type="application/ld+json">` tag.
**Rationale:** Keeps structured data co-located with each page (passed as prop from page files) while having a single render point. Avoids multiple script tags and scattered schema logic.
**Alternative:** Per-page-type schema components (e.g., `BlogSchema.astro`, `ServiceSchema.astro`). Rejected because it adds unnecessary files for what is essentially data serialization.

### 2. Extend BaseLayout with `<slot name="head">` for per-page meta
**Decision:** Add a named `<slot name="head" />` inside `<head>` in BaseLayout. Pages inject their OG tags, structured data, and page-specific meta through this slot.
**Rationale:** BaseLayout already handles shared meta (canonical, description, title). Per-page data (OG type, JSON-LD, article-specific tags) varies by page and belongs in the page file, injected via slot.
**Alternative:** Pass all meta as props to BaseLayout. Rejected because the prop interface would become unwieldy with 15+ optional properties.

### 3. Add OG/Twitter meta to BaseLayout with sensible defaults
**Decision:** BaseLayout gets default OG tags (og:title from title prop, og:description from description prop, og:url from Astro.url, og:type="website", og:site_name="number6.ai"). Pages can override via head slot.
**Rationale:** Every page needs baseline social sharing tags. Blog articles already handle their own via BlogArticleLayout, so BaseLayout defaults cover all other pages.

### 4. Font self-hosting via `@font-face` in global.css
**Decision:** Download Inter (400, 500) and Space Grotesk (400, 600, 700) as WOFF2. Add `@font-face` with `font-display: swap` in `global.css`. Preload critical weights (Space Grotesk 700, Inter 400) in BaseLayout.
**Rationale:** Eliminates two DNS lookups, two TLS handshakes, and the render-blocking Google Fonts CSS chain. WOFF2 is universally supported and smallest format. `font-display: swap` prevents FOIT.
**Alternative:** Use `@fontsource` packages. Rejected because manual WOFF2 files are simpler for 5 font files and avoid a dependency.

### 5. Mobile nav as progressive enhancement in Header.astro
**Decision:** Add hamburger button visible at `md:hidden`, full-screen overlay menu, implemented with a small inline `<script>` for toggle (no React needed).
**Rationale:** Header is an Astro component shipping zero JS. A simple toggle script (~20 lines) avoids hydrating React just for menu open/close. Progressive enhancement means nav links are always in the DOM for crawlers.

### 6. Blog hero image conversion to Astro `<Image>`
**Decision:** Replace `background-image` CSS with Astro's `<Image>` component using `object-cover` styling.
**Rationale:** Enables automatic WebP/AVIF conversion, responsive `srcset`, proper `alt` text for accessibility and image search, and native lazy loading. CSS backgrounds are invisible to image optimization pipelines and search engines.

### 7. Sitemap via @astrojs/sitemap with filter
**Decision:** Install `@astrojs/sitemap` and filter out legal pages (privacy, terms, cookies) from the sitemap.
**Rationale:** Legal pages are low-value for search and dilute crawl budget. The integration auto-generates sitemap from all routes; filtering is a simple config option.

## Risks / Trade-offs

- **Font FOUT**: Self-hosted fonts with `font-display: swap` may cause brief flash of unstyled text on first visit. Mitigated by preloading critical weights. [Low risk] -> Acceptable trade-off for eliminating render-blocking external requests.
- **Mobile nav without React**: Inline script for toggle means no framework-level state management. [Low risk] -> Menu toggle is trivial state; a `<script>` tag is the correct Astro pattern for this.
- **Schema maintenance**: JSON-LD objects are defined inline in each page file, not in a central data store. [Medium risk] -> If business info changes (address, phone), multiple files need updating. Mitigated by creating constants in a shared `src/data/business.ts` file for Organization schema fields.
- **Broken image paths during migration**: Converting blog hero from CSS to `<Image>` may break if image paths don't resolve correctly. [Low risk] -> Test with existing blog post before deploying.
