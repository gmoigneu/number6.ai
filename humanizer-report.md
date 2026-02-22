# Humanizer Report: number6.ai

Analysis of all user-facing content against Wikipedia's "Signs of AI writing" patterns.

**Scope:** All pages, sections, blog content, and marketing copy.
**Legal pages** (Terms, Privacy, Cookies) are excluded from this review since they use standard legal language by necessity.

---

## Executive Summary

The writing is already better than typical AI output. It has genuine personality, real opinions, and avoids most of the worst AI slop (no "delve," no "tapestry," no "nestled"). However, several structural patterns repeat across the site enough to trigger the "assembled by algorithm" feeling. The biggest issues are:

1. **Rule of three overuse** -- nearly every section groups ideas in threes
2. **"No X. No Y. Just Z." formula** -- used verbatim or near-verbatim in 6+ places
3. **Negative parallelisms** -- "It's not about X. It's about Y." appears throughout
4. **Repetitive CTA language** -- "No pitch, no pressure" appears 4+ times across pages
5. **Promotional adjectives in a few spots** -- "boutique," "deep roots," "genuine investment"

Below is a section-by-section breakdown.

---

## Homepage

### Hero (`src/components/sections/Hero.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Rule of three | "understand, adopt, and build with AI" | Classic triad grouping |
| 2 | Rule of three | "Practically, honestly, and without the buzzwords" | Second triad in same paragraph |
| 3 | Promotional | "we're the partner that makes it stick" | Vague claim without specifics |

**Suggested direction:** Keep one of the triads, break the other into a different rhythm. Replace "makes it stick" with something concrete.

---

### TrustBar (`src/components/sections/TrustBar.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | AI vocabulary | "the tools are vital to compete" | "vital" is a flagged word |

**Minor.** Consider "essential" or restructure.

---

### TheProblem (`src/components/sections/TheProblem.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Repeated parallel structure | "You've seen the headlines. You've heard the promises." | Neat parallel pair |
| 2 | Rule of three | "where to start, what to trust, or how to make it work" | Triad |
| 3 | Rule of three | "their team, their workflows, their budget" | Another triad immediately after |

**Note:** The rhythm here is actually effective, but having two triads back-to-back in one paragraph reinforces the pattern.

---

### WhatWeDo (`src/components/sections/WhatWeDo.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Cliche | "we meet you where you are" | Overused phrase |
| 2 | Promotional | "turn AI confusion into AI confidence" | Sounds like a tagline, not a description |
| 3 | Cliche | "keeps you ahead of the curve" | Stock phrase |
| 4 | Negative parallelism | "All the expertise, none of the full-time salary" | "All the X, none of the Y" |
| 5 | Promotional | "AI tools that work in the real world" | Vague claim |

---

### HowWeWork (`src/components/sections/HowWeWork.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Rule of three | "your business, your team, and your goals" | Triad |
| 2 | Rule of three | "Not with a sales pitch. Not with a pre-built solution looking for a problem." | Paired negations (minor) |
| 3 | Negative parallelism | "We don't just deliver and disappear" | "don't just" pattern |
| 4 | Rule of three | "We build alongside your team, train them as we go, and make sure the solution works" | Triad |
| 5 | Negative parallelism | "for you to need us less, not more" | Minor, but contributes to pattern density |

---

### WhyNumber6 (`src/components/sections/WhyNumber6.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Negative parallelism | "to find the right solution, not to sell you the fanciest one" | |
| 2 | Repetitive sentence openers | "Every project includes... Every engagement ends with..." | Anaphora pattern |

**Note:** This section is otherwise strong. The differentiators feel genuine and specific.

---

### WhoItsFor (`src/components/sections/WhoItsFor.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Parallel pair | "Large enough to benefit from AI, nimble enough to actually adopt it" | Balanced pair, fine on its own but adds to site-wide pattern |

**This section reads well overall.** "AI doesn't care about verticals" is good voice.

---

### SocialProof (`src/components/sections/SocialProof.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Promotional | "high-impact AI opportunities" | "high-impact" is promotional |
| 2 | Promotional | "delivers measurable time savings within 90 days" | Reads like ad copy |

**Note:** The stat ranges (5-10 hrs, 30-90 days, etc.) are good and specific. The quote paragraph before them is the issue.

---

### TheName (`src/components/sections/TheName.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Cliche | "bridging the gap between humans and machines" | "Bridging the gap" is stock phrasing |

**Otherwise this section has good personality.** The "Happy coincidence" line is nice.

---

