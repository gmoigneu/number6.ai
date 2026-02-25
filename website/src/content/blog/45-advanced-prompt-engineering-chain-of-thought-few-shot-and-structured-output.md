---
title: "Advanced prompt engineering: chain-of-thought, few-shot, and structured output"
subtitle: "Three patterns that turn inconsistent AI outputs into reliable business tools"
date: 2025-12-05
author: g
category: behind-the-agent
tags: ["prompt engineering", "technical"]
excerpt: "Basic prompting gets you 60% of the way. These three advanced patterns close the gap between 'sometimes useful' and 'reliably integrated into your workflow.'"
featured_image: "/images/blog/45-advanced-prompt-engineering-chain-of-thought-few-shot-and-structured-output-art.png"
featured_image_alt: "A diagram showing three prompt engineering patterns with example inputs and outputs"
featured: false
draft: false
---

Most prompting advice stops at "be specific" and "give context." That's fine for asking ChatGPT to draft an email. It's not enough when you're building something that needs to produce consistent, structured, reliable outputs across thousands of requests.

We use three prompting patterns in almost every production system we build: chain-of-thought reasoning, few-shot examples, and structured output. Chain-of-thought makes the model think before it answers. Few-shot examples teach it your specific format. Structured output ensures the result can be parsed by code, not just read by humans.

This article walks through each pattern with real business examples, because prompting patterns only make sense when you see them applied to actual work.

## Chain-of-thought: making the model show its work

The idea is simple. Instead of asking the model to jump straight to an answer, you ask it to reason through the problem step by step. The quality difference can be dramatic, especially for tasks that require analysis or multi-step logic.

Here's why this matters in a business context. Say you're building a system that classifies incoming customer emails into categories: billing issue, technical problem, feature request, cancellation risk, or general inquiry. A basic prompt might look like:

"Classify this email into one of the following categories: billing, technical, feature_request, cancellation_risk, general."

This works maybe 70-80% of the time. It falls apart on ambiguous emails. A customer writing "I've been having trouble with my invoice and I'm not sure this tool is worth renewing" is both a billing issue and a cancellation risk. The model picks one, and it picks inconsistently.

A chain-of-thought prompt for the same task:

"Read this email carefully. Before classifying it, reason through these steps:

1. What is the customer's primary concern? Summarize it in one sentence.
2. Are there secondary concerns? List them.
3. What is the customer's emotional tone? (frustrated, neutral, positive, threatening to leave)
4. Based on the above, which category best fits? If multiple categories apply, list all that apply with the primary one first.

Then provide your classification."

The model now reasons through the problem before answering. It catches the nuance. It identifies multiple categories when they apply. And critically, you can see why it made the decision it did, so when it gets something wrong, you can diagnose the problem.

**Chain-of-thought prompting typically improves accuracy by 10-30% on tasks that involve judgment.** We've measured this across classification, analysis, and decision-making tasks in production. The cost is that responses take longer and use more tokens (the reasoning text itself costs money), but for most business applications the accuracy improvement far outweighs the extra spend.

The rule of thumb: if the model needs to weigh multiple factors, handle ambiguity, or make a judgment call, chain-of-thought helps. Financial analysis, document classification, risk assessment, quality evaluation. If you're extracting a phone number from an email, you don't need reasoning. Just extract it.

## Few-shot examples: teaching by showing

Few-shot prompting means including examples of correct input-output pairs in your prompt. Instead of describing what you want, you show the model what good looks like.

This is most valuable when you need consistent formatting, when you have domain-specific conventions, or when the task has subtleties that are hard to describe in words.

Consider a real scenario: extracting structured data from sales call transcripts. You want the model to pull out the company name, contact person, their role, pain points mentioned, budget signals, and next steps discussed.

A zero-shot prompt (no examples) might say:

"Extract the following fields from this sales call transcript: company_name, contact_person, role, pain_points, budget_signals, next_steps."

The model will do this, but the output format will vary wildly between calls. Sometimes pain_points is a comma-separated list, sometimes it's a paragraph. Sometimes budget_signals quotes the exact words, sometimes it paraphrases. This inconsistency makes the data nearly useless for downstream analysis.

A few-shot prompt includes 2-3 worked examples:

"Here are examples of how to extract data from sales call transcripts:

--- Example 1 ---
Transcript: [excerpt from a real call]
Extraction:
- company_name: Meridian Logistics
- contact_person: Sarah Chen
- role: VP of Operations
- pain_points: Manual freight tracking taking 15+ hours/week; no visibility into shipment status for customers
- budget_signals: 'We've budgeted about $50K for this kind of improvement this year'
- next_steps: Send proposal by Friday; schedule demo with operations team next week

--- Example 2 ---
Transcript: [excerpt from a different call]
Extraction:
- company_name: Bright Path Education
- contact_person: Marcus Johnson
- role: CTO
- pain_points: Student data spread across 4 different systems; teachers spending 2 hours/day on admin
- budget_signals: No specific budget mentioned; decision needs board approval
- next_steps: Follow up in two weeks after board meeting; send case study from similar education client

