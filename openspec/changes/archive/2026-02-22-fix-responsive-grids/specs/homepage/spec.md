## MODIFIED Requirements

### Requirement: WhatWeDo section layout
The WhatWeDo section SHALL display its 4 service cards in a responsive grid: 1 column on mobile, 2 columns on tablet (`md:`), 4 columns on desktop (`lg:`).

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** service cards display in a single column

#### Scenario: Tablet viewport
- **WHEN** viewport is between 768px and 1023px
- **THEN** service cards display in 2 columns

#### Scenario: Desktop viewport
- **WHEN** viewport is 1024px or greater
- **THEN** service cards display in 4 columns

### Requirement: HowWeWork section layout
The HowWeWork section SHALL display its 3 process step cards in a responsive grid: 1 column on mobile, 2 columns on tablet, 3 columns on desktop.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** process cards display in a single column

#### Scenario: Desktop viewport
- **WHEN** viewport is 1024px or greater
- **THEN** process cards display in 3 columns

### Requirement: WhoItsFor section layout
The WhoItsFor section SHALL display its 4 audience cards in a responsive grid: 1 column on mobile, 2 columns on tablet, 4 columns on desktop.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** audience cards display in a single column

#### Scenario: Desktop viewport
- **WHEN** viewport is 1024px or greater
- **THEN** audience cards display in 4 columns

### Requirement: SocialProof section layout
The SocialProof section SHALL display its 4 stat cards in a responsive grid: 2 columns on mobile, 2 columns on tablet, 4 columns on desktop.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** stat cards display in 2 columns

#### Scenario: Desktop viewport
- **WHEN** viewport is 1024px or greater
- **THEN** stat cards display in 4 columns

### Requirement: WhyNumber6 section layout
The WhyNumber6 differentiator cards SHALL display their icon and text content stacked on mobile and side-by-side on tablet and above.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** icon and text stack vertically with reduced gap
