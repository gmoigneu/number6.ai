## ADDED Requirements

### Requirement: Contact page breadcrumb schema
The contact page SHALL include BreadcrumbList JSON-LD with: Home > Contact.

#### Scenario: Contact breadcrumb renders
- **WHEN** the `/contact` page loads
- **THEN** the page contains BreadcrumbList JSON-LD with two items

### Requirement: Contact page improved title
The contact page title SHALL be descriptive: "Get in Touch - Book a Free AI Discovery Call | number6.ai" instead of "Contact | number6.ai".

#### Scenario: Contact page has descriptive title
- **WHEN** the `/contact` page loads
- **THEN** the `<title>` is "Get in Touch - Book a Free AI Discovery Call | number6.ai"
