## ADDED Requirements

### Requirement: FAQPage schema on the FAQ page
The FAQ page SHALL include a FAQPage JSON-LD schema injected via `SchemaOrg.astro`. The schema MUST include a `mainEntity` array with one `Question` object per FAQ item. Each `Question` SHALL have: `@type: "Question"`, `name` (the question text), and `acceptedAnswer` with `@type: "Answer"` and `text` (the full answer text).

#### Scenario: FAQPage schema renders on /faq
- **WHEN** the `/faq` page loads
- **THEN** the page contains a JSON-LD script with `@type: "FAQPage"` and a `mainEntity` array of 20 Question objects

#### Scenario: Each Question has a valid acceptedAnswer
- **WHEN** the FAQPage schema is parsed
- **THEN** every item in `mainEntity` has `@type: "Question"`, a non-empty `name`, and an `acceptedAnswer` with `@type: "Answer"` and non-empty `text`