### FinalCta (`src/components/sections/FinalCta.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Repeated formula | "No pitch, no pressure" | Used in 4+ CTAs across the site |
| 2 | Generic positive | "Just an honest conversation about where you are and where AI might take you" | Vague/aspirational |

---

## About Page

### AboutHero (`src/components/sections/about/AboutHero.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Rule of three variant | "Two people. Two continents. One mission:" | Deliberately structured triad |
| 2 | Promotional | "boutique AI consulting team" | "Boutique" is promotional language |
| 3 | Rule of three | "Practically, honestly, and with zero buzzwords" | Same triad as homepage Hero -- verbatim repeat |

**Issue #3 is notable:** the exact same construction appears on two different pages.

---

### WhatWeBelieve (`src/components/sections/about/WhatWeBelieve.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Inline-header list | All 5 principles use "**X over Y.**" + description format | Systematic inline-header pattern (Pattern #15) |
| 2 | Rule of three | "hours saved, revenue gained, and teams that actually use what we built" | Triad in Principle 2 |
| 3 | Cliche | "move the needle" | Stock business phrase |
| 4 | Rule of three | "their workflows, their comfort level, their daily reality" | Triad in Principle 5 |

**Note:** The "X over Y" structure works conceptually for a principles section, but having 5 consecutive items in the exact same format is a tell. Consider varying the format for 1-2 of them.

---

### OurStory (`src/components/sections/about/OurStory.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Parallel structure | "On one side:... On the other:..." | Formulaic framing |
| 2 | Rule of three | "building technology, deploying it in the real world, and teaching people how to use it" | Triad |
| 3 | Rule of three | "web development, cloud infrastructure, developer advocacy, and AI engineering" | Actually 4 items, fine |
| 4 | Rule of three | "didn't know where to start... couldn't make them stick... couldn't separate the signal from the noise" | Pattern of three failures |
| 5 | Rule of three | "honest about what AI can and can't do, transparent about what it costs, and committed to making sure..." | Triad |
| 6 | Promotional | "a genuine investment in your success" | AI-sounding/promotional |
| 7 | "No X" formula | "No mystique. No 'proprietary AI platform.'" | Repeated formula from elsewhere on site |

**This section has the highest density of rule-of-three patterns on the entire site.** At least 4 triads in 6 paragraphs.

---

### HowWeGotHere (`src/components/sections/about/HowWeGotHere.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Promotional | "deep AI expertise" | "Deep" + "expertise" is promotional |
| 2 | Promotional/dramatic | "becomes impossible to ignore" | Slightly puffed up |
| 3 | False range | "either overpriced enterprise consultancies or under-qualified 'AI gurus'" | Binary framing positions number6 as the obvious middle |

---

### OurTeam (`src/components/sections/about/OurTeam.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Rule of three | "Small team. Big experience. Direct access." | Section heading triad |
| 2 | Rule of three | "No account managers. No junior associates. No outsourced developers." | "No X" triad |
| 3 | Promotional | "deep roots in developer advocacy" | "Deep roots" is promotional |
| 4 | Promotional/vague | "brings years of experience translating complex technology into practical business value" | Classic AI phrasing: "translating X into practical business value" |
| 5 | Rule of three | "spoken at international conferences, worked as a Field CTO, and built solutions" | Triad |
| 6 | Promotional | "The boutique model isn't a limitation. It's a deliberate choice." | "Boutique" again + negative parallelism |
| 7 | Rule of three | "take on fewer clients, deliver higher quality, and actually care about every engagement" | Triad |

**The Houston partner bio** is the weakest section on the site from a humanizer perspective. It reads like it was drafted by an LLM: vague credentials, promotional adjectives, no specific details or personality.

---

### WhyNumber6 - About version (`src/components/sections/about/WhyNumber6.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Cliche | "bridge the gap between AI and the people who work with it" | "Bridge the gap" used for second time on site |
| 2 | Rule of three | "We bridge... We translate... We make the unfamiliar feel familiar." | Three parallel "We" sentences |

---

### WhereWeWork (`src/components/sections/about/WhereWeWork.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Rule of three | "Houston. Manchester. Everywhere in between." | Triad heading |
| 2 | Negative parallelism | "isn't just a flag on a map" | "isn't just" pattern |

---

### AboutCta (`src/components/sections/about/AboutCta.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Repeated formula | "No pitch. No obligation." | Variant of "No pitch, no pressure" used site-wide |
| 2 | Rule of three | "listen to what you're working on, give you our honest take, and figure out if there's a way we can help" | Triad |

