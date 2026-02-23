## Why

The site has no FAQ page, which is a high-value target for AI Overviews, ChatGPT, and Perplexity citations. The GEO analysis (Feb 2026) flagged FAQPage schema as missing and identified it as one of the top changes for improving AI search visibility and capturing informational queries from SMB decision-makers.

## What Changes

- New `/faq` route (`src/pages/faq.astro`) with a simple layout using shared Header and Footer
- 20 question-and-answer pairs drawn from existing site content (services, about, blog, pricing philosophy)
- FAQPage JSON-LD schema injected into the page head
- Navigation link to FAQ added in the site header

## Capabilities

### New Capabilities
- `faq-page`: Standalone FAQ page at `/faq` with 20 Q&As, structured FAQPage schema, and site navigation integration

### Modified Capabilities
- `structured-data`: FAQPage schema type added; existing structured-data spec extended to cover FAQ markup rules

## Impact

- New file: `src/pages/faq.astro`
- Modified: `src/components/Header.astro` (add nav link)
- Modified: `src/layouts/BaseLayout.astro` or FAQ page head (inject FAQPage schema)
- No new dependencies or breaking changes
