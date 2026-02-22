## ADDED Requirements

### Requirement: Blog content collection definition
The system SHALL define an Astro content collection named `blog` in `src/content.config.ts` with a Zod schema for frontmatter validation. Source directory: `src/content/blog/`.

#### Scenario: Collection is defined
- **WHEN** the Astro build runs
- **THEN** the `blog` collection is available via `getCollection('blog')` with typed entries

### Requirement: Frontmatter schema
Each blog post SHALL have the following frontmatter fields validated by Zod:
- `title` (string, required)
- `subtitle` (string, optional)
- `date` (date, required)
- `updated` (date, optional)
- `author` (enum: "partner-houston" | "partner-manchester", required)
- `category` (enum: "ai-for-humans" | "honest-take" | "90-day-wins" | "behind-the-agent", required)
- `tags` (array of strings, required)
- `excerpt` (string, required)
- `featured_image` (string, required)
- `featured_image_alt` (string, required)
- `featured` (boolean, default false)
- `draft` (boolean, default false)

#### Scenario: Valid frontmatter passes validation
- **WHEN** a markdown file has all required fields with correct types
- **THEN** the content collection accepts the file and it appears in queries

#### Scenario: Invalid frontmatter fails build
- **WHEN** a markdown file is missing required fields or has wrong types
- **THEN** the Astro build fails with a descriptive Zod validation error

### Requirement: Draft posts are excluded from production
The system SHALL filter out posts with `draft: true` from all queries in production builds.

#### Scenario: Draft post in production
- **WHEN** a post has `draft: true` and the site builds for production
- **THEN** the post does not appear in the listing, category pages, related articles, or RSS feed

### Requirement: Posts are sorted by date descending
All post queries SHALL return posts sorted by `date` field in descending order (newest first).

#### Scenario: Post ordering
- **WHEN** the blog listing page renders
- **THEN** posts appear with the most recent date first

### Requirement: Author data module
The system SHALL provide author metadata in `src/data/authors.ts` as a typed object map keyed by author slug. Each entry contains: `name`, `role`, `location`, `bio`, `linkedin` URL, and `avatar` image path.

#### Scenario: Author data is accessible
- **WHEN** a component imports authors data
- **THEN** it can look up author info by the frontmatter `author` key

### Requirement: Read time calculation
The system SHALL calculate estimated read time for each post based on word count (assuming 200 words per minute), rounded up to the nearest minute.

#### Scenario: Read time display
- **WHEN** a 1600-word article is rendered
- **THEN** the read time displays as "8 min read"

### Requirement: Category metadata
The system SHALL define category metadata mapping slugs to display names:
- `ai-for-humans` → "AI for Actual Humans"
- `honest-take` → "The Honest Take"
- `90-day-wins` → "90-Day Wins"
- `behind-the-agent` → "Behind the Agent"

#### Scenario: Category display name
- **WHEN** a post has `category: "ai-for-humans"`
- **THEN** the UI displays "AI FOR ACTUAL HUMANS" (uppercased) in the category tag pill

### Requirement: RSS feed at /rss.xml
The system SHALL generate an RSS 2.0 feed at `/rss.xml` using `@astrojs/rss`. The feed includes all non-draft posts with title, description (excerpt), pubDate, link, and author.

#### Scenario: RSS feed generates
- **WHEN** the site builds
- **THEN** `/rss.xml` contains a valid RSS feed with all published posts

### Requirement: Sample blog post
The system SHALL include at least one sample blog post in `src/content/blog/` to verify the full pipeline works end-to-end.

#### Scenario: Sample post renders
- **WHEN** the site builds
- **THEN** the sample post appears on the listing page and is accessible at its slug URL
