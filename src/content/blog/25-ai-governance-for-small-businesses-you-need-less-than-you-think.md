---
title: "AI governance for small businesses: you need less than you think"
subtitle: "A practical framework that fits on one page and actually gets followed"
date: 2025-11-28
author: g
category: honest-take
tags: ["governance", "risk"]
excerpt: "You don't need a 50-page AI policy. You need four things: a usage policy, a data agreement, human review rules, and a tool inventory."
featured_image: "/images/blog/25-ai-governance-for-small-businesses-you-need-less-than-you-think-art.png"
featured_image_alt: "A single sheet of paper with a checklist next to a stack of thick binders"
featured: false
draft: false
---

Type "AI governance framework" into Google and you'll get enterprise playbooks the size of a small novel. Fifty-page policy documents. Multi-department oversight committees. Risk assessment matrices with color-coded severity levels and quarterly review cycles. If you're running a 30-person company, this stuff feels like it was written for a different planet.

So most small businesses do nothing. They figure AI governance is an enterprise problem, something for the Microsofts and JPMorgans of the world. Their team is using ChatGPT, Claude, and a handful of other AI tools with zero guidelines, zero oversight, and zero documentation of what goes where. The thinking is: we're too small for this to matter.

Both extremes are wrong. The enterprise playbook is overkill for a business your size. But doing nothing is how you end up with customer data in a free AI tool's training set, or an employee making decisions based on AI output nobody checked, or a vendor pitch that relies on AI-generated numbers nobody verified.

**You need AI governance. You just need a lot less of it than the consultants want to sell you.**

## What governance actually means at your scale

Strip away the corporate language and governance is about answering four questions. That's it. Four questions, documented in a way your team can actually find and follow.

What AI tools are we allowed to use? What data can we put into them? Who checks the important outputs? And how do we keep track of what's happening?

If you can answer those four questions in a document your team will actually read (which means it has to be short), you have a governance framework. Not a perfect one. Not an enterprise-grade one. A practical one that prevents the most common and most expensive mistakes.

## The one-page AI policy

We'll be honest: we call this a "one-page policy" because it forces discipline. If your AI governance document is longer than one page, your team won't read it. If they don't read it, you don't have governance. You have a PDF in a shared drive.

Here's what belongs on that page.

**Start with an approved tools list.** Which AI tools is your team allowed to use? If you're on ChatGPT Team, say so. If someone wants to try a new tool, they ask [specific person] first. This isn't about being controlling. It's about knowing where your company's information is going. Every AI tool has different data policies. You can't manage risk on tools you don't know about.

A 2024 survey by Salesforce found that more than half of employees using AI at work were using tools their employer hadn't approved. Not because people are reckless. Because nobody told them which tools were okay. A simple approved list fixes this overnight.

Next, write your data rules in plain language. This is the section that prevents the expensive mistakes. Something like: "Don't put customer names, email addresses, financial data, or anything you'd be uncomfortable seeing in a news article into any AI tool. If you're not sure whether something counts, ask [specific person] before pasting it in."

You don't need a data classification matrix. You need a rule clear enough for someone to follow at 4pm on a Friday when they're trying to get a draft done before the weekend.

For tools connected to your company data (an AI that reads your CRM, a tool that processes your documents), add a line about what data that tool can access and who set up the connection. You want to know which tools are touching which systems.

Then figure out your human review rules. Not everything needs review. An AI draft of a social media post? Glance at it, but it's low-stakes. An AI-generated financial summary going to a client? Someone checks every number. The policy should specify which outputs require a human look before they go out the door. Keep the list short and focused on where mistakes actually cost you: client deliverables, financials, legal documents, anything public.

A rule of thumb we give clients: if the output could embarrass you, cost you money, or create a legal problem, a human checks it first. Everything else, use your judgment.

The last piece is tool tracking, and this is the one that feels bureaucratic but prevents real problems down the road. Someone at your company (the owner, an office manager, whoever handles IT) should maintain a simple list of what AI tools are in use, who's using them, what data they access, and what they cost. A spreadsheet is fine. A page in Notion is fine. The point is that if someone asks "what AI tools are we using and what data are they touching?" you have an answer. Right now, most small businesses don't.

