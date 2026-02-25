---
title: "Building a RAG system your team will actually use"
subtitle: "The architecture is the easy part. Getting people to stop using the shared drive is the hard part."
date: 2026-02-17
author: g
category: behind-the-agent
tags: ["rag", "knowledge management"]
excerpt: "Most RAG systems fail at adoption, not architecture. Here's how to build one that people actually prefer over their old way of finding information."
featured_image: "/images/blog/44-building-a-rag-system-your-team-will-actually-use-art.png"
featured_image_alt: "A search interface returning relevant results from a company knowledge base"
featured: false
draft: false
---

You've probably seen the architecture diagram. Documents go in, they get chunked and embedded, they land in a vector database, and when someone asks a question, the system retrieves the relevant chunks and feeds them to an LLM that produces an answer. Clean, logical, elegant on a whiteboard.

Then you deploy it and discover that the system returns the wrong paragraphs half the time, the answers are confidently wrong, and your team goes back to searching the shared drive because at least they know where things are.

We've built RAG (Retrieval-Augmented Generation) systems for several clients now. The architecture part is well-documented. What's less documented is everything else: the chunking decisions that make or break retrieval quality, the search strategies that actually work, and the UX layer that determines whether anyone uses the thing after the first week. That's what this article covers.

## What RAG is, quickly

