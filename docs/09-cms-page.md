# number6.ai — Base CMS Page Template

> **Note for designer/developer:** This document defines the base template for simple content pages — legal documents, policies, informational pages, and any other text-heavy pages that don't need a custom layout. The Terms & Conditions below serves as the example content. Additional pages (Privacy Policy, Cookie Policy, etc.) will follow this same template.

---

## Template Overview

### Purpose
A clean, readable template for long-form text content that doesn't warrant a custom page design. Used for:
- Terms & Conditions
- Privacy Policy
- Cookie Policy
- Acceptable Use Policy
- Any future informational or legal pages

### Design principles
- **Content is king.** No hero sections, no illustrations, no decorative elements. Just well-typeset text.
- **Scannable.** Clear heading hierarchy, generous spacing, and a table of contents for longer documents.
- **Consistent.** Same typography and spacing as blog articles — if someone reads both, they should feel like the same site.
- **Functional.** These pages exist to inform. Prioritize clarity over personality.

---

## Page Layout

### Header
- Page title (H1) — large, clear
- Subtitle or description line — optional, brief context for what the page is
- **Last updated date** — required for legal pages. Format: "Last updated: February 22, 2026"
- Breadcrumb navigation (optional): Home > Terms & Conditions

### Table of Contents
- Auto-generated from H2 headings
- Displayed at the top of the page, below the header
- Sticky sidebar TOC on desktop for longer pages (same component as blog articles)
- Collapsible on mobile

### Body content
- Same typography system as blog articles: 18-20px body, generous line-height, readable measure
- Must support all the same content elements as blog articles (headings, lists, bold/italic, links, tables, blockquotes)
- Code blocks are unlikely but should be supported
- No in-article CTAs or newsletter signups — these are functional pages, not marketing content

### Footer
- Standard site footer
- No article-specific elements (no author box, no related articles, no share buttons)
- Consider a subtle "back to top" link at the end of long documents

---

## Content Management

### Required frontmatter fields

```yaml
title: "Terms & Conditions"
description: "The terms governing your use of number6.ai"  # optional, for meta description
date: 2026-02-22  # publication date
updated: 2026-02-22  # last revision date, shown on page
layout: "cms"  # signals use of the base CMS template
draft: false
```

### Page creation
CMS pages are Markdown or MDX files in a dedicated directory (e.g., `src/content/pages/` or `src/pages/legal/`). No special content collection needed — standard Astro file-based routing is sufficient.

---

## SEO & Meta Content (Template)

### Pattern
- `<title>`: [Page Title] — number6.ai
- `<meta name="description">`: [description from frontmatter or first 160 chars]
- `<meta name="robots">`: `noindex, follow` for legal pages (optional — keeps legal pages out of search results while allowing link equity to flow). Informational pages can be indexed normally.
- `<link rel="canonical">`: Full page URL

### Structured data
No specific schema required for legal/CMS pages. Standard `WebPage` schema if needed.

---

## Example Content: Terms & Conditions

> **Note:** This is working-draft content, not legal advice. Should be reviewed by a qualified attorney before publication. It covers the key areas needed for a consulting services website.

---

### Page title
**Terms & Conditions**

### Last updated
February 22, 2026

---

### 1. Introduction

Welcome to number6.ai. These Terms & Conditions ("Terms") govern your use of the number6.ai website and any services provided by number6.ai ("we," "us," "our").

By accessing our website or engaging our services, you agree to these Terms. If you don't agree, please don't use the site or our services.

We keep these Terms in plain language because we believe you deserve to understand what you're agreeing to. If anything is unclear, email us at hello@number6.ai and we'll explain.

---

### 2. Who We Are

number6.ai is an AI consulting practice operated by [Legal Entity Name], with team members based in Houston, Texas (United States) and Manchester (United Kingdom).

- **US contact:** hello@number6.ai
- **UK contact:** hello@number6.ai

---

### 3. Our Services

We provide AI consulting services including but not limited to: training and workshops, AI strategy and readiness assessments, custom AI solution development, and ongoing advisory services.

**What our website is:** An informational resource and a way to get in touch with us. Content on our site (including blog articles) represents our professional opinions and general guidance. It is not a substitute for professional advice tailored to your specific situation.

**What our website isn't:** A guarantee of results. While we share real-world examples and typical outcomes, every business is different. Specific outcomes from our services are discussed and agreed in individual service agreements.

---

### 4. Service Agreements

Our published prices and service descriptions provide a starting point. The specific terms of any engagement — including scope, deliverables, timeline, and fees — are confirmed in a separate service agreement or statement of work before any paid work begins.

These Terms apply alongside (but do not replace) any specific service agreement you sign with us.

---

### 5. Intellectual Property

