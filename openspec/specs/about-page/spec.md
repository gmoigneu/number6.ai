## ADDED Requirements

### Requirement: About page is accessible at /about
The system SHALL serve the About page at the `/about` URL path using file-based routing (`src/pages/about.astro`). The page SHALL use `BaseLayout` with title "About Us — number6.ai" and an appropriate meta description.

#### Scenario: User navigates to /about
- **WHEN** a user visits `/about`
- **THEN** the About page renders with all 8 sections in order: Hero, Our Story, What We Believe, Our Team, Why Number 6, Where We Work, How We Got Here, CTA

### Requirement: Hero section displays brand introduction
The Hero section SHALL display an accent-colored "ABOUT US" label, the headline "Two people. Two continents. One mission: make AI work for your business.", a subtitle paragraph, and a full-width decorative divider. All text SHALL be centered. Background SHALL be `bg-background`.

#### Scenario: Hero section renders correctly
- **WHEN** the About page loads
- **THEN** the Hero section displays the label in accent color with tracking, headline in Space Grotesk 56px bold, subtitle in Inter 18px with max-width 700px, and a 4px dark divider spanning the section width

### Requirement: Our Story section displays narrative in two-column layout
The Our Story section SHALL display a left column (440px wide) containing an accent "OUR STORY" label and a headline, and a right column (fill remaining width) containing 6 paragraphs of narrative text. The columns SHALL be separated by 80px gap.

#### Scenario: Our Story renders two-column layout
- **WHEN** the About page loads
- **THEN** the Our Story section shows the headline "We started number6 because we were tired of the AI hype gap." on the left and 6 body paragraphs on the right in Inter 16px with 1.7 line height

### Requirement: What We Believe section displays principles on dark background
The What We Believe section SHALL render on a dark background (`bg-foreground`) with a centered header (accent label + light headline) and 5 principle rows. Each principle row SHALL have a left-aligned title (320px wide, accent color, Space Grotesk 22px bold) and a right-aligned description (fill width, muted text). Rows SHALL be separated by a 1px top border in `#333333`.

#### Scenario: All five principles render with correct layout
- **WHEN** the About page loads
- **THEN** the What We Believe section displays 5 principles: "Honesty over sales.", "Results over impressions.", "Teaching over dependency.", "Transparency over mystery.", "People over technology." — each with its description text

### Requirement: Our Team section displays partner cards and "Why two people?" subsection
The Our Team section SHALL display a header with label, headline, and intro paragraph, followed by two equal-width partner cards side by side (32px gap). Each card SHALL have a 400px-tall photo area, followed by a content area with role label, location name, bio paragraphs, and specialties. Below the cards, a "Why two people?" subsection SHALL render with a 2px top border, two-column layout (question left at 380px, answer paragraphs right).

#### Scenario: Partner cards render with photos and bios
- **WHEN** the About page loads
- **THEN** two partner cards display: "Houston, TX" (with full bio and specialties) and "Manchester, UK" (with placeholder italic bio), each with a 2px dark border and photo

#### Scenario: Why two people subsection renders
- **WHEN** the About page loads
- **THEN** the "Why two people?" subsection appears below the partner cards with a question/tagline on the left and 3 answer paragraphs on the right

### Requirement: Why Number 6 section explains the brand name
The Why Number 6 section SHALL render on a beige background (`bg-muted`) with a large decorative "6" character (320px, 8% opacity) and a content column containing the accent label, headline, and 4 paragraphs explaining the Battlestar Galactica reference. The last two paragraphs SHALL be in muted color, with the third in italic.

#### Scenario: Why Number 6 section renders with decorative element
- **WHEN** the About page loads
- **THEN** the section displays a large faded "6" alongside the name origin narrative, with the final note paragraph in smaller 14px text

### Requirement: Where We Work section displays location cards
The Where We Work section SHALL display a centered header, two equal-width location cards (Houston and Manchester) with city name, timezone label in accent, and description. Below the cards, a centered note paragraph (max-width 700px) SHALL explain the transatlantic setup. Cards SHALL have 2px dark borders and 40px padding.

