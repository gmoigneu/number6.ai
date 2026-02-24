---
title: "Sometimes the right answer is 'don't buy AI': three scenarios where simpler tools win"
subtitle: "Not every problem needs artificial intelligence. Here are three cases where the smarter move was a spreadsheet, better training, or a $20/month automation."
date: 2025-10-05
author: g
category: 90-day-wins
tags: ["example", "honest take"]
excerpt: "Three realistic scenarios where companies didn't need AI. A spreadsheet fix, CRM training, and a Zapier automation each solved the problem at a fraction of the cost."
featured_image: "/images/blog/35-sometimes-the-right-answer-is-dont-buy-ai-art.png"
featured_image_alt: "A simple spreadsheet on a screen with a 'solved' sticky note"
featured: false
draft: false
---

We sell AI consulting. We help businesses adopt AI tools, build AI workflows, and train teams to use AI effectively. So you might think we'd want every company to buy AI.

We don't.

About a third of the time, when a company comes to us thinking they need AI, the honest answer is: you don't. At least not yet. And sometimes not ever, for the specific problem they're trying to solve.

This isn't false modesty. It's math. If a simpler tool solves the problem for 10% of the cost and none of the complexity, recommending the AI option would be doing you a disservice. We'd rather tell you the truth and build a reputation on that than sell you something impressive that sits unused.

Here are three scenarios we see regularly. Real patterns from real conversations, though we've generalized them to protect specifics.

## Scenario 1: the "AI problem" that was actually a process problem

A company with about 35 employees in professional services came to us frustrated with their project tracking. They had data scattered across email, shared drives, a project management tool, and a few spreadsheets that different people maintained independently. The leadership team wanted an AI-powered dashboard that could pull information from all these sources and generate weekly status reports automatically.

On the surface, this sounds like a reasonable AI use case. Multiple data sources, manual aggregation, weekly reporting. We've built exactly this kind of system for other companies.

But when we looked closer, the problem wasn't data aggregation. **The problem was that nobody had agreed on how to track projects in the first place.**

Some project managers used the project management tool religiously. Others barely touched it and tracked everything in personal spreadsheets. Two people still used email folders as their filing system. The "scattered data" problem wasn't a technology problem. It was a process problem.

An AI dashboard would have been expensive to build ($5,000 to $15,000), required ongoing maintenance, and still produced unreliable results because the underlying data was inconsistent. If half the team isn't entering data into the project management tool, no amount of AI can conjure accurate status reports from what isn't there.

The fix was almost embarrassingly simple. A two-day process overhaul. The operations manager sat down with every project manager, agreed on a standard project tracking workflow, and built a single shared spreadsheet template with clear fields and consistent categories. They added a simple Gantt chart view. They set a rule: if it's not in the spreadsheet, it doesn't exist.

Total cost: about 16 hours of the operations manager's time, plus a $0/month spreadsheet.

Within three weeks, the leadership team had the visibility they wanted. Not from AI pulling data from five systems, but from humans entering data into one system that everyone actually used.

Before you build a tool to aggregate messy data, ask whether the data needs to be messy. Often the cheapest, fastest fix is agreeing on a process and sticking to it. **AI is great at processing organized data. It's terrible at compensating for organizational dysfunction.**

We'll be honest: this is a hard recommendation to make when someone is excited about AI. They came in wanting the sophisticated solution, and we told them to reorganize a spreadsheet. But six months later, their project tracking works. An AI dashboard, built on top of the same messy processes, would have been a $15,000 Band-Aid.

## Scenario 2: the team that needed CRM training, not an AI add-on

A sales team of eight people at a mid-size company wanted AI to help with lead scoring and follow-up automation. They were using HubSpot, and their close rates had been declining for two quarters. The sales director's theory: they needed AI to identify which leads were most likely to convert and automatically prioritize outreach.

We looked at their HubSpot data. And the problem became obvious pretty quickly.

**They were using maybe 15% of HubSpot's built-in features.** Lead scoring? HubSpot has it. It was turned off. Automated follow-up sequences? HubSpot has those too. Nobody had set them up. Pipeline stages? They had the default ones from when they first created the account three years ago. Nobody had updated them to match how the team actually sells.

The CRM already had the tools they were asking us to build with AI. They just hadn't configured them.