## Why most businesses skip governance (and why that's risky)

The honest answer is that governance feels like bureaucracy, and small business owners hate bureaucracy. They started their company to get things done, not to write policies.

I get it. And for a lot of AI use cases, the risk is genuinely low. If your marketing person uses Claude to brainstorm blog post ideas, the governance risk is approximately zero. Nobody's getting fired, sued, or embarrassed because an AI suggested five headline options.

But the risks aren't zero across the board.

Data leakage is the big one. Free versions of most AI tools use your inputs for training, which means anything you paste into the chat window could, theoretically, end up influencing outputs for other users. For most personal use, that's fine. For confidential client information or proprietary business strategies, it's a real problem. The paid "business" tiers of most tools don't train on your data, but your team needs to know which tier they're on and what that means.

The other risk that bites is accuracy. AI tools are confident and wrong often enough that it matters. If someone on your team sends a client an AI-generated report without checking the numbers, and those numbers are wrong, the cost isn't the subscription fee. It's the client relationship. We've talked to businesses where exactly this happened, and the client didn't care that "the AI made a mistake." They cared that nobody checked.

And then there's the regulatory piece, which is getting harder to ignore. The EU AI Act is already in effect for some use cases. US state-level regulations are expanding. If you're in healthcare, finance, or any regulated industry, the rules about AI use are getting more specific every quarter. Having even a basic policy in place now means you're not scrambling when compliance comes knocking.

## Setting it up in an afternoon

Here's the part that usually surprises people: you can build a reasonable AI governance framework in a single afternoon. Not a perfect one. A good-enough one that covers your biggest risks and gives your team clear guidance.

Block two hours. Bring whoever manages operations, whoever handles IT (even if that's also you), and maybe one or two people who use AI tools the most.

Start by making the tool inventory. Go around the room. What AI tools is everyone using? Don't just ask about the obvious ones like ChatGPT. Ask about AI features built into existing tools: your email client's AI drafting, your CRM's AI suggestions, your accounting software's new "AI-powered insights." You'll be surprised how many AI tools are already in your workflow that nobody thinks of as AI tools.

Write down the data rules. Look at your tool list and ask: what kind of company data could go into each of these? Customer info? Financial data? Internal communications? For each tool, decide what's acceptable and what isn't. The defaults for most businesses: no customer personal data in any free-tier AI tool, ever. Paid tools with business data agreements get more latitude.

Decide on human review rules. Which outputs matter enough to check? Client deliverables, financial reports, legal documents, and anything going public are the obvious candidates. Internal drafts, brainstorming, and research are generally fine without formal review.

Write it down. One page. Plain language. Share it with the team. Done.

## The catch (because there's always a catch)

A one-page policy won't cover every scenario. It won't satisfy an enterprise compliance audit. It won't address every edge case your team encounters.

And honestly, it doesn't need to. **A 50-page policy that nobody reads provides zero governance. A one-page document that everyone follows provides real governance.** The goal is to prevent the most likely and most expensive mistakes, while being simple enough that people actually follow it.

We'd rather see our clients start with the one-pager and add to it as situations arise than build the perfect framework that sits in a drawer.

The other limitation: governance needs maintenance. AI tools change their data policies. New tools get adopted. Team members rotate. Someone needs to revisit the policy every six months and update the tool inventory. Put it on someone's calendar. Otherwise the document you wrote in an afternoon becomes outdated in six months.

## What to do this week

If you have no AI governance today, here are the first two moves.

Send your team a short message: "What AI tools are you using for work? List everything, including AI features built into our existing tools." Compile the responses. That's your tool inventory.

Then write the one-page policy. Approved tools, data rules, human review requirements, and who to ask when you're not sure. Share it. Make sure people actually see it (which probably means discussing it in a meeting, not just dropping a PDF in Slack).

That's governance for a business your size. Not a committee, not a framework, not a 50-page document. A list of tools, some clear rules about data, a human check on the stuff that matters, and a plan to revisit it twice a year.

Your competitors are either doing nothing or overcomplicating this. There's a lot of room in the middle, and that's exactly where you should be.
