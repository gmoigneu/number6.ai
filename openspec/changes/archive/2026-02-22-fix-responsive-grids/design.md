## Context

The site uses Tailwind CSS for all styling. Layouts are built with either CSS Grid (`grid grid-cols-N`) or Flexbox (`flex` with `flex-1` children). Currently, most multi-column layouts hardcode their column count without responsive breakpoints, causing content to render in desktop column counts at all viewport sizes.

Tailwind breakpoints in use:
- Default (mobile-first): < 768px
- `md:` (tablet): >= 768px
- `lg:` (desktop): >= 1024px

## Goals / Non-Goals

**Goals:**
- Every multi-column layout displays 1 column on mobile, 2 on tablet, full count on desktop
- Horizontal split layouts (text + sidebar) stack vertically on mobile
- Footer columns stack on mobile
- Fixed-width elements (`w-[350px]`, `w-[320px]`, `w-[440px]`) become full-width on mobile
- All changes are CSS-only (Tailwind classes), no structural HTML changes

**Non-Goals:**
- Redesigning any component's visual appearance
- Changing spacing, typography, or color
- Adding new components or JavaScript
- Changing the mobile navigation (already responsive)

## Decisions

### 1. CSS Grid layouts: add responsive column breakpoints

**Pattern**: Replace `grid-cols-N` with `grid-cols-1 md:grid-cols-2 lg:grid-cols-N`

Applies to:
| Component | Current | Target |
|-----------|---------|--------|
| WhatWeDo | `grid-cols-4` | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` |
| WhoItsFor | `grid-cols-4` | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` |
| SocialProof | `grid-cols-4` | `grid-cols-2 md:grid-cols-2 lg:grid-cols-4` |
| HowWeWork | `grid-cols-3` | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| PostGrid | `grid-cols-2` | `grid-cols-1 md:grid-cols-2` |
| RelatedArticles | `grid-cols-3` | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |

**Rationale**: Mobile-first is the Tailwind convention. Stats (SocialProof) use `grid-cols-2` as mobile default since they're compact enough for 2-up.

### 2. Flex-based multi-column layouts: add `flex-col md:flex-row`

**Pattern**: Replace `flex` with `flex flex-col md:flex-row`

Applies to:
- TrackLearn (2 rows of 2 service cards each)
- TrackPlan (2 service cards side-by-side)
- TrackGrow (3 service cards side-by-side)
- BundlePackages (3 bundle cards)
- OurTeam partner cards
- WhereWeWork location cards
- HowWeGotHere timeline (3 columns with vertical borders)
- HowServicesWork (4 track cards)

**Rationale**: These use `flex-1` for equal-width columns. Adding `flex-col` as default stacks them, `md:flex-row` restores side-by-side.

### 3. Horizontal split layouts: stack on mobile

**Pattern**: Add `flex-col md:flex-row` and make fixed-width elements responsive

Applies to:
- OurStory (`flex gap-20` with `w-[440px]` sidebar) → `flex-col md:flex-row`, sidebar becomes `w-full md:w-[440px]`
- OurTeam "Why two people?" section (`w-[380px]`) → same pattern
- WhatWeBelieve principles (title + description rows) → `flex-col md:flex-row`, title becomes `w-full md:w-[320px]`
- TrackBuild horizontal cards (`w-[350px]` sidebar) → `flex-col md:flex-row`, sidebar becomes `w-full md:w-[350px]`
- TrackPlan bottom card → same pattern
- FeaturedPost (image + text side-by-side) → `flex-col md:flex-row`
- WhyNumber6 differentiator cards (icon + text) → `flex-col md:flex-row` with gap reduction on mobile

### 4. Footer: responsive stacking

- Top row (`flex justify-between`): → `flex flex-col md:flex-row md:justify-between gap-10 md:gap-0`
- Link columns (`flex gap-20`): → `flex flex-col md:flex-row gap-8 md:gap-20`
- Bottom row: → `flex flex-col md:flex-row items-center md:justify-between gap-4`

### 5. LegalLayout: sidebar stacks above content on mobile

- Content area: add `flex-col lg:flex-row`
- TOC sidebar: `w-full lg:w-[260px]`, remove `sticky` on mobile via `lg:sticky`

### 6. Track headers (services pages): stack on mobile

The "TRACK 01" headers use `flex items-end justify-between` for title + description.
- Add `flex-col md:flex-row md:items-end md:justify-between gap-4`

## Risks / Trade-offs

- [Visual density change on tablet] Stats section shows 2 columns on mobile instead of 1, keeping it compact. If 2-up feels too tight on very small screens, can revisit. → Acceptable for stat cards which have minimal content.
- [Border handling on timeline] HowWeGotHere uses `border-r` between columns. On mobile stack, right borders look wrong. → Change to `border-b md:border-b-0 md:border-r` pattern.
- [No intermediate tablet breakpoint] Some 4-column grids go 1→2→4. A 3-column intermediate isn't needed since 2 columns at tablet width looks good. → Keep simple.
