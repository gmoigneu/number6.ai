## 1. Astro Config & Crawlability

- [x] 1.1 Add `site: "https://number6.ai"` to `astro.config.mjs`
- [x] 1.2 Install `@astrojs/sitemap` via `pnpm astro add sitemap`
- [x] 1.3 Add sitemap integration to `astro.config.mjs` with filter excluding `/privacy`, `/terms`, `/cookies`
- [x] 1.4 Create `public/robots.txt` with User-agent, Allow, and Sitemap directives

## 2. Self-Host Fonts

- [x] 2.1 Download Space Grotesk (400, 600, 700) and Inter (400, 500) as WOFF2 files to `public/fonts/`
- [x] 2.2 Add `@font-face` declarations to `src/styles/global.css` with `font-display: swap`
- [x] 2.3 Remove Google Fonts `<link>` tags from `BaseLayout.astro` and `BlogArticleLayout.astro`
- [x] 2.4 Add `<link rel="preload">` for critical font weights (Space Grotesk 700, Inter 400) in both layouts

## 3. BaseLayout SEO Meta

- [x] 3.1 Add `<link rel="canonical" href={Astro.url.href} />` to BaseLayout `<head>`
- [x] 3.2 Add default OG meta tags (og:title, og:description, og:url, og:type, og:site_name) to BaseLayout
- [x] 3.3 Add default Twitter Card meta tags (twitter:card, twitter:title, twitter:description) to BaseLayout
- [x] 3.4 Add `<slot name="head" />` to BaseLayout `<head>` for per-page meta injection
- [x] 3.5 Remove `<meta name="generator">` from BaseLayout
- [x] 3.6 Align favicon markup in BaseLayout (add apple-touch-icon, favicon-96x96.png, site.webmanifest if missing)
- [x] 3.7 Align favicon markup in BlogArticleLayout to match BaseLayout

## 4. Fix Broken Links

- [x] 4.1 Change all `href="/services/companies"` to `href="/services"` in `Footer.astro`
- [x] 4.2 Change `href="/services/companies"` to `href="/services"` in `WhatWeDo.astro`
- [x] 4.3 Replace `href="#"` LinkedIn link in `Footer.astro` with actual company LinkedIn URL
- [ ] 4.4 Update `src/data/authors.ts`: replace initials with full names, add complete LinkedIn URLs, expand bios

## 5. Blog Article SEO Fixes

- [x] 5.1 Fix OG image URL to absolute using `new URL(ogImage, Astro.site).href` in `BlogArticleLayout.astro`
- [x] 5.2 Fix Twitter image URL to absolute in `BlogArticleLayout.astro`
- [x] 5.3 Convert blog hero image from CSS `background-image` to Astro `<Image>` component in `[slug].astro`
- [x] 5.4 Change `ReadingProgressBar` from `client:load` to `client:idle` in `BlogArticleLayout.astro`
- [x] 5.5 Replace plain text dates with `<time datetime="YYYY-MM-DD">` elements in blog article template

## 6. Responsive Padding

- [x] 6.1 Replace `px-16` with `px-4 md:px-8 lg:px-16` in Header.astro
- [x] 6.2 Replace `px-16` with `px-4 md:px-8 lg:px-16` in Footer.astro
- [x] 6.3 Replace `px-16` with `px-4 md:px-8 lg:px-16` in all section components under `src/components/sections/`
- [x] 6.4 Replace `px-[360px]` with responsive padding in blog article prose styling

## 7. Mobile Navigation

- [x] 7.1 Add hamburger menu button (visible at `md:hidden`) to Header.astro
- [x] 7.2 Add full-screen overlay menu with nav links and CTA to Header.astro
- [x] 7.3 Add inline `<script>` for menu toggle (open/close) in Header.astro
- [x] 7.4 Hide desktop nav links at mobile breakpoint (`hidden md:flex`)

## 8. Structured Data Components

- [x] 8.1 Create `src/data/business.ts` with shared Organization data (name, URLs, addresses, contact)
- [x] 8.2 Create `src/components/SchemaOrg.astro` component that accepts `schemas` array and renders JSON-LD

## 9. Page-Level Structured Data

- [x] 9.1 Add Organization + WebSite JSON-LD to homepage via head slot
- [x] 9.2 Add BlogPosting + BreadcrumbList JSON-LD to blog article pages via head slot
- [x] 9.3 Add Service JSON-LD (all 13 services) + BreadcrumbList to services page via head slot
- [x] 9.4 Add BreadcrumbList JSON-LD to about page via head slot
- [x] 9.5 Add BreadcrumbList JSON-LD to contact page via head slot
- [x] 9.6 Add BreadcrumbList JSON-LD to blog listing page via head slot

## 10. Title & Description Improvements

- [x] 10.1 Update about page title to "About Us - Meet the AI Consultants | number6.ai"
- [x] 10.2 Update contact page title to "Get in Touch - Book a Free AI Discovery Call | number6.ai"
- [x] 10.3 Improve meta descriptions for privacy, terms, cookies pages (expand from ~15 chars to 120-155 chars)

## 11. Category Pages & Error Pages

- [x] 11.1 Add conditional `noindex` meta tag to category pages when post count is zero in `[slug].astro`
- [x] 11.2 Create branded `src/pages/404.astro` with helpful links and noindex meta tag

## 12. Validation

- [x] 12.1 Run `pnpm build` and verify no errors
- [x] 12.2 Run `pnpm biome check --write` to fix formatting
- [x] 12.3 Spot-check JSON-LD output on homepage, blog article, and services page
- [x] 12.4 Verify robots.txt and sitemap-index.xml in build output
