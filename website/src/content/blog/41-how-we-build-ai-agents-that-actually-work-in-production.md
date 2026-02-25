---
title: "How we build AI agents that actually work in production"
subtitle: "The gap between a demo agent and a production agent is bigger than most people think"
date: 2026-01-27
author: g
category: behind-the-agent
tags: ["ai agents", "architecture"]
excerpt: "Demo agents are easy. Production agents are hard. Here's how we build AI agents that survive contact with real users, real data, and real business stakes."
featured_image: "/images/blog/41-how-we-build-ai-agents-that-actually-work-in-production-art.png"
featured_image_alt: "A layered architecture diagram showing the components of a production AI agent"
featured: false
draft: false
---

Every AI agent demo looks incredible. The founder types a natural language request, the agent processes it flawlessly, and the audience claps. Thirty minutes later, someone tries the same agent with slightly messy input and it falls apart.

We've built enough agents at this point to know that **the demo is maybe 15% of the work.** The other 85% is everything that makes the agent survive contact with real users, real data, and the thousand edge cases nobody thought about during the pitch meeting.

This is the article we wish someone had written for us two years ago. Not an architecture overview for a whiteboard session, but the actual patterns and lessons from putting agents into production where they handle real business data with real stakes.

## The demo-to-production gap

A demo agent needs to handle one happy path convincingly. A production agent needs to handle every path gracefully, including the ones you didn't anticipate.

Here's what a demo agent typically looks like: a system prompt, a model API call, maybe a tool or two, and a nice frontend. It works because the person demoing it knows exactly what inputs to give it. The data is clean. The use case is narrow. Nobody's trying to break it.

A production agent adds roughly six layers on top of that foundation. Each one is boring compared to the core AI capability. Each one is absolutely necessary.

## Structured error handling

The first thing that breaks in production is error handling. LLM API calls fail. Tool calls return unexpected data. External services go down. Rate limits get hit during peak hours.

A demo agent crashes or hangs when any of these happen. A production agent needs a plan for every failure mode.

Our approach: **every external call gets wrapped in a retry-with-backoff pattern, and every tool call returns structured results that include both the outcome and its confidence level.** When a tool call fails, the agent doesn't just retry blindly. It evaluates whether to retry, try an alternative approach, or escalate to a human.

This sounds straightforward, but it requires thinking about failure modes before they happen. We maintain a failure taxonomy for every agent we build: network failures, authentication failures, data validation failures, model refusals, timeouts, upstream service degradation. Each category gets its own recovery strategy.

The pattern we keep coming back to is a circuit breaker for external tool calls. If a particular tool fails three times in a row, the agent stops trying to use it and switches to a fallback behavior. Maybe that's using cached data. Maybe it's asking the user for information instead of looking it up. Maybe it's escalating. But it's never "spin in a loop until the timeout kills you."

## Memory management

Every agent conversation accumulates context. In a demo, conversations are short and context stays small. In production, conversations stretch across sessions, reference previous interactions, and need to recall decisions made weeks ago.

We break memory into three tiers.

Working memory is the current conversation context, whatever fits in the model's context window. We aggressively summarize older messages to keep this window useful rather than stuffed with noise.

Session memory persists across a single interaction session. If someone steps away for lunch and comes back, the agent remembers what they were working on. We store this as structured data (not raw conversation history) so the agent can quickly reload relevant context.

Long-term memory captures patterns, preferences, and facts that matter across sessions. This client always wants reports in a specific format. This user prefers concise responses. The Q4 budget numbers were updated last Tuesday. We store this in a vector database with careful attention to what gets saved and what gets forgotten.

Here's the thing. **Memory isn't free, and more memory isn't always better.** An agent that tries to remember everything becomes slow and confused. We prune aggressively. If a piece of information isn't going to change the agent's behavior in a future session, it doesn't get stored.

## Guardrails

This is the layer that keeps you out of the news.

Guardrails define what the agent is allowed to do, what it's never allowed to do, and the gray area in between where human judgment is needed.

Input guardrails filter what the agent will even attempt to process. If someone asks your customer service agent to write poetry or help with their homework, the agent should politely decline and redirect. These are straightforward pattern-matching rules combined with a lightweight classifier that catches the subtler cases.

Process guardrails limit what the agent can do during execution. Can it send emails without approval? Can it modify database records? Can it access financial data? We define a permission model for every agent, and the default is restrictive. **Start with the agent being allowed to do almost nothing, then open up permissions as you build confidence.** The reverse approach (start open, lock down after incidents) is how you get data breaches.

