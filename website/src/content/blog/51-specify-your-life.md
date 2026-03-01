---
title: "Specify your life: why the people who document everything will win the AI era"
subtitle: "The same discipline that makes software projects succeed is about to determine who actually benefits from AI"
date: 2026-03-03
author: g
category: ai-for-humans
tags: ["specification engineering", "ai agents", "personal productivity", "knowledge management"]
excerpt: "AI agents don't fail because the technology is broken. They fail because we never learned to specify what we actually want. Turns out, neither did most of our teams, our companies, or our personal lives."
featured_image: "/images/blog/51-specify-your-life-art.webp"
featured_image_alt: "Charcoal sketch of a figure writing at a desk, transforming tangled chaos into structured, organized pages"
featured: true
draft: false
---

You've had this experience. You hand off a task to someone on your team. They deliver something that technically matches what you asked for but completely misses what you meant. You stare at it. You realize: the problem wasn't them. The problem was you. You never specified what "good" actually looked like.

Now multiply that by every interaction you've ever had where someone "didn't get it." Your partner who didn't understand what you actually needed. Your manager who set goals that didn't make sense. Your team that keeps producing work that's close but not right.

Most of us explain this away as miscommunication. Bad chemistry. Different working styles. But there's a simpler explanation: we are terrible at specifying what we want. We always have been. We just never had to face it this directly.

Until now.

## The moment AI forced the issue

AI agents are no longer chat partners you correct in real time. They're autonomous workers. They run for hours, sometimes days, against specifications you provide upfront. If the spec is bad, the output is bad. There's nobody watching over the agent's shoulder to course correct.

I started noticing this when I built the operational backbone of my own consulting firm. Every time an agent produced mediocre output, I could trace it back to the same root cause: I hadn't specified clearly enough what I wanted. Not the technology's fault. Mine.

And the more I thought about it, the more I realized this wasn't just an AI problem. It was a life problem. The same vagueness that made agents produce bad output was the same vagueness that caused friction in my teams, confusion in my projects, and drift in my personal goals.

Nate B Jones recently laid out a framework that captures this shift perfectly. He argues that "prompting" has diverged into four distinct disciplines: prompt craft (the chat-based skill most people practice), context engineering (curating the information environment), intent engineering (encoding goals and trade-offs), and specification engineering (making your entire document corpus agent-readable). Most people are still practicing only the first one. The gap between someone using all four and someone using just one is already 10x.

But I want to take his argument further. Specification engineering isn't just a skill for working with AI. It's a skill for working with humans. For leading a company. For running your life.

**The people who will benefit most from AI aren't the most technical. They're the most specified.**

## Why we don't specify

Here's what's uncomfortable: most of us operate on vibes.

We "know" what we want but we've never written it down. We "know" our company's values but they're nowhere a new hire could find them, let alone an AI agent. We "know" our personal goals, but they live as vague feelings that shift whenever someone asks us about them.

I see three levels of what I'd call specification debt:

**Personal.** You haven't defined your goals, values, priorities, or decision frameworks. You react to whatever is loudest instead of directing your energy toward what matters. When someone asks "what are you optimizing for?" you give a different answer every time.

**Team and company.** Processes live in people's heads. Onboarding means "shadow someone for a week." Quality standards are "you'll know it when you see it." When a key person leaves, their entire knowledge walks out the door with them.

**Professional.** Your expertise, your methods, your preferences, the shortcuts you've built over a decade of work. All implicit. All locked in your head. Useful only when you're in the room.

The cost of this debt used to be manageable. Smart people filled in the gaps. Experienced teammates interpreted vague instructions correctly because they'd worked with you long enough to read between the lines. It was inefficient, but it worked well enough.

With AI agents, specification debt is fatal. Agents don't read between the lines. They don't "know what you meant." They read the spec. If the spec is vague, the output is vague. If the spec is missing, the agent guesses. And agents guess with statistical plausibility, which is a polite way of saying they produce things that look right but aren't.

Shopify CEO Toby Lutke put it bluntly: a lot of what people in big companies call "politics" is actually bad specification engineering between humans. Disagreements about assumptions that were never surfaced explicitly, playing out as grudges and turf wars. I think he's right. And I think the discipline of specifying clearly for AI is going to make us better at specifying for each other.

## The software parallel: we've seen this before

If you've ever been involved in building software, you already know the punchline. Every failed project has the same autopsy: unclear requirements.

