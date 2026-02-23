## MODIFIED Requirements

### Requirement: Article hero image
The article page SHALL display the featured image below the header using the Astro `<Image>` component (not CSS `background-image`), rendered at full content width with responsive horizontal padding (`px-4 md:px-8 lg:px-16`), max 520px height, `object-cover` fit, and 4px corner radius. The image SHALL have proper `alt` text from `featured_image_alt` frontmatter.

#### Scenario: Hero image renders as img element
- **WHEN** the article has a `featured_image` in frontmatter
- **THEN** the image displays as an `<img>` element (via Astro `<Image>`) with `alt` text, lazy loading, and automatic format optimization (WebP/AVIF)

### Requirement: Article body prose styling
The article body SHALL render markdown content with these styles: body text in Inter 18px with 1.7 line-height, H2 in Space Grotesk 32px bold, H3 in Space Grotesk 24px bold, blockquotes with 4px left border in accent color and italic text, code blocks with dark background (`#1A1A1A`) and syntax highlighting, unordered lists with proper indentation, and horizontal rules as subtle centered dividers.

#### Scenario: Prose elements render correctly
- **WHEN** the article contains headings, paragraphs, blockquotes, code blocks, and lists
- **THEN** each element is styled according to the design spec with responsive horizontal padding (`px-4 md:px-8 lg:px-16` on mobile, up to 360px on large screens) and 28px vertical gap between elements

### Requirement: Article SEO meta tags
Each article page SHALL include: `<title>` as "Article Title — The Honest Take | number6.ai", meta description from excerpt, Open Graph tags (type: article, title, description, image as absolute URL using `new URL(ogImage, Astro.site).href`, published_time, author, section, tags), and Twitter card tags (summary_large_image with absolute image URL).

#### Scenario: Meta tags render correctly
- **WHEN** the article page is rendered
- **THEN** the HTML head contains all specified meta and OG tags populated from frontmatter

#### Scenario: OG image URL is absolute
- **WHEN** the article page has an og:image meta tag
- **THEN** the URL starts with `https://number6.ai/` (absolute, not relative)

### Requirement: Reading progress bar hydration
The reading progress bar component SHALL use `client:idle` hydration directive instead of `client:load` to reduce LCP contention.

#### Scenario: Progress bar hydrates on idle
- **WHEN** the article page loads
- **THEN** the ReadingProgressBar component hydrates after the browser becomes idle, not immediately on load

## ADDED Requirements

### Requirement: Semantic date elements
Article pages SHALL render dates using `<time datetime="YYYY-MM-DD">` HTML elements instead of plain text spans.

#### Scenario: Date uses time element
- **WHEN** an article page displays the publication date
- **THEN** it renders as `<time datetime="2026-01-15">January 15, 2026</time>` (with ISO date in the attribute)

### Requirement: BlogPosting structured data
Each article page SHALL include BlogPosting JSON-LD structured data via the SchemaOrg component, injected through the head slot.

#### Scenario: Article has structured data
- **WHEN** a blog article page loads
- **THEN** the page contains a `<script type="application/ld+json">` with BlogPosting schema

### Requirement: Article breadcrumb structured data
Each article page SHALL include BreadcrumbList JSON-LD with: Home > Blog > Article Title.

#### Scenario: Article has breadcrumb schema
- **WHEN** a blog article page loads
- **THEN** the page contains BreadcrumbList JSON-LD with three items
