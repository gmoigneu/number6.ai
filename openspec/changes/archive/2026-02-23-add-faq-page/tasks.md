## 1. FAQ Page

- [x] 1.1 Create `src/pages/faq.astro` using `BaseLayout.astro` with title "Frequently Asked Questions | number6.ai" and appropriate meta description
- [x] 1.2 Define the 20 Q&A pairs as a typed array in the page frontmatter script
- [x] 1.3 Implement the page layout: hero/heading section, then the Q&A list with visually distinct question and answer styling using brand Tailwind classes
- [x] 1.4 Add breadcrumb markup (Home > FAQ) consistent with other inner pages

## 2. FAQPage Schema

- [x] 2.1 Build the FAQPage JSON-LD schema object from the Q&A array (map each item to a `Question` with `acceptedAnswer`)
- [x] 2.2 Inject the schema via `<SchemaOrg schemas={[breadcrumbSchema, faqSchema]} />` in the page head slot
- [x] 2.3 Build and verify the JSON-LD renders correctly in page source (no JS required)

## 3. Navigation Update

- [x] 3.1 Add "FAQ" link after "Blog" in the desktop nav in `src/components/Header.astro`
- [x] 3.2 Add "FAQ" link after "Blog" in the mobile menu in `src/components/Header.astro`
