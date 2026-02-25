---
title: "Your company probably doesn't need a custom AI model"
subtitle: "The 'build your own' hype is costing businesses money they don't need to spend"
date: 2025-12-19
author: g
category: honest-take
tags: ["ai strategy", "honest take"]
excerpt: "Custom AI models sound impressive. For 90% of small and mid-sized businesses, off-the-shelf tools and better prompts will get you further, faster, and cheaper."
featured_image: "/images/blog/17-your-company-probably-doesnt-need-a-custom-ai-model-art.png"
featured_image_alt: "A simple toolbox sitting next to a complex industrial machine, both solving the same problem"
featured: false
draft: false
---

Someone pitched you on a custom AI model. Maybe it was a vendor, a consultant, or that friend-of-a-friend who "does AI." The pitch went something like this: "Off-the-shelf tools are generic. Your business is unique. You need a model trained on your data, tailored to your workflows, built specifically for you."

It sounds compelling. It also costs $50,000 to $500,000, takes months to build, requires ongoing maintenance, and solves a problem that a well-crafted prompt and an existing tool could handle in an afternoon.

I've watched this story play out enough times to say it directly: **for 90% of small and mid-sized businesses, a custom AI model is the wrong investment.** Not because custom models are bad. They're genuinely powerful in the right context. But that context is far narrower than the people selling them want you to believe.

## What "custom model" actually means

Before we go further, let's clear up the terminology. When vendors talk about custom AI models, they usually mean one of three things, and the differences matter enormously.

**Fine-tuning**: Taking an existing model (like GPT-4 or Claude) and training it further on your specific data. This teaches the model patterns and language unique to your business. Cost: $10,000 to $100,000+, depending on data volume and complexity. Timeline: weeks to months.

**Custom training from scratch**: Building a model from the ground up for your specific use case. This is what companies like Google and Meta do. Cost: millions. Timeline: months to years. If someone is pitching this to a 50-person company, walk away.

**Retrieval-augmented generation (RAG)**: Connecting an existing model to your company's documents and data so it can reference your information when answering questions. This is technically not a "custom model" at all, but it gets sold as one constantly. Cost: $5,000 to $50,000. Timeline: days to weeks.

Here's what most SMBs actually need: **better prompts, the right off-the-shelf tool, or at most, a RAG system that connects an existing model to their company knowledge.** That covers roughly 90% of the use cases we encounter.

## Why off-the-shelf tools work for most businesses

The current generation of AI tools is remarkably capable out of the box. ChatGPT, Claude, Gemini, and their competitors have been trained on enormous datasets. They're good at writing, summarizing, analyzing, translating, coding, researching, and dozens of other tasks that businesses need done every day.

The gap between what these tools can do and what most businesses need is much smaller than the "custom model" pitch suggests.

Consider document processing. An accounting firm generates hundreds of client letters, summaries, and reports each month. A vendor pitches a custom model trained on the firm's historical documents to match their exact tone and format. Cost: $30,000 plus $5,000 per year in maintenance.

The alternative? A well-structured prompt template that includes the firm's style guide, preferred format, and a few examples of their best work. Feed it into Claude or GPT-4. Cost: the monthly subscription the firm already pays. Time to set up: an afternoon. Result: 85% to 95% as good as the custom model for a fraction of the cost.

**The last 5% to 15% of quality improvement from a custom model rarely justifies a 50x cost increase for a business of that size.** If you're a hospital processing medical records where that gap has life-or-death implications, the calculation changes. If you're a 40-person marketing firm drafting client proposals, the off-the-shelf tool wins on every practical metric.

## The prompt engineering gap nobody talks about

Here's what we've noticed across dozens of conversations with business owners: most companies that think they need a custom model actually need better prompts.

The difference between a mediocre AI result and an excellent one often comes down to how you ask. A prompt that says "write me a marketing email" will give you generic output. A prompt that says "write a follow-up email to a prospect who attended our webinar on supply chain optimization, referencing the specific pain point they mentioned about inventory forecasting, in a tone that's professional but warm, under 200 words" gives you something you can actually send.

We've seen businesses go from "AI doesn't work for us" to "AI saves us 15 hours a week" by investing a few hours in learning how to write better prompts. No custom model needed. No five-figure investment. Just a better understanding of how to communicate with the tool they already have.

