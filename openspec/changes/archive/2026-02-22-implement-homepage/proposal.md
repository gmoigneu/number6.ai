## Why

The site is scaffolded (Astro 5 + React + Tailwind + shadcn) but has no actual content — just a placeholder `<h1>Astro</h1>`. We need to implement the homepage to match the approved design in `design/number6.pen`, establish the brand theme (fonts, colors as CSS variables), and build the shared Header/Footer layout so subsequent pages can reuse it.

## What Changes

- Configure the Tailwind/shadcn theme with number6 brand colors as CSS custom properties (warm off-white `#F5F2ED`, terracotta `#C45A3B`, dark `#1A1A1A`, beige `#E8E4DD`, grays)
- Add Google Fonts: Space Grotesk (headings) and Inter (body)
- Create a shared `BaseLayout.astro` with `<Header>` and `<Footer>` components
- Implement the full homepage with all 12 sections: Hero, Trust Bar, The Problem, What We Do, How We Work, Why number6, Who It's For, Social Proof, The Name, Final CTA
- All sections are static content — no client-side interactivity required (pure Astro components)

## Capabilities

### New Capabilities
- `theme-config`: Brand color variables, font configuration, Tailwind theme customization
- `site-layout`: Shared BaseLayout with Header and Footer components (reusable across all pages)
- `homepage`: Full homepage implementation with all 12 design sections

### Modified Capabilities
_None — this is the first implementation._

## Impact

- **Files created**: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/pages/index.astro` (rewritten)
- **Files modified**: `src/styles/global.css` (brand theme variables)
- **Dependencies**: Google Fonts (Space Grotesk, Inter) via `<link>` tags, lucide-react for icons
- **No breaking changes** — replacing placeholder content only