---

## Services Page

### ServicesHero (`src/components/sections/services/ServicesHero.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Rule of three | "Transparent pricing. No hidden fees. No surprises." | Title triad |

**Note:** The "89% of competitors" stat is a strong, specific claim. Good.

---

### TrackBuild (`src/components/sections/services/TrackBuild.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Promotional | "These aren't chatbots. They're intelligent digital workers." | "Intelligent digital workers" is marketing-speak |
| 2 | Negative parallelism | "These aren't chatbots. They're..." | "aren't X. They're Y." |

---

### TrackGrow (`src/components/sections/services/TrackGrow.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Negative parallelism | "Like having a Chief AI Officer without the $300K+ salary" | Minor, but adds to pattern count |

---

### HowServicesWork (`src/components/sections/services/HowServicesWork.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Parallel pair | "Four tracks. One clear path." | Structured pair |

---

### ServicesCta (`src/components/sections/services/ServicesCta.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Repeated formula | "No pitch, no pressure" | Same phrase again |

**Note:** The service descriptions and pricing notes are generally clean and factual. This is the strongest page from a humanizer perspective because it's mostly specs and specifics.

---

## Contact Page

### ContactHero (`src/components/sections/contact/ContactHero.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Repeated formula | "No pitch, no pressure. Just a conversation." | Same formula, 4th+ use |

---

### ContactOptions (`src/components/sections/contact/ContactOptions.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Rule of three | "Three ways to get started." | Heading calls it out (there are literally 3 options, so this is fine) |
| 2 | Rule of three | "listen to where you are, share what we've seen work, and give you an honest take" | Triad |
| 3 | Promotional | "We read everything and reply to everyone." | Slightly over-promising |

---

### WhatToExpect (`src/components/sections/contact/WhatToExpect.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Rule of three | Three steps numbered 01, 02, 03 | Structural (intentional, acceptable) |
| 2 | Rule of three | "a proposal, a recommendation, or an honest 'this isn't the right fit'" | Triad within step 3 |
| 3 | Negative parallelism | "not a bot, not an autoresponder" | Minor |
| 4 | Repeated formula | "No slides, no pitch deck. Just a conversation." | "No X. Just Y." pattern again |

---

### ContactFaq (`src/components/sections/contact/ContactFaq.tsx`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Promotional | "across North America, Europe, and beyond" | "And beyond" is vague/puffery |
| 2 | Negative parallelism | "We'd rather be helpful than salesy" | Minor, but adds up |

**Note:** The FAQ answers are generally natural and conversational. Good voice.

---

### ContactCta (`src/components/sections/contact/ContactCta.astro`)

Clean. "There's no expiry on this offer" is a nice, human touch.

---

## Blog

### BlogHero (`src/components/sections/blog/BlogHero.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | "No X" formula | "No hype. No listicles. Just useful ideas" | Same "No X. No Y. Just Z." formula |

---