Now extract data from this transcript in the same format:"

The output quality jumps immediately. The model matches your formatting conventions, your level of detail, and your style of summarization. The examples communicate subtleties that paragraphs of instruction can't.

**One example is a huge improvement over zero. Two are significantly better than one. Three usually give you most of the benefit.** Going beyond five rarely helps and starts eating into your context window.

Pick examples that cover different scenarios. If all your examples are straightforward, well-formatted cases, the model won't know how to handle the messy ones. Include at least one example with missing data, ambiguous information, or an unusual format.

## Structured output: making AI talk to code

This is the pattern that turns AI from "interesting tool" into "integrated business system." Structured output means getting the model to return data in a specific, parseable format (usually JSON) that your code can work with directly.

Without structured output, you get free-form text. Useful for humans to read, useless for code to process. You end up writing brittle regex patterns or custom parsers to extract information from the model's response, and those parsers break every time the model decides to phrase something slightly differently.

Most modern LLMs support structured output natively. OpenAI has JSON mode and function calling. Anthropic has tool use. Google has function declarations. The specifics differ, but the concept is the same: you define the shape of the data you want, and the model returns it in that exact shape.

Here's what this looks like in practice. We built a system that processes incoming invoices for a mid-size company. The model reads the invoice (PDF or image), extracts structured data, and feeds it into the accounting system. The output schema:

```json
{
  "vendor_name": "string",
  "invoice_number": "string",
  "date": "YYYY-MM-DD",
  "line_items": [
    {
      "description": "string",
      "quantity": "number",
      "unit_price": "number",
      "total": "number"
    }
  ],
  "subtotal": "number",
  "tax": "number",
  "total": "number",
  "payment_terms": "string",
  "confidence": "high | medium | low"
}
```

Every invoice produces output in this exact format. The accounting system consumes it directly. No parsing. No manual data entry. The "confidence" field triggers human review when the model isn't sure about a value.

The business impact is straightforward: the team went from manually entering 200+ invoices per month to reviewing only the ones the model flagged as uncertain (roughly 15-20%). The rest flow straight into the accounting system.

## Combining all three

These patterns work well individually, but they're strongest together. Here's a real example from a financial document analysis system we built.

The task: analyze quarterly earnings reports and produce a structured summary for a dashboard.

The prompt asks the model to first reason step by step (identify key metrics, compare to previous quarter, note significant changes over 5%, assess the overall trend). It includes two worked examples showing how previous reports were analyzed, with the exact output format and level of detail expected. And it requires the result as a JSON object with specific fields (revenue, profit_margin, yoy_growth, notable_changes, risk_factors, outlook_summary) that the dashboard renders directly.

Take any one of those patterns away and the system degrades. Without chain-of-thought, the model sometimes misidentifies which numbers matter. Without the examples, summaries vary too much in quality. Without structured output, the data can't feed the dashboard.

That's what "production-grade" actually means in practice: accurate, consistent, and machine-readable. All at once.

## Choosing the right pattern for the job

I keep a rough decision framework in my head.

Chain-of-thought is the right call when the model is making mistakes that look like "it didn't think carefully enough." Any task involving judgment, comparison, or multi-step logic benefits from it. If you're seeing inconsistent decisions on ambiguous inputs, chain-of-thought is your first fix.

Few-shot examples solve formatting and calibration problems. When the model keeps producing output that's "close but not quite right," examples will calibrate it faster than adding more descriptive instructions. They're also the best way to communicate domain-specific conventions that are hard to articulate.

Structured output is non-negotiable for integration work. If code needs to consume the model's output, free-form text is a fragile interface. Use JSON mode or function calling.

Most production systems we build use all three. The cost in tokens is real but manageable. A prompt using all three patterns might run 2-3x more per call than a basic prompt, but the reduction in errors and manual review more than pays for it.

## Mistakes that cost you the most

We've learned to watch for a few specific traps.

The most wasteful one: asking for chain-of-thought reasoning and then never looking at the reasoning. If you don't log the model's reasoning steps, you're paying for tokens you're not using and you're missing your best debugging tool. Always log the reasoning. Review it when outputs seem wrong.

Few-shot examples that are too similar to each other also hurt. If all three examples are clean, well-formatted, straightforward cases, the model doesn't learn how to handle messy input. Include at least one difficult example.

On the structured output side, over-specifying the JSON schema is a common problem. If your schema has 50 fields, the model will struggle to fill them all accurately. Break complex extractions into multiple calls. A series of focused extractions is more reliable than one massive one.

And always validate the structured output your code receives. Just because you requested JSON doesn't mean the model will always produce valid JSON, especially with edge case inputs. Validate the schema before your code tries to use it.

## The meta-observation

I think prompt engineering as a distinct discipline is already merging with software engineering. The patterns in this article aren't tricks or hacks. They're design patterns for a new kind of interface: the natural language interface between your code and a language model.

**The businesses that get the most out of AI aren't the ones with the fanciest models. They're the ones that have figured out how to talk to those models reliably.** Not cleverness. Reliability. That's what these patterns are for.
