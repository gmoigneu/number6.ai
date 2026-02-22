## Why

The site has legal document content (Terms & Conditions, Privacy Policy, Cookie Policy) written in markdown but no pages to display them. The Footer already links to "Privacy Policy" and "Terms of Service" — those links need to resolve. A reusable CMS-style layout is needed to render long-form prose content with a table of contents sidebar, matching the `number6-cms-terms` design in the Pencil file.

## What Changes

- Add a new `LegalLayout.astro` layout that wraps `BaseLayout` and provides the CMS page structure: breadcrumbs, page title area, sticky TOC sidebar, prose body content, and back-to-top link
- Add `/terms` page rendering Terms & Conditions content
- Add `/privacy` page rendering Privacy Policy content
- Add `/cookies` page rendering Cookie Policy content
- Update Footer links to point to the new legal pages

## Capabilities

### New Capabilities
- `legal-page-layout`: Reusable CMS/legal page layout with breadcrumbs, page title + last-updated meta, sticky TOC sidebar, prose body content area with section dividers, and back-to-top link
- `legal-pages`: Three legal content pages (Terms & Conditions, Privacy Policy, Cookie Policy) using the legal page layout, with content sourced from existing markdown docs

### Modified Capabilities
- `site-layout`: Footer legal links ("Privacy Policy", "Terms of Service") must point to `/privacy` and `/terms` respectively

## Impact

- **New files**: `src/layouts/LegalLayout.astro`, `src/pages/terms.astro`, `src/pages/privacy.astro`, `src/pages/cookies.astro`, plus section components
- **Modified files**: `src/components/Footer.astro` (update link hrefs)
- **No new dependencies** — pure Astro components, no client-side JS needed
