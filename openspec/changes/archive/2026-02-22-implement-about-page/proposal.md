## Why

The About page (`/about`) is a core marketing page that's defined in the site structure and linked from the Header navigation but not yet implemented. It tells the number6.ai brand story, introduces the team, and builds trust with potential clients. The design is complete in `design/number6.pen` (frame `EaXld`: number6-about).

## What Changes

- Add `/about` route with a new Astro page at `src/pages/about.astro`
- Create 8 new section components in `src/components/sections/about/`:
  - **Hero** — "Two people. Two continents. One mission." with label, headline, subtitle, divider
  - **Our Story** — Two-column layout: headline left, 6 paragraphs of narrative right
  - **What We Believe** — Dark section with 5 principle rows (title + description, top-border separated)
  - **Our Team** — Two partner cards with photos, bios, specialties + "Why two people?" subsection
  - **Why Number 6** — Beige section with large decorative "6", name origin story
  - **Where We Work** — Two location cards (Houston, Manchester) + timezone note
  - **How We Got Here** — Dark section with 3-column horizontal timeline (2020–2026)
  - **CTA** — Accent-colored call-to-action matching the pattern from other pages
- Include team placeholder photos via AI-generated images from the design

## Capabilities

### New Capabilities
- `about-page`: The About page with all 8 sections, following the same Astro component architecture as the homepage and services page

### Modified Capabilities
_(none — no existing spec requirements change)_

## Impact

- **New files**: `src/pages/about.astro` + 8 section components in `src/components/sections/about/`
- **Existing code**: No modifications needed — Header already links to `/about`, BaseLayout is reused as-is
- **Dependencies**: None new — uses existing Tailwind theme, lucide-react icons, BaseLayout, Header/Footer
- **Design source**: `design/number6.pen` frame `EaXld` (number6-about)
