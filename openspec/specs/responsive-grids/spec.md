## ADDED Requirements

### Requirement: Grid layouts use responsive column breakpoints
All CSS Grid layouts SHALL use mobile-first responsive breakpoints: 1 column by default, 2 columns at `md:` (768px), and the full column count at `lg:` (1024px).

#### Scenario: 4-column grid on mobile
- **WHEN** viewport width is less than 768px
- **THEN** grid displays 1 column per row

#### Scenario: 4-column grid on tablet
- **WHEN** viewport width is between 768px and 1023px
- **THEN** grid displays 2 columns per row

#### Scenario: 4-column grid on desktop
- **WHEN** viewport width is 1024px or greater
- **THEN** grid displays 4 columns per row

#### Scenario: 3-column grid on mobile
- **WHEN** viewport width is less than 768px
- **THEN** grid displays 1 column per row

#### Scenario: 3-column grid on tablet
- **WHEN** viewport width is between 768px and 1023px
- **THEN** grid displays 2 columns per row

#### Scenario: 2-column grid on mobile
- **WHEN** viewport width is less than 768px
- **THEN** grid displays 1 column per row

### Requirement: Flex layouts stack vertically on mobile
All flex-based multi-column layouts (using `flex-1` children for equal-width columns) SHALL stack vertically on mobile and display side-by-side on tablet and above.

#### Scenario: Flex columns on mobile
- **WHEN** viewport width is less than 768px
- **THEN** flex children stack vertically (column direction)

#### Scenario: Flex columns on tablet and above
- **WHEN** viewport width is 768px or greater
- **THEN** flex children display side-by-side (row direction)

### Requirement: Horizontal split layouts stack on mobile
Layouts with a fixed-width sidebar or panel next to flexible content SHALL stack vertically on mobile, with the sidebar/panel becoming full-width.

#### Scenario: Fixed-width panel on mobile
- **WHEN** viewport width is less than 768px
- **THEN** the fixed-width panel becomes full-width and stacks above or below the main content

#### Scenario: Fixed-width panel on tablet and above
- **WHEN** viewport width is 768px or greater
- **THEN** the fixed-width panel displays at its specified width beside the main content

### Requirement: No horizontal overflow on mobile
No layout SHALL cause horizontal scrolling on mobile viewports (320px - 767px).

#### Scenario: Mobile viewport has no horizontal scroll
- **WHEN** any page is viewed at 375px viewport width
- **THEN** no horizontal scrollbar appears and all content is visible within the viewport width
