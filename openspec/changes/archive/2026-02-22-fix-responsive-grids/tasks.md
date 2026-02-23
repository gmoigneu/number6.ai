## 1. Homepage Grid Sections

- [x] 1.1 Fix WhatWeDo.astro: change `grid grid-cols-4` to `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- [x] 1.2 Fix HowWeWork.astro: change `grid grid-cols-3` to `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [x] 1.3 Fix WhoItsFor.astro: change `grid grid-cols-4` to `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- [x] 1.4 Fix SocialProof.astro: change `grid grid-cols-4` to `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4`
- [x] 1.5 Fix WhyNumber6.astro: add `flex-col md:flex-row` to differentiator card inner layout (icon + text row)

## 2. Services Page - Track Sections

- [x] 2.1 Fix TrackLearn.astro: add `flex-col md:flex-row` to both card row containers (lines 84, 103)
- [x] 2.2 Fix TrackLearn.astro: add `flex-col md:flex-row md:items-end md:justify-between gap-4` to track header
- [x] 2.3 Fix TrackPlan.astro: add `flex-col md:flex-row` to top cards container (line 58)
- [x] 2.4 Fix TrackPlan.astro: add `flex-col md:flex-row` to bottom wide card (line 80), make `w-[350px]` responsive as `w-full md:w-[350px]`
- [x] 2.5 Fix TrackPlan.astro: add responsive header layout
- [x] 2.6 Fix TrackBuild.astro: add `flex-col md:flex-row` to each horizontal service card, make `w-[350px]` responsive as `w-full md:w-[350px]`
- [x] 2.7 Fix TrackBuild.astro: add responsive header layout
- [x] 2.8 Fix TrackGrow.astro: add `flex-col md:flex-row` to cards container (line 65)
- [x] 2.9 Fix TrackGrow.astro: add responsive header layout
- [x] 2.10 Fix HowServicesWork.astro: add `flex-col md:flex-row` to tracks container (line 43)
- [x] 2.11 Fix BundlePackages.astro: add `flex-col md:flex-row` to bundles container (line 47)

## 3. About Page Sections

- [x] 3.1 Fix OurTeam.astro: add `flex-col md:flex-row` to partner cards container (line 14)
- [x] 3.2 Fix OurTeam.astro: add `flex-col md:flex-row` to "Why two people?" section (line 54), make `w-[380px]` responsive as `w-full md:w-[380px]`
- [x] 3.3 Fix OurStory.astro: add `flex-col md:flex-row` to main layout (line 2), make `w-[440px]` responsive as `w-full md:w-[440px]`
- [x] 3.4 Fix WhereWeWork.astro: add `flex-col md:flex-row` to location cards container (line 9)
- [x] 3.5 Fix WhatWeBelieve.astro: add `flex-col md:flex-row` to each principle row (line 41), make `w-[320px]` responsive as `w-full md:w-[320px]`
- [x] 3.6 Fix HowWeGotHere.astro: add `flex-col md:flex-row` to timeline container (line 32), change border-r to `border-b md:border-b-0 md:border-r` and adjust padding from `pr-8`/`px-8`/`pl-8` to responsive equivalents

## 4. Blog Sections

- [x] 4.1 Fix PostGrid.astro: change `grid grid-cols-2` to `grid grid-cols-1 md:grid-cols-2`
- [x] 4.2 Fix RelatedArticles.astro: change `grid grid-cols-3` to `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [x] 4.3 Fix FeaturedPost.astro: add `flex-col md:flex-row` to main container (line 39)

## 5. Layout Components

- [x] 5.1 Fix Footer.astro: add `flex-col md:flex-row md:justify-between gap-10 md:gap-0` to top row (line 7)
- [x] 5.2 Fix Footer.astro: add `flex-col md:flex-row gap-8 md:gap-20` to link columns container (line 22)
- [x] 5.3 Fix Footer.astro: add `flex-col md:flex-row md:items-center md:justify-between gap-4` to bottom row (line 51)
- [x] 5.4 Fix LegalLayout.astro: add `flex-col lg:flex-row` to content area (line 33), make sidebar `w-full lg:w-[260px]` and `lg:sticky` instead of `sticky`

## 6. Verification

- [x] 6.1 Test all homepage sections at mobile (375px), tablet (768px), and desktop (1024px+) viewports
- [x] 6.2 Test services pages at all three viewport sizes
- [x] 6.3 Test about page at all three viewport sizes
- [x] 6.4 Test blog listing and article pages at all three viewport sizes
- [x] 6.5 Test footer and legal pages at all three viewport sizes
- [x] 6.6 Run `pnpm build` to verify no build errors

## 7. Additional Fixes (found during verification)

- [x] 7.1 Fix AboutHero.astro: add `max-w-full` to decorative line `w-[800px]` to prevent horizontal scroll
- [x] 7.2 Fix NewsletterSignup.astro: add `flex-col md:flex-row` to section container so heading and form stack on mobile
- [x] 7.3 Fix CategoryFilters.astro: add `flex-wrap` to nav so category pills wrap on mobile
- [x] 7.4 Fix Hero.astro: add `flex-col sm:flex-row` to CTA buttons container so they stack on small mobile
