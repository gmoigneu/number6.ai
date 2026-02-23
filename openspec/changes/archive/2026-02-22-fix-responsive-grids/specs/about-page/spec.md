## MODIFIED Requirements

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
