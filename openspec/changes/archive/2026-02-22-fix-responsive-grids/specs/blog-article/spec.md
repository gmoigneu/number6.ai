## MODIFIED Requirements

### Requirement: RelatedArticles responsive layout
The related articles grid SHALL display 1 column on mobile, 2 columns on tablet, and 3 columns on desktop.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** related article cards display in 1 column

#### Scenario: Tablet viewport
- **WHEN** viewport is between 768px and 1023px
- **THEN** related article cards display in 2 columns

#### Scenario: Desktop viewport
- **WHEN** viewport is 1024px or greater
- **THEN** related article cards display in 3 columns
