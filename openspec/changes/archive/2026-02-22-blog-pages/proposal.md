## Why

The number6.ai site has no blog, but "The Honest Take" is central to the content strategy — it drives organic traffic, builds authority, and nurtures leads across all four audience personas. Header and footer already link to `/blog`. The designs for both the listing page and article page are complete in `design/number6.pen`.

## What Changes

- Add blog listing page at `/blog` with hero, category filters, featured post, post grid, newsletter signup, and CTA
- Add blog article page at `/blog/[slug]` with reading header, article body (prose styling), author box, tags/share, related articles, newsletter signup, and CTA
- Add Astro content collections for markdown blog posts with frontmatter schema
- Add category filtering (4 pillars: AI for Actual Humans, The Honest Take, 90-Day Wins, Behind the Agent)
- Add article prose styles (headings, blockquotes, code blocks, callouts, lists, images)
- Add RSS feed at `/rss.xml`

## Capabilities

### New Capabilities
- `blog-listing`: Blog listing page with hero, category filter pills, featured post card, 2-column post grid, load-more pagination, newsletter signup, and CTA section
- `blog-article`: Individual article template with minimal reading header, article header (category/title/subtitle/meta/author), hero image, prose body, in-article CTA, author box, tags/share, related articles, newsletter signup, and final CTA
- `blog-content`: Astro content collection for `.md` blog posts with typed frontmatter schema, category taxonomy, author data, and RSS feed generation

### Modified Capabilities
_(none)_

## Impact

- **New pages**: `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/rss.xml.ts`
- **New layout**: `src/layouts/BlogArticleLayout.astro` (minimal header variant for reading mode)
- **New components**: ~10 new Astro components in `src/components/sections/blog/`
- **New content**: `src/content/blog/*.md` with content collection config
- **New styles**: Blog prose styles in `src/styles/global.css`
- **Dependencies**: None new — Astro has built-in markdown/content collections support
