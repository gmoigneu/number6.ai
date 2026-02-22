## 1. Setup

- [x] 1.1 Create `src/components/sections/about/` directory
- [x] 1.2 Download team photos from Pencil design assets and save to `public/images/about/partner1.png` and `public/images/about/partner2.png`

## 2. Section Components

- [x] 2.1 Create `AboutHero.astro` — accent label, 56px headline, 18px subtitle (max-w 700px), 4px divider, centered layout, `bg-background`, padding top 120px bottom 80px
- [x] 2.2 Create `OurStory.astro` — two-column layout (left 440px with label+headline, right fill with 6 paragraphs), 80px gap, padding 80px vertical 64px horizontal
- [x] 2.3 Create `WhatWeBelieve.astro` — dark bg, centered header (label+headline), 5 principle rows each with title (320px, accent) and description (fill, muted) separated by 1px top border `#333`, padding 80/64
- [x] 2.4 Create `OurTeam.astro` — header with label+headline+intro, two equal-width partner cards (photo 400px tall, content with role/location/bio/specialties, 2px border), "Why two people?" subsection below (2px top border, two-column: question left 380px, 3 paragraphs right), padding 80/64
- [x] 2.5 Create `WhyNumber6.astro` — beige bg (`bg-muted`), large decorative "6" (320px, 8% opacity), content column with label+headline+4 paragraphs (last two muted, third italic), padding 80/64
- [x] 2.6 Create `WhereWeWork.astro` — centered header, two location cards (2px border, 40px padding) with city/timezone/desc, centered note paragraph (max-w 700px), padding 80/64
- [x] 2.7 Create `HowWeGotHere.astro` — dark bg, centered header, 3-column timeline with year (accent 32px) and description, columns separated by 1px right border `#333` (except last), padding 80/64
- [x] 2.8 Create `AboutCta.astro` — accent bg, centered headline+subtitle, dark button linking to `/contact` with "BOOK A FREE DISCOVERY CALL →", alt text mentioning services, padding 80/64

## 3. Page Assembly

- [x] 3.1 Create `src/pages/about.astro` — import all 8 sections + BaseLayout, set title "About Us — number6.ai" with meta description, compose sections in order with a 1px divider `<div>` between Our Story and What We Believe

## 4. Verification

- [x] 4.1 Run `pnpm build` to confirm static build succeeds
- [x] 4.2 Run `pnpm biome check --write` to fix any lint/format issues
- [x] 4.3 Visual comparison: take screenshot and compare against Pencil design for each section
