## 1. Foundation

- [x] 1.1 Define blog content collection schema in `src/content.config.ts` with Zod frontmatter validation
- [x] 1.2 Create author data module at `src/data/authors.ts` with partner-houston and partner-manchester entries
- [x] 1.3 Create category metadata module at `src/data/categories.ts` mapping slugs to display names
- [x] 1.4 Install `@astrojs/rss` package
- [x] 1.5 Create a sample blog post at `src/content/blog/why-ai-implementations-fail.md` with full frontmatter and body content matching the design

## 2. Blog Listing Page

- [x] 2.1 Create `src/components/sections/blog/BlogHero.astro` — hero section with label, headline, subheadline, divider
- [x] 2.2 Create `src/components/sections/blog/CategoryFilters.astro` — filter pills with active state prop
- [x] 2.3 Create `src/components/sections/blog/BlogCard.astro` — post card component (image, category tag, title, meta, excerpt, author)
- [x] 2.4 Create `src/components/sections/blog/FeaturedPost.astro` — featured post two-column card
- [x] 2.5 Create `src/components/sections/blog/PostGrid.astro` — 2-column grid of BlogCards
- [x] 2.6 Create `src/components/sections/blog/NewsletterSignup.astro` — newsletter section (dark bg, email input, subscribe button)
- [x] 2.7 Create `src/components/sections/blog/BlogCta.astro` — CTA section (accent bg, headline, button)
- [x] 2.8 Create `src/pages/blog/index.astro` — assemble listing page with all sections, query content collection, filter drafts, sort by date
- [x] 2.9 Create `src/pages/blog/category/[category].astro` — category-filtered listing using `getStaticPaths`

## 3. Blog Article Page

- [x] 3.1 Create `src/layouts/BlogArticleLayout.astro` — minimal reading header (logo + back link), progress bar slot, full footer
- [x] 3.2 Create `src/components/sections/blog/ReadingProgressBar.astro` (or `.tsx` for client interactivity) — scroll-based progress bar
- [x] 3.3 Create `src/components/sections/blog/ArticleHeader.astro` — category tag, title, subtitle, meta line, author byline
- [x] 3.4 Create `src/components/sections/blog/InArticleCta.astro` — mid-article CTA card
- [x] 3.5 Create `src/components/sections/blog/AuthorBox.astro` — author bio card with avatar, name, role, bio, LinkedIn
- [x] 3.6 Create `src/components/sections/blog/TagsAndShare.astro` — tag pills + share buttons row
- [x] 3.7 Create `src/components/sections/blog/RelatedArticles.astro` — "Keep reading" section with 3-column card grid
- [x] 3.8 Add `.blog-prose` styles to `src/styles/global.css` — headings, paragraphs, blockquotes, code blocks, lists, callouts, images, hr
- [x] 3.9 Create `src/pages/blog/[slug].astro` — article page assembling all components, render markdown content, compute read time, derive related articles

## 4. RSS & SEO

- [x] 4.1 Create `src/pages/rss.xml.ts` — RSS feed generation with `@astrojs/rss`
- [x] 4.2 Add article-specific SEO meta tags to `BlogArticleLayout.astro` — OG, Twitter card, structured data

## 5. Verification

- [x] 5.1 Run `pnpm build` to verify static generation succeeds for all blog routes
- [x] 5.2 Visual review of blog listing page against Pencil design
- [x] 5.3 Visual review of blog article page against Pencil design
- [x] 5.4 Verify RSS feed is valid XML
