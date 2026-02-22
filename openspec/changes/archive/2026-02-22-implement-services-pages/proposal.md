## Why

The site currently only has the homepage implemented. The Services & Pricing page is one of the most critical conversion pages — it's where potential clients evaluate offerings and pricing before booking a call. The design is complete in `design/number6.pen` (frame `IJLnZ`).

## What Changes

- Add a new `/services` route with all sections from the design
- Create 10 new section components for the services page (hero, track navigation, 4 track detail sections, bundles, pricing notes, final CTA)
- Reuse existing `BaseLayout.astro`, `Header.astro`, and `Footer.astro`
- All components use existing theme CSS variables and Tailwind classes — no new design tokens

## Capabilities

### New Capabilities
- `services-page`: The Services & Pricing page with all sections — hero, track navigation, four track detail sections (Learn, Plan, Build, Grow), bundle packages, pricing notes, and final CTA

### Modified Capabilities
_(none — reuses existing layout, header, footer, and theme without changes)_

## Impact

- **New files**: `src/pages/services.astro` + ~10 section components in `src/components/sections/services/`
- **No changes** to existing components, layouts, styles, or configuration
- **No new dependencies** — pure Astro components using existing Tailwind setup