This is one of the reasons we run prompt engineering workshops for teams. It's the highest-ROI AI investment most businesses can make, and it costs a fraction of what a custom model would.

## When custom actually makes sense

We're not anti-custom. There are legitimate situations where a custom model or fine-tuned system is the right call. But they're specific, and if your situation doesn't match these criteria, you should be skeptical of anyone pushing you toward custom.

**Highly specialized domain language.** If your business operates in a field with very specific terminology that general models consistently get wrong (certain areas of law, medicine, scientific research), fine-tuning can improve accuracy meaningfully. The key word is "consistently." If the general model gets it right 80% of the time with a good prompt, fine-tuning might push that to 95%. Whether that gap is worth $50,000 depends on what's at stake.

**Proprietary data as competitive advantage.** If your business has a unique dataset that gives you an edge (years of customer interaction data, proprietary research, specialized market intelligence) and you want an AI system that draws on that data to make decisions or recommendations, a RAG system or fine-tuned model might make sense. But even here, start with RAG. It's faster, cheaper, and gets you 80% of the way there.

**Volume and consistency at scale.** If your team processes thousands of similar items daily (insurance claims, legal documents, support tickets) and the output needs to be consistent to a very tight standard, custom models can deliver value. The volume justifies the cost. A team processing 50 documents a week? Probably not enough volume to make the math work.

**Competitive differentiation.** If AI is core to your product (you're building an AI-first tool for your customers), custom models make strategic sense. If AI is a tool your team uses internally to work more efficiently, off-the-shelf tools are almost always the right starting point.

## The cost reality

Let's talk numbers, because the "custom model" pitch rarely includes the full picture.

**Upfront development**: $20,000 to $200,000+ for fine-tuning, depending on complexity. This covers data preparation (which is often the bulk of the work), training runs, testing, and deployment.

**Ongoing maintenance**: Models drift. Your data changes. The base model gets updated. Plan for $5,000 to $20,000 per year to keep a custom model performing well. Some vendors don't mention this cost until after you've signed.

**Infrastructure**: Custom models need to run somewhere. Cloud hosting for a production model can run $500 to $5,000+ per month, depending on usage and model size.

**Opportunity cost**: The months spent building a custom model are months your team isn't benefiting from AI at all. In that same timeframe, you could have deployed an off-the-shelf tool, trained your team to use it effectively, and started seeing results.

Compare this to the off-the-shelf path: $20 to $200 per month per user for a capable AI tool, plus a few days of training to use it well. **For a 30-person company, a year of an off-the-shelf AI tool with proper training costs less than the deposit on most custom model projects.**

## The honest trade-off

We'll be honest: off-the-shelf tools have real limitations. They don't know your company's history, culture, or internal terminology out of the box. Their output can be generic if you don't invest in good prompts and templates. They sometimes get things wrong in ways that a domain-specific model wouldn't.

The trade-off is real. You're accepting "good enough" instead of "perfect" in exchange for dramatically lower cost, faster time to value, and lower maintenance burden.

For most SMBs, "good enough" is exactly the right target. Perfect is the enemy of deployed. A tool your team uses every day at 90% accuracy is worth infinitely more than a custom model that's 98% accurate but still six months from completion.

The businesses that get the most value from AI aren't the ones with the most sophisticated models. They're the ones whose teams use AI tools fluently, every day, for the tasks that matter most.

## What to do instead of building custom

If you're tempted by the custom model pitch, try this first:

**Step one**: Pick the best off-the-shelf tool for your primary use case. Invest a day in testing two or three options with real tasks from your business.

**Step two**: Spend a week building prompt templates tailored to your specific workflows. Include your style guide, terminology, examples of good output, and any constraints that matter.

**Step three**: Train your team. Not a one-hour overview. Actual hands-on training where every person builds their own workflows and learns to evaluate AI output critically.

**Step four**: Run it for 90 days. Measure the results. Track where the tool falls short.

If after 90 days of disciplined use, you've identified specific gaps that better prompts and off-the-shelf tools genuinely can't close, then have the custom model conversation. You'll be a much better buyer because you'll know exactly what problem you're solving, what "good enough" actually looks like, and whether the custom investment is justified.

Most businesses never get to that point. The off-the-shelf tools, used well, do the job.

And that's a good thing. It means you can spend your AI budget on training your team instead of training a model. In our experience, that's where the real returns come from.
