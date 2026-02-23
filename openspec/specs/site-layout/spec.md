## ADDED Requirements

### Requirement: BaseLayout with shared structure
The site SHALL provide a `BaseLayout.astro` layout that includes the HTML shell, meta tags, self-hosted font loading via `@font-face` declarations and `<link rel="preload">` for critical weights, global CSS import, canonical URL tag, default OG and Twitter Card meta tags, a named `<slot name="head" />` for per-page meta injection, Header, a content slot, and Footer.

#### Scenario: Page uses BaseLayout
- **WHEN** a page uses `<BaseLayout>` as its layout
- **THEN** it renders with the Header at top, page content in the middle, and Footer at bottom

#### Scenario: Meta tags and fonts
- **WHEN** the page loads
- **THEN** it includes charset, viewport, favicon (including apple-touch-icon, favicon-96x96.png, and site.webmanifest), self-hosted font `@font-face` declarations for Space Grotesk (400, 600, 700) and Inter (400, 500), and `<link rel="preload">` for Space Grotesk 700 and Inter 400

#### Scenario: Canonical and OG tags render
- **WHEN** any page using BaseLayout loads
- **THEN** the `<head>` contains a canonical URL tag, og:title, og:description, og:url, og:type, og:site_name, twitter:card, twitter:title, and twitter:description

#### Scenario: Head slot accepts page-specific meta
- **WHEN** a page provides content for `<slot name="head">`
- **THEN** the custom content renders inside `<head>` alongside default meta tags

### Requirement: Header component
The Header SHALL be an Astro component with:
- Logo section: terracotta square with "6" + "NUMBER6" wordmark (Space Grotesk, weight 700, letter-spacing 3px)
- Navigation links: Services, About, Blog, Contact (Space Grotesk, 14px, weight 500, gray `#888`)
- CTA button: "BOOK A CALL" on terracotta background

The Header SHALL have a dark (`#1A1A1A`) background with horizontal layout, space-between alignment, and `px-16 py-5` padding.

#### Scenario: Header renders on all pages
- **WHEN** any page using BaseLayout loads
- **THEN** the Header appears at the top with logo, nav links, and CTA

#### Scenario: Navigation links
- **WHEN** the user views the Header
- **THEN** they see links for Services, About, Blog, and Contact

### Requirement: Footer component
The Footer SHALL be an Astro component with:
- Top row: Brand column (logo + tagline "AI consulting for the real world. Houston, TX · Manchester, UK") and link columns (Services, Company, Connect)
- Divider: 1px line in `#333`
- Bottom row: Copyright "© 2026 number6.ai. All rights reserved." and legal links (Privacy Policy, Terms of Service)

The Footer SHALL have a dark (`#1A1A1A`) background with vertical layout and responsive padding: `px-4 md:px-8 lg:px-16 pt-16 pb-10`.

The Footer legal links SHALL point to:
- "Privacy Policy" → `/privacy`
- "Terms of Service" → `/terms`

The Footer Services links SHALL point to `/services` (not `/services/companies`).

The Footer LinkedIn link SHALL use the actual company LinkedIn URL (not `href="#"`).

#### Scenario: Footer renders correctly
- **WHEN** any page using BaseLayout loads
- **THEN** the Footer appears at the bottom with all columns and legal text

#### Scenario: Footer link columns
- **WHEN** the user views the Footer
- **THEN** they see three columns: Services (AI Training, AI Strategy, Custom AI Solutions, AI Partnership) linking to `/services`, Company (About, Blog, Contact), Connect (LinkedIn with real URL, Email, Book a Call)

#### Scenario: Footer legal links navigate to legal pages
- **WHEN** the user clicks "Privacy Policy" in the Footer
- **THEN** they navigate to `/privacy`

#### Scenario: Footer terms link navigates to terms page
- **WHEN** the user clicks "Terms of Service" in the Footer
- **THEN** they navigate to `/terms`

#### Scenario: Footer services links work
- **WHEN** the user clicks any Services link in the Footer
- **THEN** they navigate to `/services` (no 404)

### Requirement: Responsive padding on all sections
All section components SHALL use responsive horizontal padding: `px-4 md:px-8 lg:px-16` instead of fixed `px-16`. The Header SHALL also use responsive padding.

#### Scenario: Sections have responsive padding
- **WHEN** the viewport is narrower than 768px
- **THEN** sections use 16px (1rem) horizontal padding instead of 64px

### Requirement: No generator meta tag
BaseLayout SHALL NOT include `<meta name="generator">` tag.

#### Scenario: Generator tag is absent
- **WHEN** any page loads
- **THEN** the HTML source does not contain a `meta` tag with `name="generator"`

### Requirement: Footer responsive layout
The footer SHALL stack its content vertically on mobile. The top row (brand + link columns), link columns themselves, and bottom row (copyright + legal links) SHALL all stack on mobile.

#### Scenario: Footer top row on mobile
- **WHEN** viewport is less than 768px
- **THEN** brand column and link columns stack vertically

#### Scenario: Footer link columns on mobile
- **WHEN** viewport is less than 768px
- **THEN** the 3 link column groups stack vertically

#### Scenario: Footer bottom row on mobile
- **WHEN** viewport is less than 768px
- **THEN** copyright text and legal links stack vertically with centered alignment

#### Scenario: Footer on desktop
- **WHEN** viewport is 768px or greater
- **THEN** footer displays with horizontal layout as designed
