## ADDED Requirements

### Requirement: FAQ page route exists at /faq
A page at `src/pages/faq.astro` SHALL render at the `/faq` route using `BaseLayout.astro` with the site Header and Footer.

#### Scenario: FAQ page is accessible
- **WHEN** a user navigates to `/faq`
- **THEN** the page renders with the standard site header and footer

#### Scenario: FAQ page has correct title and meta description
- **WHEN** the FAQ page loads
- **THEN** the `<title>` is "Frequently Asked Questions | number6.ai" and the meta description summarises the FAQ page content

### Requirement: FAQ page displays 20 Q&A pairs
The FAQ page SHALL display exactly 20 question-and-answer pairs as static visible HTML. All answers MUST be visible in the HTML without JavaScript execution.

The 20 Q&As SHALL cover the following topics and use the following content:

1. **Q: What is AI consulting?**
   A: AI consulting means working with an external expert to help your business understand, adopt, and benefit from artificial intelligence. At number6, that typically means one of four things: training your team to use AI tools effectively, assessing where AI will genuinely help your business, building a custom AI solution for a specific workflow, or acting as an ongoing AI partner as the technology evolves.

2. **Q: What is the number6 AI Readiness Index™?**
   A: The number6 AI Readiness Index™ is our proprietary evaluation framework. It assesses a business across six dimensions — people, process, data, technology, leadership, and culture — to produce a prioritised roadmap. Unlike generic AI readiness reports, the output is a clear action plan with real costs and timelines, showing exactly where AI will have the most impact and what to do first. A typical assessment takes two to three weeks.

3. **Q: Do you publish your prices?**
   A: Yes. We publish our packages and pricing openly on the site. Most AI consultancies hide their rates and make you sit through a discovery call before revealing costs. We think you deserve to know what things cost before the first conversation.

4. **Q: How long does a typical engagement take?**
   A: Most clients see a working solution within 30 to 90 days of the initial discovery call. AI Foundations training can be delivered in a single day or spread across a few weeks. Strategy assessments typically take two to three weeks. Custom AI builds depend on complexity but rarely exceed 90 days for an initial deployment.

5. **Q: How does the process work?**
   A: Every engagement starts with a free 30-minute discovery call where we listen to your situation. We then produce an honest plan — identifying where AI will genuinely help and where it won't, with real costs and timelines. We build alongside your team and train them as we go. When we leave, the solution keeps working and your people know how to run it.

6. **Q: Do you work with small and mid-size businesses?**
   A: Yes. Our typical clients have between 10 and 500 employees — large enough to benefit from AI, nimble enough to actually adopt it. We focus specifically on SMBs because they move faster, make decisions more quickly, and tend to get more value from AI implementations than large enterprises with lengthy procurement cycles.

7. **Q: Where are you based? Do you work internationally?**
   A: We are based in Houston, TX (Americas) and Manchester, UK (Europe). We serve clients across the US, UK, and EU with overlapping hours that cover most business timezones. The work is predominantly remote, with on-site options available.

8. **Q: What's the difference between AI training and AI strategy?**
   A: AI training focuses on your team's ability to use AI tools day-to-day — workshops, coaching, and hands-on practice that take people from "what is this?" to actually using it. AI strategy focuses on your business's readiness to adopt AI at a structural level — identifying the right opportunities, the right tools, and the right order to pursue them. Most clients benefit from both.

9. **Q: Will AI replace our employees?**
   A: In most SMB contexts, AI replaces tasks, not people. The businesses that get the most from AI are the ones that retrain their teams to work alongside it rather than treating it as a headcount-reduction tool. We train your team as part of every project because the goal is AI adoption, not AI dependence.

10. **Q: Do we need to be technical to work with you?**
    A: No. We explain everything in plain English. You do not need to understand how large language models work to benefit from them. Our job is to translate between what the technology can do and what your business actually needs.

11. **Q: What industries do you work with?**
    A: We work across professional services (law firms, accountancies, consultancies), marketing and creative agencies, operations-heavy businesses (logistics, manufacturing, field services), and tech-forward SMBs. If your team does repetitive knowledge work, we can likely help — AI doesn't care about industry verticals.

