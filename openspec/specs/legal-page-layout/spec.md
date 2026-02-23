## ADDED Requirements

### Requirement: LegalLayout wraps BaseLayout
The system SHALL provide a `LegalLayout.astro` layout that wraps `BaseLayout` and renders the CMS page structure: breadcrumbs, page title area, two-column content area (TOC sidebar + body), within the BaseLayout's content slot.

#### Scenario: Legal page renders with full chrome
- **WHEN** a page uses `<LegalLayout>` with title, lastUpdated, breadcrumbLabel, and toc props
- **THEN** the page renders with Header (from BaseLayout), breadcrumbs, page title area, content columns, and Footer (from BaseLayout)

### Requirement: Breadcrumbs
The legal page layout SHALL render a breadcrumb trail at the top of the content area with "Home" linking to `/`, a `/` separator, and the current page name (from `breadcrumbLabel` prop).

#### Scenario: Breadcrumb rendering
- **WHEN** the page loads with `breadcrumbLabel="Terms & Conditions"`
- **THEN** breadcrumbs show "Home / Terms & Conditions" where "Home" is a link to `/` and the current page name is non-linked text

#### Scenario: Breadcrumb typography
- **WHEN** the breadcrumbs render
- **THEN** "Home" uses Inter 13px normal weight in `#888888`, separator uses Inter 13px in `#AAAAAA`, and the current page uses Inter 13px weight 500 in `#1A1A1A`

### Requirement: Page title area
The legal page layout SHALL render a page title area below the breadcrumbs containing the page title and last-updated date, with a 1px bottom border in `#1A1A1A`.

#### Scenario: Title area content
- **WHEN** the page loads with `title="Terms & Conditions"` and `lastUpdated="February 22, 2026"`
- **THEN** the title area shows the title in Space Grotesk 48px bold with -2px letter-spacing, and "Last updated: February 22, 2026" below in Inter 14px normal `#888888`

#### Scenario: Title area spacing
- **WHEN** the title area renders
- **THEN** it has padding of 64px top, 64px left/right, 48px bottom, with 20px gap between elements and a 1px bottom border

### Requirement: TOC sidebar
The legal page layout SHALL render a table of contents sidebar on the left side of the content area, 260px wide, with a sticky position.

#### Scenario: TOC content
- **WHEN** the page provides a `toc` prop with entries `[{ id: "section-1", label: "1. Introduction" }, ...]`
- **THEN** the sidebar shows "ON THIS PAGE" label in Space Grotesk 11px semibold `#C45A3B` with 2px letter-spacing, followed by the TOC entries as anchor links

#### Scenario: TOC entry styling
- **WHEN** the TOC entries render
- **THEN** each entry uses Inter 13px in `#888888`, and entries are links to `#<id>` anchors on the page

### Requirement: Body content area
The legal page layout SHALL render a body content area to the right of the TOC sidebar that fills the remaining width and accepts a default slot for page content.

#### Scenario: Content area layout
- **WHEN** the content area renders
- **THEN** the TOC sidebar and body content are in a horizontal layout with 64px gap, and the content area has 48px top padding and 64px horizontal padding

#### Scenario: Content slot
- **WHEN** a page passes content into the LegalLayout default slot
- **THEN** that content renders in the body content area

### Requirement: Prose typography
The body content area SHALL style its content with consistent typography matching the design: section headings in Space Grotesk 28px bold with -1px letter-spacing, body text in Inter 17px normal with 1.75 line-height in `#1A1A1A`, bold inline labels in Inter 17px weight 700, and bullet lists indented 24px with `bullet-dot` prefix.

#### Scenario: Section heading
- **WHEN** an `<h2>` renders in the body content
- **THEN** it uses Space Grotesk 28px font-weight 700 with -1px letter-spacing and `#1A1A1A` color

#### Scenario: Body paragraph
- **WHEN** a `<p>` renders in the body content
- **THEN** it uses Inter 17px font-weight normal with 1.75 line-height and `#1A1A1A` color

### Requirement: Section dividers
The body content area SHALL render 1px horizontal dividers in `#E0DDD8` between content sections, with 48px vertical gap between sections.

#### Scenario: Divider between sections
- **WHEN** two content sections are adjacent in the body
- **THEN** a 1px `#E0DDD8` line separates them with 48px gap above and below

### Requirement: Blockquote styling
The body content area SHALL style blockquotes with a 4px left border in `#C45A3B` (terracotta), 16px top/bottom padding, 24px left/right padding, and italic Inter 17px text in `#888888`.

#### Scenario: Blockquote renders
- **WHEN** a blockquote element appears in the body content
- **THEN** it has a terracotta left border, muted italic text, and proper padding

### Requirement: Back to top link
The body content area SHALL render a "Back to top" link at the bottom with an up-arrow icon and terracotta text, preceded by a 1px `#E0DDD8` top border with 32px top padding.

#### Scenario: Back to top renders
- **WHEN** the user scrolls to the bottom of the body content
- **THEN** they see an up-arrow icon and "Back to top" text in Space Grotesk 13px semibold `#C45A3B`, which links to the top of the page

### Requirement: LegalLayout sidebar responsive
The legal page layout with TOC sidebar and content SHALL stack the sidebar above content on mobile. The sidebar SHALL not be sticky on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** TOC sidebar displays above the content as full-width, without sticky positioning

#### Scenario: Desktop viewport
- **WHEN** viewport is 1024px or greater
- **THEN** TOC sidebar displays at fixed width beside content with sticky positioning
