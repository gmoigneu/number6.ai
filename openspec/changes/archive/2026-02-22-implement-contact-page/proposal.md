## Why

The site's `/contact` route is not yet implemented. Visitors currently have no way to reach out, book a discovery call, or send a message through the website. The contact page is a core conversion point for the agency — it needs to ship before the site can effectively generate leads.

## What Changes

- Add `/contact` page with 8 sections matching the Pencil design: Hero, Contact Options (3 cards), Contact Form, What to Expect (3 steps), FAQ (5 accordion items), Locations (Houston + Manchester), Final CTA, and shared Header/Footer
- Integrate Web3Forms as the form submission backend (access key: `9fdad137-5a11-472b-9fe0-cb423b0a51bd`) — free tier, 250 submissions/month, works with static sites on GitHub Pages
- Form fields: name (required), email (required), company name, company size (dropdown), interest checkboxes (5 options), message textarea, referral source dropdown
- Interactive React components for: FAQ accordion, contact form with client-side validation and AJAX submission, interest checkbox toggles
- Static Astro components for all non-interactive sections (Hero, Contact Options, What to Expect, Locations, Final CTA)

## Capabilities

### New Capabilities
- `contact-page`: Contact page layout, sections, and routing at `/contact`
- `contact-form`: Interactive contact form with Web3Forms integration, validation, and submission handling

### Modified Capabilities
_(none — no existing spec requirements change)_

## Impact

- **New files**: `src/pages/contact.astro`, multiple section components in `src/components/sections/`, React form component(s) in `src/components/`
- **Dependencies**: No new npm packages required (Web3Forms uses a standard fetch POST, no SDK needed)
- **Existing code**: No changes to existing components or pages; uses shared `BaseLayout.astro`, `Header.astro`, `Footer.astro`
- **External service**: Web3Forms free tier (250 submissions/month, submissions forwarded to configured email)