The client knew what they wanted. The developer built what was written in the brief. The two were never the same thing.

This gap has a name in software: the requirements problem. And an entire discipline exists to solve it. Business analysts and solution architects spend their careers translating between what someone wants (vague, emotional, incomplete) and what a developer needs to build it (specific, structured, testable).

The translation happens across layers:

**Business requirements.** What does the organization need? Revenue growth. Faster reporting. Better customer retention. These are goals, not specifications.

**Functional requirements.** What should the system do? "Show a dashboard with Q3 revenue by region, refreshed daily, with drill-down to individual accounts." Now we're getting somewhere.

**Technical requirements.** How should it be built? Which database, which API, which security constraints. The engineering decisions.

**Acceptance criteria.** How do we know it's done? "The dashboard loads in under 2 seconds, displays data accurate to the previous business day, and works on mobile browsers." Testable. Unambiguous. A developer can build against this.

The entire history of software engineering is really a history of getting better at specification. Agile, waterfall, BDD, TDD, user stories. Different methods, same underlying challenge: how do we take what a human wants and turn it into something precise enough that a system can execute it?

AI agents need the same translation. They need your vague "help me be more productive" turned into structured specifications they can execute against. And right now, most people are skipping straight from business requirements to "hey, can you help me with this?" Asking an AI agent to "make a presentation" is the equivalent of telling a developer to "build me a website." You'll get something. It probably won't be what you wanted.

The fix isn't better models. It's better specs.

## Specifying your organization

Think of every document in your organization as a potential instruction set for an AI agent.

Your corporate strategy isn't just a PDF for the board meeting. It's a specification that tells an agent what the company is optimizing for. Your brand guidelines aren't just for designers. They're constraints an agent uses when generating content. Your onboarding manual isn't just for new hires. It's the context an agent needs to understand how your company actually works.

Most organizations have some version of these documents. The problem is that they were written for humans who fill in gaps, not for agents who follow instructions literally.

Here's what an agent-ready organizational specification looks like:

**Mission and values.** Not the poster on the wall. A document that tells an agent what to prioritize when two valid options conflict. "We prioritize customer trust over speed" is a specification. "We believe in excellence" is not.

**Processes and workflows.** Not descriptions. Step-by-step playbooks with numbered steps, clear inputs and outputs, and defined "done" criteria. "Handle customer complaints" isn't a spec. "1. Acknowledge within 4 hours. 2. Classify as billing/technical/feature. 3. Route to the appropriate team. 4. Confirm resolution within 48 hours" is.

**Roles and responsibilities.** Not job titles. Declarations of what each role does, what tools they use, what decisions they can make, and what they escalate. A new agent (or a new hire) should be able to read a role specification and start producing useful work immediately.

**Quality standards.** Not "be professional." Specify it. What does a good email look like? How long should a customer response be? What tone should content use? One company I worked with had a 12-page tone document that specified everything from sentence length to which words to avoid. Their AI-generated content was indistinguishable from their best human writer. Companies without those specs got generic output that sounded like everyone else.

**Guardrails.** What should never happen, no matter what. Never share customer data outside the support team. Never promise a timeline without checking with engineering. Never publish without a review. These are the constraint architectures that turn loose specifications into reliable ones.

The interesting thing is that small teams have an enormous advantage here. If you're 1 to 10 people, you can make your entire operation agent-readable in a week. Write down your processes. Document your standards. Specify your roles. That's it. Enterprise companies with decades of tribal knowledge scattered across SharePoint sites and Slack channels will take years to do the same thing.

## Specifying your professional self

Beyond your organization, there's a specification that most people have never thought about: your professional self.

Your expertise. Your working style. Your quality standards. Your communication preferences. Your decision-making frameworks. All of this is context that shapes every interaction you have, with humans and with AI. And almost none of it is written down.

The developer community stumbled onto this early. The best practitioners maintain what's commonly called a context file that loads into every AI session. It contains their coding conventions, their architectural preferences, their project context, their quality standards.

The difference in output quality between someone with a well-maintained professional specification and someone without one is dramatic. Same model. Same subscription. Completely different output. Not because the model got smarter, but because it finally knows who it's working for.

Your professional specification doesn't need to be long. It needs to be honest:

- What you know deeply and where your expertise ends
- How you make decisions when trade-offs exist
- What "done" looks like for your work
- Your communication style and preferences
- The standards you hold yourself to

