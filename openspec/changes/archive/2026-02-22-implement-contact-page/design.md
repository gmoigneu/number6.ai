## Context

The site is an Astro 5 static site with React islands, deployed to GitHub Pages. Existing pages (homepage, about, services, blog, legal) follow a consistent pattern: an Astro page file in `src/pages/` composing section components from `src/components/sections/`, all wrapped in `BaseLayout.astro`. Static sections use `.astro` components; interactive elements use React `.tsx` with `client:` directives.

The contact page design (from Pencil) has 8 sections. Most are static content. Two require client-side interactivity: the contact form (validation, AJAX submission, state feedback) and the FAQ accordion (expand/collapse).

## Goals / Non-Goals

**Goals:**
- Implement the full contact page matching the Pencil design
- Integrate Web3Forms for form submissions via fetch POST (no SDK)
- Client-side form validation with inline error messages
- AJAX form submission with success/error states (no page redirect)
- FAQ accordion with expand/collapse behavior
- Follow existing project patterns (Astro sections, React islands, Tailwind with CSS variables)

**Non-Goals:**
- hCaptcha/spam protection (can be added later if spam becomes an issue)
- Server-side validation (static site — Web3Forms handles this)
- Analytics/tracking on form submissions
- A/B testing on form variants
- Auto-responder emails (Web3Forms pro feature)

## Decisions

### 1. Component architecture — Astro sections + two React islands

**Decision:** Use `.astro` components for all static sections, React `.tsx` for the contact form and FAQ accordion only.

**Rationale:** Follows the existing islands architecture pattern. Only the form and FAQ need client-side JS. Everything else ships as zero-JS HTML.

**Files:**
- `src/pages/contact.astro` — page shell
- `src/components/sections/contact/ContactHero.astro` — hero section
- `src/components/sections/contact/ContactOptions.astro` — 3 option cards
- `src/components/sections/contact/ContactFormSection.astro` — dark wrapper around the React form
- `src/components/sections/contact/ContactForm.tsx` — React form island (`client:visible`)
- `src/components/sections/contact/WhatToExpect.astro` — 3-step process
- `src/components/sections/contact/ContactFaq.tsx` — React FAQ accordion (`client:visible`)
- `src/components/sections/contact/ContactLocations.astro` — Houston + Manchester cards
- `src/components/sections/contact/ContactCta.astro` — terracotta final CTA

### 2. Form submission — direct fetch to Web3Forms API

**Decision:** POST form data as JSON to `https://api.web3forms.com/submit` with the access key in the request body. Handle success/error in React state.

**Rationale:** No SDK needed. The access key is designed to be public (safe in client-side code). JSON POST gives us structured control over the submission and response handling.

**Alternatives considered:**
- HTML form action (simpler, but causes page redirect — poor UX)
- Web3Forms React hook library (`use-web3forms`) — unnecessary dependency for a single form

### 3. Form validation — native HTML + lightweight React state

**Decision:** Use HTML5 `required` attributes for basic validation, plus React state for custom validation messages (email format, minimum message length). Show inline errors below each field.

**Rationale:** Keeps the implementation simple. No form library needed for a single form with 7 fields.

**Alternatives considered:**
- React Hook Form — overkill for one form, adds a dependency
- Zod validation — good for complex schemas, unnecessary here

### 4. FAQ accordion — React component with local state

**Decision:** Single React component managing an array of FAQ items with expand/collapse via `useState`. Only one item open at a time.

**Rationale:** Simple state management, no external library needed. The FAQ has 5 static items — the data can be hardcoded in the component.

### 5. Web3Forms access key — hardcoded in the React component

**Decision:** Embed the access key directly in the form component source code.

**Rationale:** Web3Forms access keys are explicitly designed to be public and client-side safe. There is no security benefit to using environment variables — the key is visible in the browser's network requests regardless. Keeping it in the source avoids build-time environment variable configuration complexity on GitHub Pages.

## Risks / Trade-offs

- **[Web3Forms free tier limits]** 250 submissions/month cap → Mitigation: Well above expected volume (10-50/month). Monitor via Web3Forms dashboard. Upgrade to pro ($4/month) if needed.
- **[No spam protection initially]** Skipping hCaptcha for launch → Mitigation: Web3Forms has basic bot filtering. Add hCaptcha later if spam appears. The honeypot hidden field technique can be added cheaply.
- **[30-day data retention on free tier]** Submissions older than 30 days are deleted → Mitigation: Submissions are emailed immediately. Set up a Google Sheets integration via Web3Forms if archival is needed.
- **[No offline/error recovery]** If Web3Forms is down, submissions fail → Mitigation: Show a clear error message with a fallback email address (hello@number6.ai).
