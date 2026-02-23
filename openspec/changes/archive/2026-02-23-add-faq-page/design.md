## Context

The site is Astro 5 static SSG. All pages follow the pattern of `src/pages/[name].astro` importing `BaseLayout.astro`, with structured data injected via the `SchemaOrg.astro` component. The Header.astro nav has four links: Services, About, Blog, Contact. No existing FAQ page exists.

The GEO analysis flagged FAQPage schema as a high-value missing item, and a definition/FAQ block as the #4 highest-impact GEO change. The 20 Q&As are sourced directly from existing site copy and brand claims.

## Goals / Non-Goals

**Goals:**
- New `/faq` route rendered as static HTML
- 20 Q&As drawn from site content covering services, process, pricing transparency, and AI basics
- FAQPage JSON-LD schema for AI Overview extraction
- FAQ link added to desktop and mobile nav

**Non-Goals:**
- Accordion/interactive expand-collapse (adds JS, hurts AI crawlability — static is better here)
- Separate data file for FAQ content (single-page use, no reuse elsewhere)
- Pagination or category filtering

## Decisions

**1. Static layout, no accordion**
All answers are visible in the HTML without JS. This maximises passage-level citability for AI crawlers (Perplexity, GPTBot) and avoids any hydration overhead. Trade-off: longer page scroll. Acceptable — FAQ pages are reference documents.

**2. Q&A data as a typed array in the page frontmatter**
No separate data file. The 20 Q&As are used only on this page. Following the principle of minimum abstraction: three similar lines of code is better than a premature abstraction.

**3. FAQPage schema via SchemaOrg.astro**
Reuses existing `SchemaOrg.astro` component with a FAQPage object. The `mainEntity` array maps directly from the Q&A data array.

**4. Nav link placement**
FAQ added after "Blog" in both desktop and mobile nav — it's informational/discovery content, so it belongs in that cluster.

## Risks / Trade-offs

- [Long JSON-LD block] A 20-item FAQPage schema will produce ~3KB of JSON-LD. → No performance concern for a static page; schema parsers handle this fine.
- [Nav crowding] Adding a 5th nav item to a 4-item nav. → FAQ is a common and expected nav item; it fits naturally after Blog.