Write this down. Load it into your AI sessions. Watch the output quality shift immediately. Then update it as you learn more about yourself. It's a living document, not a contract.

## Specifying your personal life

This is where it gets interesting. And where most people think I've lost the plot.

I haven't.

The same discipline that makes organizations agent-ready and professionals more effective can be applied to your personal life. Not to turn yourself into a machine. To get clearer about what you actually want.

I started experimenting with something I call a telos file. The word "telos" comes from Greek: it means purpose, or ultimate aim. A telos file is a living document that captures who you are, what you're trying to accomplish, and how you're pursuing it.

The structure flows top-down. Each section derives from the one above:

**Problems.** What do you see in the world that bothers you enough to act? These aren't complaints. They're the tensions that drive you.

**Mission.** One sentence. What you're trying to do about those problems.

**Narratives.** The beliefs that underpin your mission. Why this matters to you specifically.

**Goals.** Concrete, tagged by domain: work, side projects, personal. Each one traceable back to the mission.

**Challenges.** The real obstacles. Not the ones that sound good in an interview. The honest blockers: money, time, fear, bad habits.

**Strategies.** How you're addressing each challenge. Concrete approaches, not aspirations.

**Projects.** The active work you're doing right now. Each traceable to a goal.

**Metrics.** How you measure progress. Numbers, not feelings.

**Journal.** What happened. What you learned. What shifted.

Here's what this looks like in practice. Imagine Alex, a 38-year-old operations director at a 200-person company. Two kids. Interested in AI but overwhelmed.

Alex's telos file might include:

- **Problem:** "My team spends 40% of their time on reporting that nobody reads carefully."
- **Mission:** "Free my team from busywork so they can do the thinking the company actually hired them for."
- **Goal [work]:** "Automate the three most time-consuming monthly reports within 6 months."
- **Goal [personal]:** "Be home for dinner four nights a week, not two."
- **Challenge:** "I don't know enough about AI to evaluate which tools would actually help versus which are hype."
- **Strategy:** "Dedicate Tuesday mornings to learning. Start with our actual reporting workflow, not abstract AI concepts."
- **Metric:** "Hours per month spent on manual reporting. Currently: 64. Target: under 15."

This isn't just self-reflection. It's a specification document. Load Alex's telos file into an AI session and the agent immediately understands Alex's constraints, priorities, and definition of success. It stops suggesting generic productivity tips and starts suggesting things that actually fit Alex's life.

But here's the deeper point, and the one that has nothing to do with AI: writing a telos file forces you to confront what you actually want.

Most people have never done this. They operate on inherited assumptions, social expectations, and momentum. The exercise of specification, completely independent of AI, makes you a clearer thinker and a more intentional person. I know because writing my own telos file surfaced conflicts between what I said I wanted and how I was actually spending my time.

We'll be publishing a deep-dive guide on building your own telos file soon. For now, the concept is simple: specify your life with the same rigor you'd specify a software project, and both you and your AI tools will produce better results.

## Getting started

Start small. Specify one thing today.

**For yourself.** Write a one-page telos file. Your mission, three goals, three challenges. That's it. Don't try to make it complete. Make it honest. Put it somewhere your AI tools can access. Notice how the quality of AI output changes when it knows who you are and what you're working toward.

**For your team.** Pick your most repeated process. Write it as a numbered playbook. Define "done" for three types of work your team produces regularly. Write down the three things a new hire always gets wrong in their first month. Those mistakes are your missing specifications.

**For your organization.** Audit your documents with one question: could an agent execute against this without asking me clarifying questions? Start with your brand voice, your quality standards, and your core workflows. Make everything text-based and structured. Markdown is fine. A PDF of a slide deck is not.

**The test.** If a capable, well-intentioned stranger, whether human or AI, couldn't produce good work from your documentation alone, your specifications aren't good enough yet.

## The specification is the work

The era of "just figure it out" is ending. Not because AI demands it. Because clear specification was always the better way to work, to lead, and to live. AI just made the cost of vagueness impossible to ignore.

The people who will thrive aren't the ones who prompt better. They're the ones who specify better. Who have done the hard, unglamorous work of documenting what they know, what they want, and how they work.

That work starts with you. Your goals. Your standards. Your processes. Your life, specified clearly enough that you can hand pieces of it to an agent and trust the output.

Not because you're delegating your life to a machine. Because you finally know what you're building.
