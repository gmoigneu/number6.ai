## MODIFIED Requirements

### Requirement: Footer component
The Footer SHALL be an Astro component with:
- Top row: Brand column (logo + tagline "AI consulting for the real world. Houston, TX · Manchester, UK") and link columns (Services, Company, Connect)
- Divider: 1px line in `#333`
- Bottom row: Copyright "© 2026 number6.ai. All rights reserved." and legal links (Privacy Policy, Terms of Service)

The Footer SHALL have a dark (`#1A1A1A`) background with vertical layout and `px-16 pt-16 pb-10` padding.

The Footer legal links SHALL point to:
- "Privacy Policy" → `/privacy`
- "Terms of Service" → `/terms`

#### Scenario: Footer renders correctly
- **WHEN** any page using BaseLayout loads
- **THEN** the Footer appears at the bottom with all columns and legal text

#### Scenario: Footer link columns
- **WHEN** the user views the Footer
- **THEN** they see three columns: Services (AI Training, AI Strategy, Custom AI Solutions, AI Partnership), Company (About, Blog, Contact), Connect (LinkedIn, Email, Book a Call)

#### Scenario: Footer legal links navigate to legal pages
- **WHEN** the user clicks "Privacy Policy" in the Footer
- **THEN** they navigate to `/privacy`

#### Scenario: Footer terms link navigates to terms page
- **WHEN** the user clicks "Terms of Service" in the Footer
- **THEN** they navigate to `/terms`
