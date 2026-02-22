## 1. Page Shell & Static Sections

- [x] 1.1 Create `src/pages/contact.astro` with BaseLayout and all section imports
- [x] 1.2 Create `src/components/sections/contact/ContactHero.astro` — hero with label, headline, subtext, divider
- [x] 1.3 Create `src/components/sections/contact/ContactOptions.astro` — 3 option cards (Discovery Call dark, Send Message light, Email light)
- [x] 1.4 Create `src/components/sections/contact/WhatToExpect.astro` — 3 numbered steps with terracotta top borders
- [x] 1.5 Create `src/components/sections/contact/ContactLocations.astro` — Houston + Manchester cards with note

## 2. Contact Form (React Island)

- [x] 2.1 Create `src/components/sections/contact/ContactFormSection.astro` — dark wrapper with label, headline, subtext, and React island mount
- [x] 2.2 Create `src/components/sections/contact/ContactForm.tsx` — form fields (name, email, company name, company size dropdown, interest checkboxes, message textarea, referral dropdown)
- [x] 2.3 Add interest checkbox toggle behavior — terracotta selected state, multi-select
- [x] 2.4 Add client-side validation — required name/email, email format, inline error messages that clear on input
- [x] 2.5 Add Web3Forms fetch POST submission — JSON body with access key, loading/success/error states
- [x] 2.6 Add success state — replace form with thank-you message on successful submission

## 3. FAQ Accordion (React Island)

- [x] 3.1 Create `src/components/sections/contact/ContactFaq.tsx` — 5 FAQ items with expand/collapse, beige background, plus/minus icons
- [x] 3.2 Implement single-item-open behavior — clicking an item closes the previously open one, clicking an open item closes it

## 4. Final CTA

- [x] 4.1 Create `src/components/sections/contact/ContactCta.astro` — terracotta background CTA with booking button

## 5. Responsive & Polish

- [x] 5.1 Add responsive styles — stack multi-column layouts (options, steps, locations) to single-column below 768px
- [x] 5.2 Visual review — verify all sections match the Pencil design (colors, spacing, typography)
