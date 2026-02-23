## MODIFIED Requirements

### Requirement: LegalLayout sidebar responsive
The legal page layout with TOC sidebar and content SHALL stack the sidebar above content on mobile. The sidebar SHALL not be sticky on mobile.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** TOC sidebar displays above the content as full-width, without sticky positioning

#### Scenario: Desktop viewport
- **WHEN** viewport is 1024px or greater
- **THEN** TOC sidebar displays at fixed width beside content with sticky positioning
