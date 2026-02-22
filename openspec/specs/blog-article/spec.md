## ADDED Requirements

### Requirement: Blog article page exists at /blog/[slug]
The system SHALL serve individual blog articles at `/blog/[slug]` using `BlogArticleLayout.astro`. The slug is derived from the markdown filename.

#### Scenario: User navigates to an article
- **WHEN** a user navigates to `/blog/why-ai-implementations-fail`
- **THEN** the page renders the article with reading header, article header, hero image, article body, article footer, related articles, newsletter signup, CTA, and site footer

### Requirement: Reading progress bar
The article page SHALL display a thin progress bar at the top of the viewport (3px height, `#E0DBD3` track, `#C45A3B` fill) that indicates scroll progress through the article.

#### Scenario: Progress bar updates on scroll
- **WHEN** the user scrolls through the article
- **THEN** the progress bar fill width increases proportionally to scroll position

### Requirement: Minimal reading header
The article page SHALL display a minimal header with dark background (`#1A1A1A`) containing: the NUMBER6 logo (accent mark + white text) on the left, and a "Back to The Honest Take" link with left arrow on the right. This replaces the full site navigation.

#### Scenario: Reading header renders
- **WHEN** the article page loads
- **THEN** the reading header shows with 16px vertical padding and 64px horizontal padding

#### Scenario: Back link navigates to blog
- **WHEN** the user clicks "Back to The Honest Take"
- **THEN** they navigate to `/blog`

### Requirement: Article header section
The article header SHALL display (in order, centered): category tag pill (accent bg, white text, links to category page), article title (Space Grotesk 52px bold, max 900px width), optional subtitle (Inter 18px muted, max 700px width), meta line (date + read time in muted text), and author byline (40px avatar + name + role).

#### Scenario: Article header renders with all fields
- **WHEN** the article has title, subtitle, category, date, and author
- **THEN** all elements display centered with 80px top padding and 48px bottom padding

#### Scenario: Article header without subtitle
- **WHEN** the article has no subtitle in frontmatter
- **THEN** the subtitle element is omitted and spacing adjusts naturally

### Requirement: Article hero image
The article page SHALL display the featured image below the header, rendered at full content width with 64px horizontal padding, 520px height, and 4px corner radius.

#### Scenario: Hero image renders
- **WHEN** the article has a `featured_image` in frontmatter
- **THEN** the image displays with `object-fit: cover` and the `featured_image_alt` as alt text

### Requirement: Article body prose styling
The article body SHALL render markdown content with these styles: body text in Inter 18px with 1.7 line-height, H2 in Space Grotesk 32px bold, H3 in Space Grotesk 24px bold, blockquotes with 4px left border in accent color and italic text, code blocks with dark background (`#1A1A1A`) and syntax highlighting, unordered lists with proper indentation, and horizontal rules as subtle centered dividers.

#### Scenario: Prose elements render correctly
- **WHEN** the article contains headings, paragraphs, blockquotes, code blocks, and lists
- **THEN** each element is styled according to the design spec with 360px horizontal padding on desktop and 28px vertical gap between elements

### Requirement: In-article CTA
The article body SHALL include a CTA block styled as a dark card (`#1A1A1A`, 8px radius, 40px padding) with: "Ready to put this into practice?" headline, body text, and an accent-colored "Book a free call" button.

#### Scenario: CTA placement
- **WHEN** the article renders
- **THEN** the in-article CTA appears approximately 60-70% through the content

### Requirement: Author box in article footer
The article footer SHALL display an author box with muted background (`#E8E4DD`, 8px radius, 32px padding) containing: 72px avatar, author name, role + location, short bio, and a LinkedIn link.

#### Scenario: Author box renders
- **WHEN** the article page loads
- **THEN** the author box displays below the article body with the author's data from the authors data file

### Requirement: Tags and share section
The article footer SHALL display a row with tag pills on the left (from the article's `tags` frontmatter) and share buttons on the right (LinkedIn, Twitter/X, copy link, email). Tags link to `/blog?tag=[tag]` (or are non-functional links initially).

#### Scenario: Tags and share render
- **WHEN** the article has tags in frontmatter
- **THEN** tags display as muted border pills and share icons display on the right

### Requirement: Related articles section
The system SHALL display up to 3 related articles below the article footer. Related articles are selected by: same category (highest priority), then shared tags. The current article MUST be excluded.

#### Scenario: Related articles render
- **WHEN** there are other articles in the collection
- **THEN** up to 3 related article cards display in a 3-column grid under "Keep reading" heading with thumbnail, category tag, title, date + read time, and excerpt

### Requirement: Newsletter and CTA sections in article
The article page SHALL include the same newsletter signup and CTA sections as the listing page, appearing after the related articles section and before the footer.

#### Scenario: Article page newsletter and CTA
- **WHEN** the article page loads
- **THEN** the newsletter signup ("Get the AI Reality Check.") and CTA ("Want to talk about this?") sections render identically to the listing page versions

### Requirement: Article SEO meta tags
Each article page SHALL include: `<title>` as "Article Title — The Honest Take | number6.ai", meta description from excerpt, Open Graph tags (type: article, title, description, image, published_time, author, section, tags), and Twitter card tags (summary_large_image).

#### Scenario: Meta tags render correctly
- **WHEN** the article page is rendered
- **THEN** the HTML head contains all specified meta and OG tags populated from frontmatter