This is more common than you'd think. Gartner's 2024 research found that the average company uses only 30% to 40% of the features in its existing software stack. For CRM specifically, adoption studies consistently show that sales teams use a fraction of available functionality, usually the basics: contact storage, email logging, maybe pipeline tracking.

**What actually solved it:** A week of focused CRM configuration and training.

Day 1 and 2: An experienced HubSpot consultant (not an AI consultant) reviewed their sales process and configured lead scoring rules based on the engagement signals that correlated with their historical closes. Set up automated follow-up sequences for leads that went cold after initial contact. Updated pipeline stages to match their actual sales process.

Day 3: Half-day training session with the sales team. Walked through the new lead scoring, showed them how the automated sequences worked, taught them to read and act on the lead priority signals.

Day 4 and 5: Shadowed the team, answered questions, fixed configuration issues that emerged from real usage.

Total cost: roughly $3,000 to $5,000 for the consultant, depending on the market.

An AI add-on for lead scoring and automation would have cost $500 to $2,000/month on top of their existing HubSpot subscription, plus $5,000 to $10,000 in setup and integration. And it would have been pulling from the same poorly configured data, which means the AI's lead scores would have been garbage too.

**Six weeks after the CRM overhaul, close rates were back to where they'd been a year earlier.** Not because of any new technology. Because the existing technology was finally set up correctly and the team was trained to use it.

Here's the uncomfortable truth about this one: before buying an AI layer on top of your existing tools, check whether you're actually using your existing tools. Not the exciting recommendation anyone wanted to hear. But it's a lot cheaper, and when the answer is "we just need to configure what we already have," it works faster too.

## Scenario 3: the Zapier automation that did the job at 10% of the cost

A property management company with about 25 employees was spending significant time on tenant communication. Every time a maintenance request came in, someone had to read the email, create a ticket in their maintenance system, notify the relevant contractor, update the tenant with an estimated timeline, and log the whole thing. They wanted an AI system that could read incoming maintenance emails, classify the issue type, route it to the right contractor, and send an automated acknowledgment to the tenant.

This is actually a legitimate AI use case. Email parsing, classification, and intelligent routing are things AI does well. We could have built it. It would have cost $8,000 to $15,000 to set up and $200 to $500/month to run, depending on volume.

But the volume was the issue. They received 40 to 60 maintenance requests per month. Not per week. Per month.

At that volume, you don't need AI classification. You need a form and some automations.

So we built them a Zapier automation connected to a simple online form.

Instead of tenants emailing maintenance requests (which produced unstructured text that varied wildly in detail and format), we helped them set up a Typeform with structured fields: property address, issue type (dropdown: plumbing, electrical, HVAC, general, pest control, other), urgency level, and a description field.

When a tenant submits the form, Zapier automatically creates a ticket in their maintenance tracking spreadsheet. Based on the issue type, it sends a notification to the right contractor from a pre-mapped list. It sends the tenant an automatic acknowledgment with the contractor's typical response time for that issue type. And it logs everything.

Setup took about 8 hours. Typeform: $25/month. Zapier: $20/month. Total monthly cost: $45.

Compare that to the AI solution at $200 to $500/month plus a $8,000+ setup fee. For 40 to 60 requests per month, the Zapier automation handles 90% of what the AI system would have done. The 10% it misses (unusual request types that don't fit the dropdown, complex multi-issue requests) still go to a human, which at that volume means one or two per week.

AI shines when you have high volume and high variability. When volume is low enough that a structured form can capture most cases, simple automation tools do the job reliably and cheaply. **The question isn't "could AI do this?" It's "does AI need to?"**

## Why we tell you this

There's a cynical reading of this article: "The AI consultants are writing about when not to buy AI as a marketing strategy." And yes, being honest about limitations does build trust, which helps us when you do have a real AI use case.

But there's also a straightforward reading: we'd rather spend our time helping companies where AI genuinely fits than wrestling with projects where the real problem is organizational, not technological.

Every hour we spend building an AI system for a problem that a spreadsheet could solve is an hour we're not spending on the projects where AI actually transforms how a team works. And those projects exist. We've seen document processing go from 30 hours a week to 10. We've watched teams cut their reporting time by 80%. AI is powerful when it's applied to the right problems.

The hard part, and the part that most AI vendors will never help you with, is figuring out which problems are the right ones. Sometimes the answer is a $50,000 custom AI system. Sometimes it's a reorganized spreadsheet.

**A good consultant tells you which one you need. A bad one sells you the expensive option either way.**
