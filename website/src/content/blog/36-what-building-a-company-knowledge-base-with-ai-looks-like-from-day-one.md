---
title: "What building a company knowledge base with AI looks like from day one"
subtitle: "From scattered Google Docs to a searchable brain for your company, in about six weeks"
date: 2025-10-18
author: g
category: 90-day-wins
tags: ["example", "knowledge management"]
excerpt: "Building an AI knowledge base isn't a moonshot. Here's the realistic timeline, real costs, and the adoption challenge nobody warns you about."
featured_image: "/images/blog/36-what-building-a-company-knowledge-base-with-ai-looks-like-from-day-one-art.png"
featured_image_alt: "A team gathered around a screen showing search results from an internal knowledge system"
featured: false
draft: false
---

Every company has a Dave.

Dave has been with the company for twelve years. Dave knows where the contract templates live, which vendor gives the best terms, and why the onboarding process was changed in 2019. Dave is a walking encyclopedia. Dave is also a single point of failure.

When Dave goes on vacation, things slow down. When Dave is sick, questions pile up in Slack. And someday Dave will retire or move on, taking a decade of institutional knowledge with him.

**An AI-powered knowledge base is the project that replaces the need to ask Dave.** Not by replacing Dave himself, but by capturing what Dave knows (and what everyone else knows) in a system that anyone can search, at any time, and get a useful answer.

Here's what building one actually looks like, from the first scoping call through 90 days of adoption.

## What we're actually building

Let's be precise about what this is, because "AI knowledge base" gets thrown around loosely.

We're talking about a system that ingests your company's internal documents, SOPs, policies, contracts, training materials, meeting notes, and whatever else your team produces. It indexes all of that content. And then it gives your team a search interface where they can ask questions in plain English and get answers drawn directly from your own documentation, with sources cited.

The technical term is RAG (retrieval-augmented generation). Think of it as your company's memory with a search engine attached. The AI doesn't make things up from general internet knowledge. It pulls from your specific documents and generates answers based on what it finds.

**This is not a chatbot.** It's not a customer-facing tool. It's an internal system for your team. The goal is simple: when someone has a question about how your company does something, they get an answer in 30 seconds instead of 30 minutes.

## Weeks 1-2: scoping and document inventory

The first week isn't about technology at all. It's about content.

Here's the question that determines whether this project succeeds or flops: **which documents actually matter?** Most companies have thousands of files scattered across Google Drive, SharePoint, Notion, Confluence, email threads, and that one folder on someone's desktop that nobody else can access.

You don't start by indexing everything. You start by identifying the 20% of documents that answer 80% of the questions your team asks repeatedly.

For a typical company of 30 to 80 people, that starting set usually includes:

- **HR and onboarding materials**: Employee handbook, benefits guides, PTO policies, onboarding checklists
- **Standard operating procedures**: How to process an order, how to handle a return, how to escalate a support ticket
- **Product or service documentation**: What you sell, how it works, pricing structures, FAQs
- **Sales and proposal materials**: Pitch decks, case studies, competitive positioning docs
- **IT and systems guides**: How to set up your laptop, VPN instructions, software access procedures

That's usually between 50 and 200 documents. Not thousands. Starting small is the point. You can always add more later, but launching with too much content actually makes search quality worse, because the system has to sort through noise to find signal.

**The honest trade-off here**: this document inventory phase is tedious. Someone has to go through folders, identify current versions, flag outdated materials, and organize everything into a coherent structure. Budget 15 to 25 hours of internal time for this. It's the least exciting part of the project, and it's the most important.

## Weeks 3-4: building the system

Once the documents are identified and organized, the technical build is surprisingly fast. For a knowledge base of this scope, a competent team can have a working prototype in 7 to 10 business days.

Here's what the build involves. Your files get split into searchable segments. A 40-page employee handbook doesn't get indexed as one giant blob. It gets broken into logical sections so the system can retrieve the specific part that answers a question. Each section gets converted into a mathematical representation (called an embedding) and stored for fast, accurate retrieval. When someone asks a question, the system finds the most relevant sections, generates a natural-language answer, and cites which documents it pulled from.

The front end is usually a simple web app or a Slack/Teams integration. Simpler is better here. The fewer clicks it takes to ask a question, the more people will actually use it.

**What this costs**: For a system handling 50 to 200 documents with a team of 30 to 80 users, expect to spend $8,000 to $15,000 on the initial build, depending on complexity. Monthly running costs for the AI models and hosting typically land between $200 and $500 for a company this size. Those API costs scale with usage, but for internal knowledge queries they stay modest.

The part that surprises people: **the hardest technical challenge isn't building the search. It's handling messy documents.** PDFs with weird formatting, scanned documents without OCR, spreadsheets embedded in Word docs. Every company has a folder of files that were clearly created in 2008 and never updated. Cleaning those up, or deciding to exclude them, takes more time than the actual AI engineering.

## Weeks 5-6: testing and launch

Before you launch to the whole company, you test with a small group. Five to eight people from different departments, ideally including some skeptics. They use the system for a week, logging every question they ask and rating whether the answer was helpful.