### Blog Article: "Why Most AI Implementations Fail" (`src/content/blog/why-ai-implementations-fail.md`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | Rule of three | "three patterns" (article premise) | The number itself is fine, but combined with everything below... |
| 2 | Negative parallelism | "aren't the ones with the biggest budgets or the most advanced technology. They're the ones that start with..." | "aren't the ones... They're the ones" |
| 3 | Rule of three | "specific enough to measure, painful enough to justify investment, and repetitive enough to benefit from automation" | Triad |
| 4 | Inline-header list | **Specific:** / **Painful:** / **Repetitive:** | Bolded inline headers (Pattern #15) |
| 5 | AI vocabulary | "The key insight is that..." | "Key insight" is flagged AI vocab |
| 6 | Promotional | "The final pattern is perhaps the most important, and the most frequently ignored." | Puffing up significance |
| 7 | Negative parallelism | "isn't about finding some secret technique... It's about doing the boring fundamentals well" | Same pattern used twice in article |
| 8 | Rule of three | "define the problem, measure the results, and build for the people" | Concluding triad |
| 9 | Negative parallelism | "aren't the ones making the biggest bets. They're the ones making the smartest small ones." | Closing line repeats exact same construction as #2 |

**The closing line and the blockquote use the same "aren't the ones X. They're the ones Y." construction.** Using it once is fine. Using it twice in one article is a pattern.

---

### InArticleCta (`src/components/sections/blog/InArticleCta.astro`)

Clean. Straightforward.

---

### NewsletterSignup (`src/components/sections/blog/NewsletterSignup.astro`)

| # | Pattern | Current text | Issue |
|---|---------|-------------|-------|
| 1 | "No/Zero X" formula | "Zero filler. Unsubscribe anytime." | Minor variant of the site-wide formula |

---

## Cross-Site Patterns

These are the patterns that create a cumulative "AI-generated" feeling even though individual instances may be fine:

### 1. Rule of Three -- 30+ instances across the site

Nearly every section groups ideas into threes. When a reader encounters triad after triad after triad (see what I did there?), the rhythm becomes predictable. The fix isn't to eliminate all triads -- it's to break some into pairs, fours, or single punchy statements.

### 2. "No X. No Y. Just Z." formula -- 6+ instances

Found in: Hero, FinalCta, ServicesCta, ContactHero, WhatToExpect, BlogHero, AboutCta, and variations elsewhere. This is the site's signature formula, and it's overused to the point where it reads as a tic.

| Location | Text |
|----------|------|
| FinalCta | "No pitch, no pressure. Just an honest conversation" |
| ServicesCta | "No pitch, no pressure." |
| ContactHero | "No pitch, no pressure. Just a conversation." |
| WhatToExpect | "No slides, no pitch deck. Just a conversation." |
| AboutCta | "No pitch. No obligation." |
| BlogHero | "No hype. No listicles. Just useful ideas" |
| OurStory | "No mystique. No 'proprietary AI platform.'" |
| HowWeWork heading | "No mystery. No jargon." |

**Recommendation:** Keep 2-3 of the strongest uses. Rewrite the rest with different structures.

### 3. Negative parallelisms -- 10+ instances

"It's not X, it's Y" / "We don't just X" / "aren't the ones X. They're the ones Y."

### 4. "Practically, honestly, and without the buzzwords" -- used verbatim in 2 places

Hero and AboutHero. Identical or near-identical copy across pages makes the whole site feel templated.

### 5. Overuse of "honest" / "honestly" / "genuine" / "genuinely"

These words appear in nearly every section. When everything is described as "honest," the word loses its weight. Show, don't tell.

### 6. The Houston partner bio is conspicuously AI-generated

This stands out as the weakest content: "deep roots in," "brings years of experience translating complex technology into practical business value," "spoken at international conferences." It uses vague credentials and promotional language where every other section on the site uses specifics and personality.

---

## Priority Recommendations

### High priority (most noticeable to readers)

1. **Deduplicate "No pitch, no pressure"** -- pick 2 places, rewrite the rest
2. **Vary the rule-of-three rhythm** -- break 10-15 of the 30+ triads into pairs, single statements, or groups of four
3. **Rewrite the Houston partner bio** -- add specific details, projects, or personality instead of vague credential-speak
4. **Deduplicate "Practically, honestly, and without the buzzwords"** -- use it once on the site, not twice

### Medium priority (pattern-aware readers will notice)

5. **Reduce negative parallelisms** -- rewrite 5-6 of the "isn't X / it's Y" constructions
6. **Replace "bridge the gap"** -- used twice, both times as a cliche
7. **Replace "boutique"** -- promotional; say "small" or "two-person" (which you already do elsewhere)
8. **Rewrite the blog article's closing** -- the "aren't the ones... They're the ones" construction is used twice in the same piece
9. **Vary the "What We Believe" format** -- not all 5 principles need the same "X over Y" + paragraph structure

### Low priority (minor or isolated)

10. **Replace "move the needle," "ahead of the curve," "meet you where you are"** -- stock phrases
11. **Replace "key insight," "high-impact," "deep expertise"** -- AI vocabulary
12. **Tone down "intelligent digital workers"** in the Custom AI Agent description
13. **Consider whether "and beyond" (ContactFaq) adds anything** -- it doesn't
14. **Replace "genuine investment in your success"** (OurStory) -- promotional

---

## What the Site Does Well

Worth noting: this content is significantly better than average AI-generated marketing. Specific strengths:

- **Real opinions** -- "We'll tell you when you don't need AI" is a genuinely differentiating statement
- **Concrete details** -- published prices, specific team size, named locations
- **Personality in the right places** -- TheName section, "AI doesn't care about verticals," "Happy coincidence"
- **No egregious AI slop** -- no "delve," "tapestry," "vibrant," "nestled," "in the heart of"
- **Conversational tone** -- the FAQ answers and pricing notes feel like a real person wrote them
- **Good rhythm variation in some sections** -- TheProblem and the blog intro have natural cadence

The issues are structural (repeated formulas, triads) rather than vocabulary (AI words). That's a much better starting position.
