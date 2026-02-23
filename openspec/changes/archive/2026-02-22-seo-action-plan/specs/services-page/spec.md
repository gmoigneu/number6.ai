## ADDED Requirements

### Requirement: Service structured data on services page
The services page SHALL include Service JSON-LD schemas for all service offerings. Each service SHALL have `@type: "Service"`, name, description, provider (Organization reference), and offers with priceSpecification including price, priceCurrency (USD), and unitText where applicable.

#### Scenario: Service schemas render
- **WHEN** the `/services` page loads
- **THEN** the page contains `<script type="application/ld+json">` with Service objects for AI Kickstart, AI Foundations, AI Coaching, Team Training, AI Readiness Index, AI Strategy & Roadmap, AI Workflow Audit, AI Pilot Project, Custom AI Agent, RAG Knowledge System, Advisory Retainer (Essentials), Advisory Retainer (Growth), and Managed AI Services

### Requirement: Services page breadcrumb schema
The services page SHALL include BreadcrumbList JSON-LD with: Home > Services & Pricing.

#### Scenario: Services breadcrumb renders
- **WHEN** the `/services` page loads
- **THEN** the page contains BreadcrumbList JSON-LD with two items