If you're new to this: RAG is a way to give an AI model access to your company's specific information. Instead of relying on whatever the model learned during training (which doesn't include your internal docs), the system searches your documents for relevant information and hands it to the model alongside the user's question. The model then generates an answer grounded in your actual data.

Think of it as giving the AI a search engine pointed at your company's knowledge, plus the ability to read the results and summarize them in a useful way.

The promise is real. A well-built RAG system lets anyone on your team ask a natural language question and get an accurate answer pulled from your documentation, policies, product specs, or whatever else you've loaded into it. But "well-built" is doing a lot of heavy lifting in that sentence.

## Chunking: where most RAG systems go wrong first

Before your documents can be searched, they need to be broken into smaller pieces called chunks. The model can't process your entire 200-page policy manual at once (well, some can now, but bear with me). So the system splits documents into chunks, and when someone asks a question, it retrieves the most relevant chunks.

How you split those documents matters enormously.

Fixed-size chunking (split every 500 tokens) is the default in most tutorials and the worst approach for real documents. It splits mid-paragraph, mid-sentence, sometimes mid-thought. The retrieved chunk might contain the end of one section and the beginning of another, which gives the model confusing context.

Semantic chunking is better. It splits documents at natural boundaries: paragraph breaks, section headers, topic changes. This preserves the integrity of each chunk so the model gets a coherent piece of information. More work upfront, but the retrieval quality improvement is significant.

What we actually use for most client deployments is hierarchical chunking. You maintain chunks at multiple levels: section level, paragraph level, and sentence level. The search can match at any level, and the system returns the right amount of context based on the query. A broad question ("What's our refund policy?") pulls a section-level chunk. A specific question ("How many days do customers have to request a refund on annual plans?") pulls a paragraph or sentence.

Here's what we've learned the hard way: **your chunking strategy needs to match how people actually ask questions about your content.** If your team asks broad, conceptual questions, you need larger chunks. If they ask specific, factual questions, you need smaller ones. Most teams ask both, which is why hierarchical chunking works best.

We also add metadata to every chunk: source document, section title, date, document type. This metadata becomes critical for filtering and for showing users where the answer came from (more on that later).

## Embedding model selection

Embeddings are the mathematical representations that let the system compare a user's question to your document chunks. When someone asks "What's our return policy?", the embedding model converts that question into a vector (a list of numbers), then finds the document chunks whose vectors are most similar.

The choice of embedding model matters more than most people realize.

OpenAI's text-embedding-3-large is a solid default. It's accurate, widely supported, and reasonably priced. For most business use cases, it works well enough.

But "well enough" leaves performance on the table. We've gotten noticeably better results with domain-adapted embedding models for clients with specialized vocabularies. A legal firm's documents use language differently than a construction company's. An off-the-shelf embedding model treats both the same, and sometimes that means relevant results get ranked lower than they should.

The honest tradeoff: domain-specific embeddings require more work to set up and maintain, and the improvement is marginal if your documents use standard business language. Start with a general-purpose model, measure retrieval quality, and only invest in a specialized one if the results aren't good enough.

## Beyond vector search: hybrid retrieval

Pure vector search (find the most semantically similar chunks) works well for conceptual questions but struggles with specific lookups. If someone asks for "policy number AX-4722" or "the Q3 2025 revenue figure," vector search might miss it because these are exact-match queries, not semantic ones.

This is why we build hybrid search into every RAG system: vector search for conceptual questions combined with keyword search (BM25) for exact matches. The system runs both searches in parallel and combines the results.

The improvement from adding keyword search is often dramatic. In one deployment, hybrid search improved retrieval accuracy on factual queries by over 40% compared to vector-only search. The team had been frustrated because the system "couldn't find obvious things." The things weren't obvious to vector search. They were exact strings and numbers that keyword search handles easily.

## Re-ranking: the step most tutorials skip

After initial retrieval, you have a list of potentially relevant chunks. The problem is that retrieval casts a wide net. Out of 10 retrieved chunks, maybe 3-4 are genuinely useful for answering the question.

Re-ranking adds a second pass: a more sophisticated model evaluates each retrieved chunk against the specific question and re-orders them by relevance. The top chunks after re-ranking are much more likely to contain the actual answer.

We use a cross-encoder re-ranker (Cohere's Rerank or similar) for most deployments. The latency cost is small (50-100ms) and the quality improvement is noticeable. The model gets better context, which means better answers, which means your team trusts the system more.

Is it strictly necessary? No. But in our experience, re-ranking is the single highest-ROI improvement you can make to a RAG system after getting the basics right. Easy to add, consistently effective.

## The UX layer that makes or breaks everything

Here's the thing. You can nail the architecture. Perfect chunking, great embeddings, hybrid search, re-ranking. If the interface is worse than Ctrl+F in a PDF, nobody will use it.

We learned this the hard way on an early project. The RAG system was technically excellent. Retrieval accuracy was above 90%. But adoption was terrible because the interface felt like a chatbot from 2019. Slow, no source attribution, and the team didn't trust the answers because they couldn't see where the information came from.

What changed everything was source attribution. The system shows which documents and which sections the answer came from, with direct links. If people can't verify the answer, they won't trust it, and if they don't trust it, they won't use it. Some teams told us this single feature was the reason they adopted the system. It's now non-negotiable in every RAG interface we build.

Speed is the other make-or-break factor. If the answer takes more than 3-4 seconds, people switch back to their old method. We optimize aggressively for latency: caching frequent queries, pre-computing embeddings for common questions, using faster models for simple lookups.

Beyond that, we add a thumbs up/down on every answer plus the ability to flag incorrect responses. This gives you a continuous signal about retrieval quality and tells you which documents need better chunking or which topics have gaps. And we always show the concise answer first with the option to expand and see the full source context. Most of the time, the summary is enough. When it isn't, the full context is one click away.

## Common failure modes

Here's what keeps going wrong across deployments.

Stale data is the quiet killer. Your knowledge base was great on day one. Six months later, half the documents are outdated and the system is confidently citing last year's policies. Build an update pipeline from the start. Automate it if possible. At minimum, flag the document date in every answer so users know if they're looking at something current.

Garbage in, garbage out. If your source documents are poorly structured, full of duplicates, or contain contradictory information, the RAG system will faithfully retrieve and cite all of it. We spend significant time on document cleanup before loading anything into the system. This isn't glamorous work, but it's the difference between reliable answers and generated confusion.

Scope creep sneaks in gradually. The system starts as an internal knowledge base for product documentation. Someone asks if it can also handle HR policies. Then legal adds their contracts. Then sales wants their playbook in there. Pretty soon you have a system searching across wildly different document types with different structures and different accuracy requirements. Each expansion dilutes search quality across the whole system unless you handle it carefully with metadata filtering and domain-specific search configs.

And the model hallucinates despite good retrieval. This happens more than we'd like. The retrieved chunks are correct, but the model synthesizes them into an answer that says something the sources don't actually say. We mitigate this with explicit instructions in the system prompt ("Only answer based on the provided context. If the context doesn't contain enough information, say so.") and by running automated checks that compare the answer against the source chunks.

## Testing retrieval quality

You need to measure this, and "it feels right" is not a measurement.

We build a test set of 100+ question-answer pairs drawn from the actual document corpus. For each question, we know which chunks contain the correct answer. We measure two things.

Recall at K: out of the top K retrieved chunks, do the correct ones appear? If not, no amount of model sophistication will save you because the right information never reaches the model.

Answer accuracy: given the retrieved chunks, does the model produce a correct answer? This tests the generation step separately from the retrieval step, so you know where the problem actually lives.

We run these tests after every change to the chunking strategy, embedding model, or search configuration. Retrieval quality can degrade silently if you're not watching it, especially as you add more documents to the system.

## Is it worth the investment?

We'll be honest. A production RAG system takes real time and money to build properly. You're looking at weeks of development, careful document preparation, iterative testing, and ongoing maintenance.

When it works, though, the difference is obvious. Teams that used to spend 20-30 minutes hunting through shared drives for an answer get it in seconds. New employees ramp up faster because the company's knowledge is searchable. Decisions get made based on actual documentation rather than whoever happened to remember the right answer.

The question isn't whether RAG works. It does, and it's gotten much better in the past year. **The question is whether you build it in a way that people actually want to use every day.** If the search is as easy as Google, they will. If it isn't, they won't.
