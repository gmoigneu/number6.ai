# number6.ai — Blog Article Page

> **Note for designer/developer:** This document covers the individual blog article template. See doc 07 for the blog listing page. See the Designer Brief (doc 03) for visual specifications and brand guidelines.

---

## Article Header

### Layout
Full-width or contained header above the article body. Clean, editorial feel.

### Elements (in order)
1. **Category tag** — Pill or badge style (e.g., "The Honest Take"). Links back to filtered blog listing.
2. **Article title** — Display heading. Large, confident. Should be the dominant element on the page.
3. **Subtitle / Deck** — Optional. A one-line clarification or hook below the title. Not all articles need this.
4. **Meta line** — Author name (linked to about page) · Publication date · Estimated read time
5. **Author byline block** — Small author photo + name + one-line role description (e.g., "Partner, Houston, TX"). Clickable to the about page.
6. **Featured image / Hero illustration** — Full-width or generously sized. Below the meta info so the title is immediately visible. Should have an alt text field for accessibility.

---

## Article Body

### Typography
- Body text: 18-20px, generous line-height (1.6-1.7), readable measure (60-75 characters per line)
- Comfortable paragraph spacing
- Left-aligned (not justified)
- Dark text on warm light background — consistent with overall site

### Content elements the template must support

**Headings:**
- H2 for major sections
- H3 for subsections
- No deeper nesting in typical articles (H4 rarely, H5/H6 never)

**Text formatting:**
- Bold, italic, strikethrough
- Blockquotes — styled distinctively, used for pull quotes or cited material
- Inline code spans — monospace, subtle background highlight

**Links:**
- Clearly distinguishable from body text (underline or color differentiation)
- External links open in new tab with appropriate rel attributes

**Lists:**
- Ordered and unordered lists
- Properly indented, with comfortable spacing between items

**Images:**
- Full-width and inline images with captions
- Alt text support (required for accessibility)
- Lazy loading for performance

**Code blocks:**
- Syntax-highlighted, multi-line code blocks
- Language label (e.g., "Python", "JavaScript")
- Copy-to-clipboard button
- Monospace font (JetBrains Mono, IBM Plex Mono, or Fira Code per brand guidelines)
- Horizontal scroll for long lines — never wrap code

**Tables:**
- Clean, readable tables with alternating row shading or clear borders
- Responsive on mobile (horizontal scroll or stacked layout)

**Callout / Info boxes:**
- Styled blocks for tips, warnings, or key takeaways
- Icon + colored left border or background tint
- Types: Tip, Note, Warning, Key Takeaway

**Embeds:**
- YouTube / video embeds (responsive, 16:9 aspect ratio)
- Tweet embeds
- CodePen or similar interactive embeds
- Calendly/Cal.com embed (for CTAs within articles)

**Horizontal rule:**
- Subtle section divider for thematic breaks within an article

---

## Table of Contents (Optional)

[For longer articles — 1500+ words]

- Sticky sidebar TOC on desktop (scrolls with the reader, highlights current section)
- Collapsible TOC block at the top on mobile
- Generated from H2 headings
- Smooth scroll to sections on click

---

## Reading Progress

[Optional — designer's discretion]

- Thin progress bar at the top of the viewport showing scroll progress through the article
- Subtle, doesn't compete with content
- Uses brand accent color

---

## In-Article CTA

[Appears roughly 60-70% through the article, between sections — not interrupting a paragraph]

### Design
A styled callout block that feels native to the content but visually distinct. Not a banner ad. More like a "break" in a magazine.

### Copy (default — can be overridden per article)

**Ready to put this into practice?**
This is what we do — help businesses turn AI ideas into working solutions. Book a free discovery call and let's talk about your specific situation.

**Book a free call** →

---

## Article Footer

### Elements (in order)

**1. Author box**
- Larger author photo
- Full name
- Role and location (e.g., "Partner — Houston, TX")
- 2-3 sentence bio (pulled from about page)
- LinkedIn link
- Link to author's other articles

**2. Tags / Topics**
- Tag pills for article topics (e.g., "prompt engineering", "AI strategy", "case study")
- Clickable — link to blog listing filtered by that tag

**3. Share block**
- "Share this article" with share buttons
- LinkedIn (primary), X/Twitter, copy link, email
- LinkedIn should be first/most prominent (primary social channel)

**4. Related articles**
- "You might also like" or "Keep reading"
- 2-3 related articles based on category or tags
- Card format: thumbnail + title + category + read time
- Should never show the current article

**5. Newsletter signup**
- Same component as on the blog listing page
- "Get the AI Reality Check" monthly newsletter
- Single email field + subscribe button

**6. Final CTA**
- Mirrors the contact page CTA
- "Want to talk about this?" + Book a discovery call button

---

## Social & SEO

### Meta tags (per article)
- `<title>`: Article title — The Honest Take | number6.ai
- `<meta name="description">`: Article excerpt (150-160 characters)
- `<meta name="author">`: Author name
- `<link rel="canonical">`: Full article URL
- Structured data: `Article` schema with author, datePublished, dateModified, publisher

### Open Graph tags
- `og:type`: article
- `og:title`: Article title
- `og:description`: Article excerpt
- `og:image`: Featured image (1200x630px recommended for LinkedIn)
- `og:url`: Full article URL
- `article:published_time`: ISO 8601 date
- `article:author`: Author profile URL
- `article:section`: Category name
- `article:tag`: Article tags

### Twitter/X tags
- `twitter:card`: summary_large_image
- `twitter:title`: Article title
- `twitter:description`: Article excerpt
- `twitter:image`: Featured image

---

## Content Management

### Required frontmatter fields (for CMS or MDX)

```yaml
title: "Article Title Here"
subtitle: "Optional subtitle or deck"  # optional
date: 2026-02-22
updated: 2026-02-22  # optional, shown if different from date
author: "gt"  # or "gq"
category: "honest-take"  # one of: ai-for-humans, honest-take, 90-day-wins, behind-the-agent
tags: ["ai strategy", "prompt engineering"]  # freeform tags
excerpt: "A 150-160 character summary for meta descriptions and cards."
featured_image: "/images/blog/article-slug.jpg"
featured_image_alt: "Description of the image for accessibility"
featured: false  # true to pin as featured post on blog listing
draft: false  # true to hide from production
```

---

## Writing & Design Notes

1. **Reading experience is the product.** The article template is where we prove our expertise. It needs to feel as good as the best editorial sites — think Stripe's blog, Linear's changelog, or Anthropic's research page. Clean, spacious, focused.

2. **No distractions.** Remove the main site navigation's visual weight while reading. A minimal sticky header with just the logo and a "back to blog" link is ideal. Full navigation available via hamburger or on scroll-up.

3. **Code blocks are important.** The "Behind the Agent" content pillar will include significant code. The code block experience needs to be excellent — proper syntax highlighting, copy button, readable font size.

4. **Images need care.** Use Astro's image optimization pipeline. Serve responsive images. Don't let a 4MB hero image tank the page load time.

5. **Print stylesheet.** Consider a basic print stylesheet that removes navigation, CTAs, and sidebars — people in enterprise settings sometimes print articles for team meetings.

6. **Mobile reading.** Body text should be minimum 16px on mobile. Generous margins. Code blocks should scroll horizontally, never wrap. Images should be full-width.

7. **Anchor links on headings.** Each H2 and H3 should have a hover-revealed anchor link (the # icon pattern) for easy section sharing.

8. **Date handling.** Show "Published [date]" by default. If `updated` is set and different from `date`, show "Updated [date]" alongside or instead. This signals freshness for SEO and reader trust.
