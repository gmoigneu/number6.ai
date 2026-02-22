## Context

The site currently has three page types (homepage, services, about), all using `BaseLayout.astro` with section-based composition. Legal content exists as markdown files in `docs/` but has no corresponding pages. The Pencil design file includes a `number6-cms-terms` frame showing the CMS page layout: header, breadcrumbs + title area, two-column content (TOC sidebar + prose body), and footer.

The design applies to all three legal pages — they share identical layout structure and only differ in title, meta date, TOC entries, and body content.

## Goals / Non-Goals

**Goals:**
- Create a reusable legal/CMS page layout matching the Pencil design
- Render all three legal pages with proper typography, TOC, and structure
- Keep pages fully static (zero client-side JS)
- Follow existing patterns (Astro components, Tailwind variable classes, BaseLayout wrapping)

**Non-Goals:**
- No markdown/MDX rendering pipeline — content is hardcoded in Astro components (matching how other pages work)
- No interactive TOC highlighting or smooth-scroll (static layout only)
- No generic "content page" system — this layout is specifically for legal pages
- No mobile responsive TOC (sidebar collapses) — out of scope for this change

## Decisions

### Decision 1: LegalLayout as a wrapper around BaseLayout
**Choice**: Create `src/layouts/LegalLayout.astro` that uses `BaseLayout` and adds the CMS chrome (breadcrumbs, title area, two-column content area with TOC sidebar).

**Rationale**: Keeps BaseLayout as the single source of truth for HTML shell, header, and footer. LegalLayout only adds the page-level structure specific to legal/prose pages.

**Alternative considered**: Composing the layout inline in each page file. Rejected because all three pages share identical structure — DRY principle.

### Decision 2: Content as Astro components, not MDX
**Choice**: Each legal page has its content directly in the `.astro` page file (or a dedicated content component), using semantic HTML (`<h2>`, `<p>`, `<ul>`) styled via Tailwind prose-like classes.

**Rationale**: Matches the existing pattern — homepage, services, and about pages all use Astro components with hardcoded content. The markdown docs in `docs/` serve as the canonical legal text source, but the rendered pages use the design file's simplified/rewritten versions for the website. No MDX pipeline needed.

**Alternative considered**: Using Astro's content collections with MDX. Rejected because it adds complexity (MDX integration, content schemas) for just three static pages, and the design file shows content that differs from the raw legal docs.

### Decision 3: TOC generated from props
**Choice**: `LegalLayout.astro` accepts a `toc` prop (array of `{ id, label }` items) and a `title`, `lastUpdated`, `breadcrumbLabel` prop. Each page passes its TOC entries.

**Rationale**: Simple, explicit, zero-magic. Each page knows its sections and passes them as data. Avoids runtime DOM parsing or build-time AST extraction.

### Decision 4: CSS class-based prose styling
**Choice**: Define a set of Tailwind utility classes applied to the content area that match the design's typography specs (Space Grotesk headings at 28px/700, Inter body at 17px/1.75 line-height, section dividers, blockquote styling with terracotta left border).

**Rationale**: The design file specifies exact typography values. Using a consistent set of classes (or a `prose` wrapper with custom styles) ensures all three pages look identical without repeating styles.

### Decision 5: Sticky TOC sidebar
**Choice**: The TOC sidebar uses `position: sticky; top: <offset>` to remain visible while scrolling the body content.

**Rationale**: Matches standard CMS page UX. The design shows the TOC as a fixed sidebar alongside scrolling body content.

## Risks / Trade-offs

- **Content drift**: The design file's content differs from the legal docs in `docs/`. We'll use the legal docs as the canonical source for the actual page content (they're the real legal text), but apply the design's visual treatment.
  → Mitigation: Content comes from `docs/*.md`, layout/styling from the Pencil design.

- **No responsive design for TOC**: The two-column layout with 260px sidebar won't work well on mobile.
  → Mitigation: Out of scope per non-goals. Can be addressed in a follow-up change with a collapsible TOC or hidden sidebar on small screens.

- **Hardcoded content**: Any legal text changes require editing Astro files.
  → Mitigation: Acceptable for three rarely-changing legal pages. If content pages proliferate, a content collection approach can be adopted later.
