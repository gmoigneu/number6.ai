## 1. Theme & Font Configuration

- [x] 1.1 Replace `:root` CSS variables in `src/styles/global.css` with number6 brand colors (background `#F5F2ED`, foreground `#1A1A1A`, accent `#C45A3B`, muted `#E8E4DD`, etc.)
- [x] 1.2 Remove the `.dark` theme block from `global.css`
- [x] 1.3 Add `--font-heading` (Space Grotesk) and `--font-body` (Inter) to the Tailwind `@theme` block
- [x] 1.4 Verify shadcn button component picks up new brand colors

## 2. Base Layout & Shared Components

- [x] 2.1 Create `src/layouts/BaseLayout.astro` with HTML shell, Google Fonts `<link>` tags (preconnect + stylesheet for Space Grotesk and Inter), global CSS import, and content slot between Header and Footer
- [x] 2.2 Create `src/components/Header.astro` — dark background, logo (terracotta square + "NUMBER6" wordmark), nav links (Services, About, Blog, Contact), and "BOOK A CALL" CTA button
- [x] 2.3 Create `src/components/Footer.astro` — dark background, brand column (logo + tagline), three link columns (Services, Company, Connect), divider, copyright row with legal links

## 3. Homepage Sections

- [x] 3.1 Create `src/components/sections/Hero.astro` — headline, subheadline, two CTA buttons (primary terracotta + secondary outlined), dark divider
- [x] 3.2 Create `src/components/sections/TrustBar.astro` — dark background, three stat columns with terracotta numbers and gray descriptions, vertical dividers
- [x] 3.3 Create `src/components/sections/TheProblem.astro` — section label, headline, two body paragraphs, bold callout
- [x] 3.4 Create `src/components/sections/WhatWeDo.astro` — header + four service cards (01 Learn, 02 Plan, 03 Build, 04 Grow) with numbers, titles, descriptions, and "LEARN MORE" links
- [x] 3.5 Create `src/components/sections/HowWeWork.astro` — dark background, header + three step cards (01 We Listen, 02 We Plan, 03 We Build & Teach)
- [x] 3.6 Create `src/components/sections/WhyNumber6.astro` — header with divider + five differentiator cards with Lucide icons (tag, shield-check, users, globe, graduation-cap)
- [x] 3.7 Create `src/components/sections/WhoItsFor.astro` — beige background, header + four audience cards (Professional Services, Marketing & Creative, Operations-Heavy, Tech-Forward SMBs) + footnote
- [x] 3.8 Create `src/components/sections/SocialProof.astro` — header, bordered quote block with terracotta quotation mark, four stat cards
- [x] 3.9 Create `src/components/sections/TheName.astro` — beige background, large semi-transparent "6" alongside text content
- [x] 3.10 Create `src/components/sections/FinalCta.astro` — terracotta background, headline, subtitle, dark button with arrow, supporting text

## 4. Page Assembly

- [x] 4.1 Rewrite `src/pages/index.astro` to use BaseLayout and compose all homepage sections in order
- [x] 4.2 Run `pnpm build` to verify static generation succeeds
- [x] 4.3 Visual review — compare rendered page against design screenshots