#### Scenario: Location cards display city information
- **WHEN** the About page loads
- **THEN** two location cards appear: "Houston, Texas" (Central Time Zone) and "Manchester, United Kingdom" (GMT / BST), each with a serving description

### Requirement: How We Got Here section displays horizontal timeline
The How We Got Here section SHALL render on a dark background with a centered header and a 3-column horizontal timeline. Each column SHALL display a year/range in accent color (32px bold) and a description paragraph. Columns SHALL be visually separated by 1px right borders in `#333333` (except the last column).

#### Scenario: Timeline displays three periods
- **WHEN** the About page loads
- **THEN** the timeline shows: "2020–2024" (building expertise), "2025" (identifying the gap), "2026" (launching number6.ai)

### Requirement: CTA section drives user to book a call
The CTA section SHALL render on an accent background (`bg-accent`) with a centered headline, subtitle, a dark button linking to `/contact` with text "BOOK A FREE DISCOVERY CALL →", and an alternative text linking conceptually to services. All text SHALL be light colored.

#### Scenario: CTA button links to contact page
- **WHEN** the About page loads
- **THEN** the CTA section displays a "BOOK A FREE DISCOVERY CALL →" button that links to `/contact`

### Requirement: Full author identities
The author data file (`src/data/authors.ts`) SHALL use full names instead of initials for all authors. Each author record SHALL include a complete LinkedIn profile URL (not just the base URL) and a detailed bio with credentials.

#### Scenario: Author names are full names
- **WHEN** a blog post or about page displays an author
- **THEN** the author's full name is shown (not initials like "G." or "GQ.")

#### Scenario: Author LinkedIn URLs are complete
- **WHEN** an author's LinkedIn link is rendered
- **THEN** the URL points to a specific LinkedIn profile (not `https://www.linkedin.com/in/` without a slug)

### Requirement: About page breadcrumb schema
The about page SHALL include BreadcrumbList JSON-LD with: Home > About.

#### Scenario: About breadcrumb renders
- **WHEN** the `/about` page loads
- **THEN** the page contains BreadcrumbList JSON-LD with two items

### Requirement: About page improved title
The about page title SHALL be descriptive: "About Us - Meet the AI Consultants | number6.ai" instead of "About | number6.ai".

#### Scenario: About page has descriptive title
- **WHEN** the `/about` page loads
- **THEN** the `<title>` is "About Us - Meet the AI Consultants | number6.ai"

### Requirement: OurTeam partner cards layout
The 2 partner cards SHALL stack vertically on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** partner cards stack vertically

#### Scenario: Tablet and above
- **WHEN** viewport is 768px or greater
- **THEN** partner cards display side-by-side

### Requirement: OurTeam "Why two people?" section layout
The "Why two people?" section with fixed-width title and flexible description SHALL stack vertically on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** title block and description stack vertically, title block becomes full-width

#### Scenario: Desktop viewport
- **WHEN** viewport is 768px or greater
- **THEN** title block displays at fixed width beside description

### Requirement: OurStory layout
The story section with fixed-width header column and flexible body text SHALL stack vertically on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** header and body text stack vertically, header becomes full-width

### Requirement: WhereWeWork location cards layout
The 2 location cards SHALL stack vertically on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** location cards stack vertically

### Requirement: WhatWeBelieve principles layout
Each principle row (title + description side-by-side) SHALL stack vertically on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** principle title and description stack vertically, title becomes full-width

### Requirement: HowWeGotHere timeline layout
The 3-column timeline SHALL stack vertically on mobile. Border styling SHALL adapt from right borders (column separators) to bottom borders (row separators).

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** timeline entries stack vertically with bottom borders instead of right borders

#### Scenario: Desktop viewport
- **WHEN** viewport is 768px or greater
- **THEN** timeline entries display in 3 columns with right borders
