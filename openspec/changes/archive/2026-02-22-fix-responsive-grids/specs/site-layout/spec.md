## MODIFIED Requirements

### Requirement: Footer responsive layout
The footer SHALL stack its content vertically on mobile. The top row (brand + link columns), link columns themselves, and bottom row (copyright + legal links) SHALL all stack on mobile.

#### Scenario: Footer top row on mobile
- **WHEN** viewport is less than 768px
- **THEN** brand column and link columns stack vertically

#### Scenario: Footer link columns on mobile
- **WHEN** viewport is less than 768px
- **THEN** the 3 link column groups stack vertically

#### Scenario: Footer bottom row on mobile
- **WHEN** viewport is less than 768px
- **THEN** copyright text and legal links stack vertically with centered alignment

#### Scenario: Footer on desktop
- **WHEN** viewport is 768px or greater
- **THEN** footer displays with horizontal layout as designed