**Our content:** All content on number6.ai — including text, images, illustrations, code examples, and design — is owned by us or our licensors and protected by copyright. You may share and link to our blog articles with attribution. You may not reproduce, distribute, or create derivative works from our content without written permission.

**Your content:** Any information, documents, or data you share with us during an engagement remains yours. We treat all client materials as confidential. Specific IP ownership for work products (e.g., custom AI solutions built for you) is defined in your service agreement.

**AI-generated content:** Some of our blog content may be drafted with AI assistance and reviewed and edited by our team. We stand behind all published content regardless of how the first draft was created.

---

### 6. Website Use

You may use our website for its intended purpose: learning about our services, reading our content, and contacting us.

You may not:
- Use the site for any unlawful purpose
- Attempt to gain unauthorized access to our systems
- Scrape or bulk-download our content
- Use our site to transmit malware or harmful code
- Misrepresent your identity when contacting us

---

### 7. Privacy & Data

How we collect, use, and protect your personal data is described in our [Privacy Policy](/privacy). By using our website and services, you acknowledge that you've read and understood our Privacy Policy.

**Short version:** We collect minimal data. We don't sell your information. We use privacy-respecting analytics. We treat your data the way we'd want ours treated.

---

### 8. Cookies

Our cookie practices are described in our [Cookie Policy](/cookies). We use only essential and analytics cookies — no advertising or tracking cookies.

---

### 9. Disclaimers

**General advice vs. professional advice:** Content on our website, including blog articles, is provided for general informational purposes. It does not constitute professional advice. For advice specific to your business, engage our services or consult with a qualified professional.

**No guarantees of outcomes:** While we share typical results and case studies, we do not guarantee specific outcomes from our services. AI solutions are complex, and results depend on many factors including data quality, team engagement, and business context.

**Third-party tools:** We may recommend third-party AI tools and platforms (e.g., OpenAI, Anthropic, Google). We are not responsible for the performance, availability, or terms of service of third-party tools. We do not receive referral fees or commissions from tool vendors.

**Availability:** We aim to keep our website available at all times, but we don't guarantee uninterrupted access. We may take the site down for maintenance without notice.

---

### 10. Limitation of Liability

To the maximum extent permitted by law, number6.ai's total liability for any claim arising from your use of our website is limited to the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.

We are not liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or business interruption.

This limitation does not apply where prohibited by law, and does not affect any rights you have as a consumer that cannot be waived or limited by contract.

---

### 11. Indemnification

You agree to indemnify and hold number6.ai harmless from any claims, damages, or expenses (including reasonable attorney fees) arising from your violation of these Terms or your misuse of our website or services.

---

### 12. Governing Law

**For US-based clients:** These Terms are governed by the laws of the State of Texas, without regard to conflict of law provisions.

**For UK/EU-based clients:** These Terms are governed by the laws of England and Wales.

If you are a consumer, nothing in these Terms affects your statutory rights under the consumer protection laws of your country of residence.

---

### 13. Changes to These Terms

We may update these Terms from time to time. When we do, we'll update the "Last updated" date at the top of this page. For significant changes, we'll make reasonable efforts to notify you (e.g., via a notice on our website).

Your continued use of our website after changes are posted constitutes acceptance of the updated Terms.

---

### 14. Contact Us

Questions about these Terms? We're happy to explain.

**Email:** hello@number6.ai
**Website:** number6.ai/contact

---

## Additional CMS Pages to Create (Future)

These pages should use the same base CMS template. Content briefs to follow:

1. **Privacy Policy** — How we collect, use, and protect personal data. Covers both US and UK/EU requirements (including GDPR). Should be written in the same plain-language style.

2. **Cookie Policy** — What cookies we use and why. Should be minimal given our privacy-respecting analytics approach.

3. **Acceptable Use Policy** — If/when we offer client-facing AI tools. Governs appropriate use of AI solutions we build.

---

## Writing & Design Notes

1. **Plain language, always.** Legal pages don't have to be impenetrable. Write them in the same warm, clear voice as the rest of the site. The law firm can review for legal accuracy while keeping the language accessible.

2. **Last updated date is critical.** For legal pages, always display the last updated date prominently. It builds trust and is required in many jurisdictions.

3. **Print-friendly.** These are among the most-printed pages on any website. Ensure the print stylesheet handles them well.

4. **No marketing.** No CTAs, no newsletter signups, no "related services" blocks. These pages build trust precisely because they don't try to sell anything.

5. **Consistent URL structure.** Suggest: `/terms`, `/privacy`, `/cookies`. Clean, predictable, easy to reference.

6. **Dual jurisdiction.** Since number6.ai operates in both the US and UK, legal pages should address both jurisdictions where relevant. The Terms example above handles this with jurisdiction-specific clauses.

7. **Accessible.** These pages need to meet WCAG 2.1 AA like everything else, but pay special attention to reading level. Legal content is already hard to parse — don't add visual complexity on top.
