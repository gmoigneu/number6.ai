## Context

The site is built with Astro 5 (static output) + React islands + Tailwind CSS 4. Pages follow a consistent pattern: BaseLayout wraps Header + content sections + Footer. Components are `.astro` files; React is used only for client-side interactivity. The design for both pages is complete in `design/number6.pen` (frames `2lNG4` and `AzjDY`).

Astro has built-in Content Collections (v5 content layer) for type-safe markdown with frontmatter schemas. No MDX is needed — pure `.md` with frontmatter fulfills all requirements.

## Goals / Non-Goals

**Goals:**
- Blog listing page at `/blog` matching the Pencil design
- Blog article page at `/blog/[slug]` matching the Pencil design
- Pure markdown articles with typed frontmatter (no MDX dependency)
- Category filtering via static page generation (one page per category)
- RSS feed generation

**Non-Goals:**
- Client-side JavaScript filtering (static generation is sufficient)
- Newsletter form backend (just the UI for now)
- CMS integration (markdown files in the repo)
- Search functionality
- Infinite scroll / client-side load-more (static pagination is fine for launch)

## Decisions

### 1. Content Collections (not MDX)

Use Astro's built-in Content Collections with `.md` files in `src/content/blog/`. Define a schema in `src/content.config.ts` using Zod for typed frontmatter.

**Why not MDX?** The user explicitly requested pure markdown. The article body only needs standard markdown elements (headings, blockquotes, code blocks, lists, images). Custom callout boxes can be rendered via remark plugins or CSS-targeted blockquote syntax (e.g., `> [!TIP]`). No React components needed inside article content.

### 2. Static category pages (not client-side filtering)

Generate static pages at `/blog/category/[category]` using `getStaticPaths`. The filter pills on the listing page are plain `<a>` links. The "All" filter links to `/blog`, each category links to `/blog/category/[slug]`.

**Why not client-side?** Keeps zero JS on the listing page. Better for SEO (each category gets its own indexable URL). Aligns with Astro's static-first philosophy. The design shows 5 filter pills — not a dynamic search.

### 3. Layout approach

- **Listing page**: Uses `BaseLayout.astro` (standard Header + Footer) — same as all other pages.
- **Article page**: Uses a new `BlogArticleLayout.astro` with a minimal reading header (logo + "Back to The Honest Take" link) instead of the full navigation. This matches the design which shows a stripped-down header. Full footer is still shown.

### 4. Article prose styling

Add a `.blog-prose` class in `global.css` (similar pattern to existing `.legal-prose`). Styles headings (H2, H3), paragraphs, blockquotes (left-border accent), code blocks (dark bg, syntax highlighting), unordered/ordered lists, images, horizontal rules, and tables.

For syntax highlighting, use Astro's built-in Shiki integration (already bundled, zero config needed).

### 5. Author data

Define author data as a simple TypeScript map in `src/data/authors.ts`:
```ts
export const authors = {
  "partner-houston": { name: "Nils Löhndorf", role: "Partner", location: "Houston, TX", ... },
  "partner-manchester": { name: "...", role: "Partner", location: "Manchester, UK", ... },
}
```
Articles reference authors by key in frontmatter. No separate content collection needed for 2 authors.

### 6. Related articles

Derive related articles at build time: same category first, then shared tags, excluding the current article. Show up to 3. Simple scoring: category match = 2 points, each shared tag = 1 point. Sort by score, break ties by date.

### 7. RSS feed

Use `@astrojs/rss` package. Generate at `src/pages/rss.xml.ts` using the content collection.

## File Structure

```
src/
  content/
    blog/
      why-ai-implementations-fail.md     # sample article
  content.config.ts                       # collection schema
  data/
    authors.ts                            # author metadata
  layouts/
    BlogArticleLayout.astro               # minimal reading header
  pages/
    blog/
      index.astro                         # listing page (all posts)
      category/
        [category].astro                  # filtered listing page
      [slug].astro                        # article page
    rss.xml.ts                            # RSS feed
  components/
    sections/blog/
      BlogHero.astro                      # hero section
      CategoryFilters.astro               # filter pills
      FeaturedPost.astro                  # featured post card
      PostGrid.astro                      # 2-column post grid
      BlogCard.astro                      # individual post card
      NewsletterSignup.astro              # newsletter section
      BlogCta.astro                       # CTA section
      ReadingHeader.astro                 # minimal article header
      ArticleHeader.astro                 # title/meta/author block
      ArticleBody.astro                   # prose wrapper
      InArticleCta.astro                  # mid-article CTA box
      AuthorBox.astro                     # author bio card
      TagsAndShare.astro                  # tags + share buttons
      RelatedArticles.astro               # related posts grid
  styles/
    global.css                            # add .blog-prose styles
```

## Risks / Trade-offs

- **[No client-side filtering]** Category switches require a page navigation. Mitigated by Astro's fast static page loads and View Transitions if desired later.
- **[No load-more pagination]** All posts on a category page render statically. Fine for the foreseeable future (< 50 posts). Can add pagination later via `paginate()` helper.
- **[Callout syntax]** Using GitHub-style `> [!TIP]` blockquote syntax requires a remark plugin. Alternative: just use styled blockquotes with a manual prefix. Start simple — add remark plugin only if needed.
