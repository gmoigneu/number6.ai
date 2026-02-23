## MODIFIED Requirements

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
