## ADDED Requirements

### Requirement: BaseLayout with shared structure
The site SHALL provide a `BaseLayout.astro` layout that includes the HTML shell, meta tags, font loading (`<link>` tags with preconnect), global CSS import, Header, a content slot, and Footer.

#### Scenario: Page uses BaseLayout
- **WHEN** a page uses `<BaseLayout>` as its layout
- **THEN** it renders with the Header at top, page content in the middle, and Footer at bottom

#### Scenario: Meta tags and fonts
- **WHEN** the page loads
- **THEN** it includes charset, viewport, favicon, Google Fonts preconnect and stylesheet links for Space Grotesk and Inter

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

The Footer SHALL have a dark (`#1A1A1A`) background with vertical layout and `px-16 pt-16 pb-10` padding.

The Footer legal links SHALL point to:
- "Privacy Policy" → `/privacy`
- "Terms of Service" → `/terms`

#### Scenario: Footer renders correctly
- **WHEN** any page using BaseLayout loads
- **THEN** the Footer appears at the bottom with all columns and legal text

#### Scenario: Footer link columns
- **WHEN** the user views the Footer
- **THEN** they see three columns: Services (AI Training, AI Strategy, Custom AI Solutions, AI Partnership), Company (About, Blog, Contact), Connect (LinkedIn, Email, Book a Call)

#### Scenario: Footer legal links navigate to legal pages
- **WHEN** the user clicks "Privacy Policy" in the Footer
- **THEN** they navigate to `/privacy`

#### Scenario: Footer terms link navigates to terms page
- **WHEN** the user clicks "Terms of Service" in the Footer
- **THEN** they navigate to `/terms`
