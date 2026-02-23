## ADDED Requirements

### Requirement: Blog listing page exists at /blog
The system SHALL serve a blog listing page at the `/blog` route using `BaseLayout.astro`.

#### Scenario: User navigates to /blog
- **WHEN** a user navigates to `/blog`
- **THEN** the page renders with the site Header, blog hero, category filters, featured post, post grid, newsletter signup, CTA section, and Footer

### Requirement: Blog hero section
The blog hero section SHALL display the label "THE HONEST TAKE" in accent color (`#C45A3B`), a headline "The Honest Take." in Space Grotesk 64px bold, a subheadline in Inter 17px muted, and a full-width dark divider below.

#### Scenario: Hero renders correctly
- **WHEN** the blog listing page loads
- **THEN** the hero displays centered with 100px top padding, 80px bottom padding, and 64px horizontal padding

### Requirement: Category filter pills
The system SHALL display horizontal filter pills for: "All", "AI for Actual Humans", "The Honest Take", "90-Day Wins", "Behind the Agent". Each pill is a link. "All" links to `/blog`. Each category links to `/blog/category/[slug]`.

#### Scenario: Active filter is visually highlighted
- **WHEN** the user is on `/blog`
- **THEN** the "All" pill has a solid dark fill (`#1A1A1A`) with light text, and the other pills have a border stroke (`#CCCCCC`) with muted text

#### Scenario: Category filter is active
- **WHEN** the user is on `/blog/category/honest-take`
- **THEN** the "The Honest Take" pill has the solid dark fill and all others have the border style

### Requirement: Featured post section
The system SHALL display the most recent post marked `featured: true` in frontmatter as a featured card. The card SHALL show: featured image (420px height, 4px corner radius), category tag pill (accent bg, white text), title (Space Grotesk 36px bold), date + read time, excerpt, author avatar + name, and a "Read more" link with arrow.

#### Scenario: Featured post renders
- **WHEN** at least one post has `featured: true`
- **THEN** the featured post section displays that post as a two-column layout (image left, content right) with 48px gap

#### Scenario: No featured post
- **WHEN** no post has `featured: true`
- **THEN** the most recent post is used as the featured post

### Requirement: Post grid
The system SHALL display non-featured posts in a 2-column grid. Each card shows: thumbnail image (220px height, 4px radius), category tag, title, date + read time, excerpt, and author name. Rows have 32px gap between cards and between rows.

#### Scenario: Grid renders with posts
- **WHEN** there are posts beyond the featured post
- **THEN** they display in a 2-column grid with 64px horizontal padding

#### Scenario: Grid on category page
- **WHEN** the user is on `/blog/category/[category]`
- **THEN** only posts matching that category appear in the grid (and featured section)

### Requirement: Newsletter signup section
The system SHALL display a newsletter signup section with dark background (`#1A1A1A`). Left side: "NEWSLETTER" label in accent, "Get the AI Reality Check." headline, description text. Right side: email input field + "SUBSCRIBE" button (accent bg) + privacy note.

#### Scenario: Newsletter section renders
- **WHEN** the blog listing page loads
- **THEN** the newsletter section appears between the post grid and CTA section with 80px vertical padding

### Requirement: Blog CTA section
The system SHALL display a CTA section with accent background (`#C45A3B`) containing: headline "Want to stop reading and start doing?", body text, and a "BOOK A FREE DISCOVERY CALL" button (dark bg) with arrow icon.

#### Scenario: CTA section renders
- **WHEN** the blog listing page loads
- **THEN** the CTA section appears as the last content section before the footer with 100px vertical padding

### Requirement: Category pages at /blog/category/[category]
The system SHALL generate static pages for each category: `ai-for-humans`, `honest-take`, `90-day-wins`, `behind-the-agent`. Each page uses the same layout as `/blog` but filters posts to the matching category.

#### Scenario: Category page filters posts
- **WHEN** a user navigates to `/blog/category/ai-for-humans`
- **THEN** only posts with `category: "ai-for-humans"` appear in the featured section and grid

### Requirement: Noindex empty category pages
Category pages with zero matching posts SHALL include `<meta name="robots" content="noindex, follow">` in the `<head>` to prevent indexing of thin content.

#### Scenario: Empty category page has noindex
- **WHEN** a user navigates to `/blog/category/90-day-wins` and there are no posts in that category
- **THEN** the page `<head>` contains `<meta name="robots" content="noindex, follow">`

#### Scenario: Category page with posts is indexable
- **WHEN** a user navigates to `/blog/category/honest-take` and there are posts in that category
- **THEN** the page does NOT contain a noindex meta tag

### Requirement: PostGrid responsive layout
The blog post grid SHALL display 1 column on mobile and 2 columns on tablet and above.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** blog cards display in a single column

#### Scenario: Tablet and above
- **WHEN** viewport is 768px or greater
- **THEN** blog cards display in 2 columns

### Requirement: FeaturedPost responsive layout
The featured post layout (image + text side-by-side) SHALL stack vertically on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** featured image and text content stack vertically