This testing phase reveals two things:

**First, gaps in the content.** Someone asks "What's the process for requesting a laptop upgrade?" and the system draws a blank because that process lives in someone's head, not in a document. These gaps are gold. They tell you exactly which undocumented knowledge needs to be written down.

**Second, search quality issues.** The system might pull from an outdated document, or give a partial answer when the full answer requires combining information from two different sources. These are tuning issues, not failures. Adjusting the search parameters and document structure during this phase makes a big difference.

After testing and adjustments, you launch. And this is where the real challenge begins.

## The adoption problem (this is where most knowledge bases die)

We'll be honest: **the technology is the easy part. Getting people to actually use the system is the hard part.**

Here's what typically happens. The knowledge base launches. There's some initial excitement. People try a few queries. Some get great answers, some don't. Within two weeks, half the team has gone back to their old habits. They're Slacking Dave again. They're digging through Google Drive manually. They're asking the person sitting next to them.

This isn't because the tool is bad. It's because **asking a search system requires a behavior change, and behavior change is hard.** Your team has been solving information problems a certain way for years. A new tool, no matter how good, has to compete with deeply ingrained habits.

What we've seen work:

The single biggest factor is making the knowledge base the path of least resistance. If it's a separate app people have to remember to open, they won't. Integrate it into Slack or Teams, where they already work. When someone asks a question in a channel, the bot should be able to answer it right there.

It also helps to identify two or three people per department who are genuinely enthusiastic about the tool. Give them early access during testing. Let them be the ones who say "Hey, did you try asking the knowledge base?" when someone posts a question. That peer pressure works better than any management directive.

Whatever you do, don't oversell it. If you tell the team this system "knows everything about the company," the first wrong answer will destroy trust. Frame it honestly: "This searches our documentation. It's not perfect, but it's faster than digging through folders."

And when the system saves someone 20 minutes of research, make that visible. A weekly "top questions answered" summary keeps the tool in people's minds and gives skeptics a reason to try it again.

## Days 30-90: the adoption curve

Here's the realistic adoption pattern for an internal knowledge base at a mid-size company.

The first two weeks after launch see high curiosity and uneven usage. People try it out. Some are impressed, some are underwhelmed. Departments that deal with lots of procedural questions (HR, operations) tend to latch on faster.

Then comes the dip, usually around weeks 3-4. Novelty wears off. People who got one bad answer stop using it. This is the make-or-break period. If you do nothing, adoption will plateau at 20-30% of the team and slowly decline from there.

If you've been gathering feedback, fixing content gaps, and promoting wins, weeks 5-8 look different. Usage starts climbing again. Your champions are pulling colleagues in. New documents have been added based on the gaps discovered during testing.

By weeks 9-12, you reach steady state. Typical adoption at this point is 50-70% of the team using the system at least weekly. Power users query it daily. Sales teams tend to be the last holdouts.

**The metric that matters most at 90 days isn't total queries. It's repeat usage.** If 60% of the people who tried the system in week one are still using it in week twelve, the project is a success. If that number is below 30%, something needs to change, usually the content quality or the interface.

## What the numbers look like

For a 50-person company, here's what the numbers typically look like after 90 days based on industry data and common implementation patterns.

Time saved on information lookups runs about 3 to 5 hours per employee per month. That's not dramatic per person, but across 50 people it adds up to 150 to 250 hours monthly. The "who knows about X?" Slack messages drop by 40-60%. People still ask each other questions, but the routine factual stuff gets redirected to the system.

New hires tend to find answers 2-3x faster during their first month when they have a searchable knowledge base versus digging through folder structures. And there's a side benefit nobody expects: building the knowledge base forces you to update outdated docs. Most companies discover that 15-25% of their documentation is stale during the initial inventory phase.

The total investment for the first 90 days, including build, testing, and adoption support, typically runs $10,000 to $20,000 depending on document volume and complexity. The ongoing monthly cost is $200 to $500 for hosting and AI model usage.

Is that worth it? For most companies over 30 people with meaningful documentation, yes. **The math isn't primarily about time saved on search. It's about decisions made faster and with better information.** That's harder to quantify but more valuable.

## What made this work (and what almost didn't)

The thing that makes a knowledge base succeed isn't the AI. It's the content.

Companies that invest the time upfront to organize, update, and curate their documents end up with a system that gives genuinely useful answers. Companies that dump every file from Google Drive into the system and hope for the best end up with a search tool that returns outdated information and earns a reputation for being unreliable.

**The part that's harder than it sounds**: keeping the content current. A knowledge base isn't a "build it and forget it" project. Policies change. Processes evolve. Someone needs to own the responsibility of updating documents when things change, and making sure the AI system re-indexes them.

Assign a knowledge base owner. Give them two hours a week to review feedback, update documents, and monitor search quality. Without this ongoing maintenance, even the best-built system degrades within six months.

A knowledge base is a documentation project with AI on top. The AI makes the documentation useful. But the documentation has to exist first. Get that part right, and the technology takes care of itself.
