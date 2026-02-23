## ADDED Requirements

### Requirement: Mobile hamburger menu button
The Header SHALL display a hamburger menu button that is visible only on viewports below the `md` breakpoint (768px). The button SHALL be hidden on desktop viewports.

#### Scenario: Hamburger visible on mobile
- **WHEN** the viewport is narrower than 768px
- **THEN** a hamburger icon button is visible in the Header and the desktop nav links are hidden

#### Scenario: Hamburger hidden on desktop
- **WHEN** the viewport is 768px or wider
- **THEN** the hamburger icon button is hidden and the desktop nav links are visible

### Requirement: Mobile menu overlay
When the hamburger button is clicked, the Header SHALL display a full-screen overlay menu with dark background (`#1A1A1A`) containing the navigation links (Services, About, Blog, Contact) and the "BOOK A CALL" CTA button, stacked vertically and centered.

#### Scenario: Menu opens on tap
- **WHEN** the user taps the hamburger button
- **THEN** a full-screen overlay appears with navigation links and CTA

#### Scenario: Menu closes on link tap
- **WHEN** the user taps a navigation link in the mobile menu
- **THEN** the overlay closes and the user navigates to the selected page

#### Scenario: Menu closes on close button
- **WHEN** the user taps the close (X) button in the mobile menu
- **THEN** the overlay closes

### Requirement: Mobile nav uses vanilla JS
The mobile navigation toggle SHALL be implemented with a small inline `<script>` tag in the Header component, not with React hydration. The nav links SHALL always be present in the DOM for crawlability.

#### Scenario: No React hydration for nav
- **WHEN** the Header component renders
- **THEN** it ships zero React JavaScript; the toggle uses a vanilla JS script