12. **Q: What is a RAG-powered knowledge base?**
    A: RAG stands for Retrieval-Augmented Generation. A RAG-powered knowledge base is an AI system that can search and reason over your specific documents, policies, or data — not just generic internet knowledge. Instead of staff searching through shared drives or asking colleagues, they ask the system and it retrieves the right answer from your actual content.

13. **Q: What does "Fractional Chief AI Officer" mean?**
    A: A Fractional Chief AI Officer is an ongoing AI partnership where we act as your embedded AI expert without the full-time cost. We monitor your AI tools, keep your team up to date as the technology changes, and help you identify new opportunities as your business grows. It's for businesses that want to stay ahead of AI without hiring a full-time technical leader.

14. **Q: Do you build custom tools or use off-the-shelf AI products?**
    A: Both, depending on what solves the problem. Off-the-shelf AI tools (ChatGPT, Notion AI, Copilot, etc.) are often the right answer — faster to deploy and lower cost. Custom builds make sense when a specific workflow needs automation that no existing tool covers, or when your business has unique data that gives a custom system a significant advantage.

15. **Q: Why do most AI projects fail?**
    A: The most common failure mode is starting with "we need to use AI" instead of "we have a problem that might be solvable with AI." Other frequent causes: skipping baseline measurement so you can't prove ROI, choosing tools based on hype rather than fit, and not involving end users until it's too late. A good AI problem statement is specific enough to measure, painful enough to justify investment, and repetitive enough to benefit from automation.

16. **Q: How do you measure success?**
    A: We track actual usage and time data with clients during and after deployment. Across our engagements, businesses that complete a number6 AI implementation typically save five to ten hours per employee per week on the targeted process. We define success before we start — measurable outcomes agreed in advance, not demo performance.

17. **Q: What happens after the engagement ends?**
    A: At the end of every engagement, your team knows how to run the solution we built. We don't create dependency. If you want ongoing support, our AI Partnership model provides that — but it's an option, not a requirement. 80% of clients return for additional projects after their first engagement.

18. **Q: How are you different from other AI consultancies?**
    A: Three things stand out. First, we publish our prices. Second, we'll tell you honestly when AI isn't the right answer for your problem. Third, you work directly with the senior people who built your solution — no junior handoff, no account managers in the middle. We're a two-person team with years of AI engineering experience, and that's exactly what you get.

19. **Q: What size team do you typically train?**
    A: Typical engagements train between 8 and 25 team members. Sessions can be delivered as a full-day workshop, half-day deep dives by department, or a series of shorter coaching sessions spread over several weeks — depending on what fits your team's schedule.

20. **Q: How do I get started?**
    A: Book a free 30-minute discovery call. No sales pressure, no pitch deck. We'll ask about your business and what you're trying to solve, and tell you honestly whether we can help and what it would cost.

#### Scenario: All 20 Q&As render as visible HTML
- **WHEN** the FAQ page loads
- **THEN** all 20 questions and their answers are present in the HTML source without requiring JavaScript

#### Scenario: Questions are visually distinct from answers
- **WHEN** a user reads the FAQ page
- **THEN** questions are visually styled differently from answers (e.g., bolder or larger text)

### Requirement: FAQ page includes breadcrumb navigation
The FAQ page SHALL include a breadcrumb navigation element (Home > FAQ) consistent with other inner pages.

#### Scenario: Breadcrumb renders on FAQ page
- **WHEN** the FAQ page loads
- **THEN** a breadcrumb showing Home > FAQ is present in the page

### Requirement: FAQ link in site navigation
The site Header.astro SHALL include a "FAQ" link after the "Blog" link in both desktop and mobile navigation.

#### Scenario: FAQ appears in desktop nav
- **WHEN** a user views any page on a desktop viewport
- **THEN** the header nav includes a "FAQ" link pointing to `/faq`

#### Scenario: FAQ appears in mobile nav
- **WHEN** a user opens the mobile menu
- **THEN** the mobile menu includes a "FAQ" link pointing to `/faq`
