## Why

The site scores 46/100 on SEO health. Zero structured data, missing robots.txt/sitemap, broken internal links, no canonical tags, and no mobile navigation make the site effectively invisible to search engines and unusable on mobile. Fixing these issues is the single highest-leverage growth opportunity before any paid marketing.

## What Changes

- Add `site` property to Astro config and install `@astrojs/sitemap` integration
- Create `robots.txt` with sitemap reference
- Add canonical tags and OG/Twitter meta tags to all pages via `BaseLayout.astro`
- Fix absolute OG image URLs in blog posts
- Fix all broken `/services/companies` links to `/services`
- Fix placeholder LinkedIn URL in footer
- Add mobile-responsive hamburger navigation to `Header.astro`
- Add JSON-LD structured data to all page types (Organization, WebSite, BlogPosting, Service, BreadcrumbList)
- Fix mobile padding across all section components (replace `px-16` / `px-[360px]` with responsive values)
- Self-host Google Fonts (Inter + Space Grotesk) as WOFF2 with preload
- Improve title tags and meta descriptions for thin pages
- Add `noindex` to empty blog category pages
- Update author data with full names, bios, and LinkedIn URLs
- Create a branded 404 page
- Add `<time datetime>` elements for dates in blog posts
- Convert blog hero images from CSS `background-image` to Astro `<Image>` component
- Change `ReadingProgressBar` from `client:load` to `client:idle`
- Align favicon markup between BaseLayout and BlogArticleLayout

## Capabilities

### New Capabilities
- `seo-meta`: Canonical URLs, OG tags, Twitter cards, and social sharing meta tags across all pages
- `structured-data`: JSON-LD schema markup (Organization, WebSite, BlogPosting, Service, BreadcrumbList, Person)
- `sitemap-robots`: XML sitemap generation and robots.txt for crawlability
- `mobile-nav`: Responsive hamburger menu navigation for mobile viewports
- `error-pages`: Branded 404 page with navigation and helpful links

### Modified Capabilities
- `site-layout`: Add canonical/OG/Twitter meta to head, self-host fonts, align favicon markup, fix mobile padding
- `blog-article`: Fix OG image URLs to absolute, convert hero to `<Image>`, add `<time>` elements, change progress bar hydration
- `blog-listing`: Add `noindex` for empty category pages
- `services-page`: Fix broken link from `/services/companies` to `/services`, add Service JSON-LD
- `homepage`: Add Organization + WebSite JSON-LD, fix broken WhatWeDo link
- `about-page`: Update author data with full names and LinkedIn URLs
- `theme-config`: Responsive padding utilities, self-hosted font configuration
- `contact-page`: Add BreadcrumbList schema

## Impact

- **Config**: `astro.config.mjs` (site URL, sitemap integration)
- **Layouts**: `BaseLayout.astro`, `BlogArticleLayout.astro` (meta tags, fonts, favicons)
- **Components**: `Header.astro` (mobile nav), `Footer.astro` (broken links), section components (padding)
- **New components**: `SchemaOrg.astro` (structured data), mobile nav toggle
- **Pages**: All page files get structured data; `404.astro` is new
- **Static assets**: `public/robots.txt`, `public/fonts/` (WOFF2 files)
- **Data**: `src/data/authors.ts` (full names, bios, LinkedIn URLs)
- **Dependencies**: `@astrojs/sitemap` (new)
- **Styles**: `global.css` (`@font-face` declarations, responsive padding)