Output guardrails check what the agent produces before it reaches the user. Factual accuracy checks against known data, tone checks, PII detection. The agent shouldn't be returning social security numbers in a chat response, even if they're in the underlying data.

We've seen organizations skip output guardrails because "the model is good enough." It usually is, 99% of the time. That 1% is the one that ends up on Twitter.

## Human escalation

Every production agent needs an escape hatch. When the agent doesn't know the answer, when the stakes are too high for automated handling, when the user explicitly asks for a human: the handoff needs to be smooth.

We design escalation as something you plan for from day one, not something you bolt on after the first incident.

The agent needs to know when it's uncertain. We calibrate confidence thresholds for each decision type. If the confidence score drops below the threshold, the agent doesn't guess. It escalates. Getting these thresholds right is one of the hardest calibration challenges we deal with.

The handoff has to preserve context. When a human takes over, they shouldn't have to ask the customer to repeat everything. The agent packages the conversation summary, the actions it already took, the reason for escalation, and any relevant account data into a structured handoff document.

And the human needs to be able to hand back. After the human resolves the tricky part, the agent picks the conversation back up. This requires a clear protocol for how the human signals "I've handled this, here's what I did, you can take it from here."

## Monitoring and observability

You can't improve what you can't measure. In production, we instrument everything.

Latency tracking per step: how long did the LLM call take? The tool calls? The total response time? If response times creep up, you need to know before your users start complaining.

Cost tracking per conversation: every LLM call has a price, and some conversations burn through tokens faster than others. We track cost per conversation, cost per resolution, and cost per tool use. This data drives decisions about when to use a cheaper, faster model versus when the task genuinely needs the expensive one.

Quality metrics that actually tell you something: user satisfaction, task completion rate, escalation rate, and (critically) "did the agent do the right thing?" That last one requires sampling conversations and having humans evaluate them. Which brings us to testing.

Drift detection is the one most people forget. Model behavior changes over time, both because providers update their models and because your data changes. We set up automated checks that flag when agent behavior starts deviating from established baselines.

## The testing problem

This is the part that makes everyone uncomfortable. How do you test something that, by design, produces different outputs for the same inputs?

We'll be honest: nobody has this fully figured out. But here's what works for us.

Start with deterministic tests for deterministic components. Tool calls, data retrieval, permission checks, input validation: all of these can be tested conventionally. The non-deterministic part is the LLM reasoning layer, and it sits on top of a foundation that should be solid and well-tested.

Then there's golden dataset testing. We build a dataset of input-output pairs that represent expected behavior. Not exact string matches, but behavioral assertions: "Given this input, the agent should use tool X" or "Given this input, the agent should escalate." We run this dataset against every model update and every prompt change.

Adversarial testing is where we spend time trying to break the agent. Contradictory instructions, edge case inputs, attempted jailbreaks, inputs in unexpected languages, extremely long messages, empty messages. If a tester can break it, a user will break it. We maintain a growing library of adversarial test cases for every agent we deploy.

Shadow mode deployment is probably the most valuable pattern. Before going fully live, we run the new agent version in parallel with the existing one (or with human handlers). The agent processes the same inputs and generates responses, but those responses don't go to the user. We compare the agent's intended actions against what actually happened. This catches problems before they reach real users.

After deployment, we rely on statistical monitoring. If the task completion rate drops by more than a few percentage points, something changed and we investigate. This is the closest thing to a "regression test" for non-deterministic systems.

## What it looks like when it all runs together

The actual execution flow for a production agent goes roughly like this: user input arrives, hits the input guardrails, the agent loads relevant memory across all three tiers, the LLM reasons about the input and decides on a plan, each step goes through permission checks, tool calls execute with error handling and circuit breakers, results get validated against output guardrails, the response goes to the user (or escalates to a human), memory gets updated, and monitoring captures the full trace.

Several of those steps repeat within a single interaction. **The AI model is one component in a larger system.** The model does the reasoning. Everything else keeps the reasoning safe, reliable, and observable.

## What this means for your project

If you're building an agent (or hiring someone to build one), ask about these layers. If the conversation is all about the AI model's capabilities and nothing about error handling, memory, guardrails, escalation, monitoring, and testing, you're looking at a demo, not a production system.

The model is the easy part. The infrastructure that turns a model into a reliable business tool is where the real engineering happens. That's not a knock on AI models. They're genuinely impressive. But deploying AI in production is a systems engineering challenge as much as it is a machine learning one.

Our approach evolves with every deployment. But these six layers have been consistent across every agent that's made it past the demo stage and into the hands of people who depend on it for their actual work.

The question to ask isn't "what can this agent do in a demo?" It's "what happens when something goes wrong at 2 AM on a Saturday?"
