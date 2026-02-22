## ADDED Requirements

### Requirement: Brand color CSS custom properties
The site SHALL define all brand colors as CSS custom properties in `:root` within `src/styles/global.css`. The following properties SHALL be defined:

| Variable | Value | Usage |
|---|---|---|
| `--background` | `#F5F2ED` | Page background (warm off-white) |
| `--foreground` | `#1A1A1A` | Primary text, dark surfaces |
| `--primary` | `#1A1A1A` | Primary buttons, dark elements |
| `--primary-foreground` | `#F5F2ED` | Text on primary/dark backgrounds |
| `--accent` | `#C45A3B` | Brand terracotta accent |
| `--accent-foreground` | `#F5F2ED` | Text on accent backgrounds |
| `--muted` | `#E8E4DD` | Warm beige section backgrounds |
| `--muted-foreground` | `#888888` | Body text gray |
| `--secondary` | `#1A1A1A` | Dark section backgrounds |
| `--secondary-foreground` | `#999999` | Light text on dark backgrounds |
| `--border` | `#333333` | Borders and dividers |
| `--card` | `#F5F2ED` | Card backgrounds |
| `--card-foreground` | `#1A1A1A` | Card text |

#### Scenario: Colors render correctly
- **WHEN** the homepage loads
- **THEN** all colors match the design specifications from number6.pen

#### Scenario: Variables are used in components
- **WHEN** a component references a brand color
- **THEN** it SHALL use the CSS variable (e.g., `bg-accent`) rather than hardcoded hex values

### Requirement: Font configuration
The site SHALL load Space Grotesk (weights: 400, 600, 700) and Inter (weights: 400, 500) via Google Fonts. The fonts SHALL be available as Tailwind utilities via `--font-heading` (Space Grotesk) and `--font-body` (Inter).

#### Scenario: Fonts load correctly
- **WHEN** the page loads
- **THEN** headings render in Space Grotesk and body text renders in Inter

#### Scenario: Fonts are available as Tailwind classes
- **WHEN** a component uses `font-heading` or `font-body` Tailwind classes
- **THEN** the correct font family is applied

### Requirement: Remove dark mode theme
The `.dark` CSS block SHALL be removed from `global.css`. The site is light-mode only.

#### Scenario: No dark mode
- **WHEN** a user has dark mode preference in their OS
- **THEN** the site still renders in light mode with the brand colors
