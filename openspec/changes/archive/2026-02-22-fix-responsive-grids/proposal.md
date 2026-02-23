## Why

The site's grid and flex layouts break on mobile and tablet viewports. Multi-column grids (2, 3, and 4 columns) render at their desktop column count regardless of screen size, causing cramped unreadable content, horizontal overflow, and a broken mobile experience across every page.

## What Changes

- Fix all CSS grid layouts to use responsive breakpoints: 1 column on mobile (default), 2 columns on tablet (`md:`), full count on desktop (`lg:`)
- Fix all flex-based multi-column layouts to stack vertically on mobile and wrap to rows on tablet/desktop using `flex-col md:flex-row`
- Fix side-by-side content layouts (text + text, text + sidebar) to stack on mobile
- Fix the footer to stack its columns on mobile
- Fix wide card layouts (horizontal cards with side content) to stack vertically on mobile

## Capabilities

### New Capabilities
- `responsive-grids`: Responsive breakpoint rules for all grid and flex-based multi-column layouts across all pages

### Modified Capabilities
- `homepage`: Grid sections (WhatWeDo, HowWeWork, WhoItsFor, SocialProof) need responsive breakpoints
- `services-page`: Service card grids, bundle packages, track headers, and horizontal detail cards need responsive breakpoints
- `about-page`: Team cards, timeline, story layout, beliefs list, and location cards need responsive breakpoints
- `blog-listing`: Featured post and post grid need responsive breakpoints
- `blog-article`: Related articles grid needs responsive breakpoints
- `site-layout`: Footer needs responsive stacking
- `legal-page-layout`: Sidebar + content layout needs responsive stacking

## Impact

- **Components affected** (20+ files across `src/components/`):
  - Homepage sections: WhatWeDo, HowWeWork, WhoItsFor, SocialProof
  - Service sections: TrackLearn, TrackPlan, TrackBuild, TrackGrow, BundlePackages, HowServicesWork
  - About sections: OurTeam, OurStory, WhereWeWork, WhatWeBelieve, HowWeGotHere
  - Blog sections: PostGrid, RelatedArticles, FeaturedPost
  - Layout: Footer, LegalLayout
  - Homepage: WhyNumber6
- **CSS only** - no JS, API, or dependency changes
- **No breaking changes** - purely additive Tailwind responsive classes
