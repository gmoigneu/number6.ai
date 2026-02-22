## 1. Legal Page Layout

- [x] 1.1 Create `src/layouts/LegalLayout.astro` with props: `title`, `lastUpdated`, `breadcrumbLabel`, `toc` (array of `{ id, label }`). Wraps BaseLayout and renders breadcrumbs, page title area (with bottom border), two-column content area (sticky TOC sidebar 260px + body slot), and back-to-top link.
- [x] 1.2 Add prose typography styles to `src/styles/global.css` — custom classes for legal page content: h2 (Space Grotesk 28px/700/-1px), p (Inter 17px/1.75), bold labels, bullet lists (24px indent), section dividers (1px #E0DDD8), blockquotes (4px terracotta left border, italic muted text), tables.

## 2. Legal Pages

- [x] 2.1 Create `src/pages/terms.astro` — Terms & Conditions page using LegalLayout with all 18 sections of content from `docs/10-terms-and-conditions.md`, TOC entries, and section anchor IDs.
- [x] 2.2 Create `src/pages/privacy.astro` — Privacy Policy page using LegalLayout with all 13 sections of content from `docs/11-privacy-policy.md`, TOC entries, and section anchor IDs.
- [x] 2.3 Create `src/pages/cookies.astro` — Cookie Policy page using LegalLayout with all 8 sections of content from `docs/12-cookie-policy.md`, TOC entries, and section anchor IDs.

## 3. Footer Links

- [x] 3.1 Update `src/components/Footer.astro` — set "Privacy Policy" link href to `/privacy` and "Terms of Service" link href to `/terms`.

## 4. Verification

- [x] 4.1 Run `pnpm build` to verify all pages build successfully as static HTML.
- [x] 4.2 Run `pnpm biome check --write` and `npx -y react-doctor@latest . --verbose` to ensure linting passes.
