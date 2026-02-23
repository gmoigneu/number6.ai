## MODIFIED Requirements

### Requirement: Track headers responsive layout
Each track section header (LEARN, PLAN, BUILD, GROW) with title and description side-by-side SHALL stack vertically on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** track title and description stack vertically

#### Scenario: Desktop viewport
- **WHEN** viewport is 768px or greater
- **THEN** track title and description display side-by-side

### Requirement: TrackLearn card rows layout
The TrackLearn service card rows (2 cards per row) SHALL stack to 1 column on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** service cards in each row stack vertically

#### Scenario: Tablet and above
- **WHEN** viewport is 768px or greater
- **THEN** service cards display 2 per row

### Requirement: TrackPlan cards layout
The TrackPlan top cards (2 side-by-side) SHALL stack on mobile. The bottom wide card (horizontal with sidebar) SHALL stack its content and sidebar vertically on mobile.

#### Scenario: Top cards on mobile
- **WHEN** viewport is less than 768px
- **THEN** the 2 plan cards stack vertically

#### Scenario: Bottom card on mobile
- **WHEN** viewport is less than 768px
- **THEN** the card description and includes sidebar stack vertically, sidebar becomes full-width

### Requirement: TrackBuild cards layout
The TrackBuild horizontal service cards (description + includes sidebar) SHALL stack their content vertically on mobile, with the fixed-width sidebar becoming full-width.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** card description and includes sidebar stack vertically

### Requirement: TrackGrow cards layout
The TrackGrow 3 service cards SHALL stack to 1 column on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** service cards stack vertically

#### Scenario: Tablet and above
- **WHEN** viewport is 768px or greater
- **THEN** service cards display side-by-side

### Requirement: HowServicesWork tracks layout
The 4 track overview cards SHALL stack on mobile and display in a row on desktop.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** track cards stack vertically

### Requirement: BundlePackages layout
The 3 bundle cards SHALL stack to 1 column on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** bundle cards stack vertically

#### Scenario: Tablet and above
- **WHEN** viewport is 768px or greater
- **THEN** bundle cards display side-by-side
