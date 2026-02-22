## Context

The About page is the third marketing page to be implemented after the homepage and services page. Both existing pages follow an identical architecture: a page file in `src/pages/` composing section components from `src/components/sections/`, wrapped in `BaseLayout.astro`. The design is finalized in `design/number6.pen` (frame `EaXld`).

The Header already links to `/about`. The shared BaseLayout, theme variables, and Footer are all in place and reusable without modification.

## Goals / Non-Goals

**Goals:**
- Implement the About page matching the Pencil design pixel-for-pixel
- Follow the established section-component architecture from homepage/services
- Use only existing theme tokens and Tailwind classes (no new CSS variables)
- All sections are static content — no client-side JS required

**Non-Goals:**
- No responsive/mobile layout (not yet designed)
- No CMS or dynamic content — all copy is hardcoded in components
- No new shared components or design system additions
- Partner 2 bio is placeholder (marked italic in design) — implement as-is

## Decisions

### 1. File structure mirrors existing pages
**Decision**: Place sections in `src/components/sections/about/` following the `services/` pattern.
**Rationale**: Consistent with homepage (`sections/*.astro`) and services (`sections/services/*.astro`). Each section is a self-contained Astro component.

### 2. All components are `.astro` (no React)
**Decision**: Use pure Astro components for every section.
**Rationale**: The entire page is static content. No interactivity means no need for React islands or `client:*` directives. This keeps JS payload at zero.

### 3. Team photos use static image files
**Decision**: Download the AI-generated team photos from the design asset references and place them in `public/images/about/` as static files.
**Rationale**: Simpler than using Astro's image optimization pipeline for these specific images. They're fixed marketing assets, not user-uploaded content.

### 4. Section naming follows design frame names
**Decision**: Map component files to design section names:
| Design frame | Component file |
|---|---|
| Hero | `AboutHero.astro` |
| Our Story | `OurStory.astro` |
| What We Believe | `WhatWeBelieve.astro` |
| Our Team | `OurTeam.astro` |
| Why Number 6 | `WhyNumber6.astro` |
| Where We Work | `WhereWeWork.astro` |
| How We Got Here | `HowWeGotHere.astro` |
| CTA | `AboutCta.astro` |

**Rationale**: Descriptive names that match the design make cross-referencing straightforward.

### 5. Divider between Our Story and What We Believe is inline
**Decision**: Render the full-width 1px divider as a `<div>` directly in `about.astro` between the two section components, rather than embedding it in either section.
**Rationale**: The divider belongs to neither section — it's a page-level separator. Same pattern could be used elsewhere.

## Risks / Trade-offs

- **Partner 2 bio is placeholder** → Ship as-is with italic styling matching the design. Content can be updated later without structural changes.
- **Team photos are AI-generated placeholders** → Real photos will replace them. Using `public/images/about/` makes swapping trivial.
- **No responsive design** → Mobile visitors will see desktop layout. This is consistent with the current state of all other pages. Mobile will be a separate change.
