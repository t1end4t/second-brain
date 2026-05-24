---
name: kb-answer
description: Answer complex questions against the compiled wiki. Read wiki articles, synthesize answers, generate outputs (markdown, slides, plots), and file results back into the wiki for future queries.
---

Answer complex questions against the compiled wiki. Read wiki articles, synthesize answers, generate outputs (markdown, slides, plots), and file results back into the wiki for future queries.

## When to use
- User asks a research question about the knowledge base topic
- User wants to explore connections between concepts
- User asks for a comparison, summary, or state-of-the-art overview
- User wants output in a specific format (slides, report, visualization)

## Workflow

### 1. Understand the question
- Identify key concepts, entities, and relationships the question touches
- Determine what format the user wants (text, slides/Marp, matplotlib, report)

### 2. Search the wiki
- Read `wiki/_index.md` to understand the wiki's scope
- Read relevant concept articles from `wiki/concepts/`
- Read relevant articles from `wiki/articles/`
- Check `wiki/_sources.md` for source-level details if needed
- Read only the articles most relevant to the question — don't read everything

### 3. Synthesize the answer
- Combine insights from multiple wiki articles
- Note where sources agree, disagree, or are silent
- Flag any gaps in the wiki's knowledge
- If the wiki is incomplete for this question, note it explicitly

### 4. Generate output
Based on user request:
- **Text/Markdown**: Write a well-structured markdown answer in `3-Resources/outputs/`
- **Slides (Marp)**: Create `3-Resources/outputs/{topic}.md` with Marp format
- **Plots (matplotlib)**: Generate `3-Resources/outputs/{topic}.png`
- **Report**: Create `3-Resources/outputs/{topic}.md` with full analysis

### 5. File the output
- Save output in `3-Resources/outputs/`
- If the answer reveals new insights worth preserving:
  - Create a new article in `wiki/articles/` or update an existing one
  - Update `wiki/_index.md` with the new/updated entry
- This ensures explorations "add up" in the knowledge base

### 6. Output
- Present the answer to the user
- Report: "Answered using {N} wiki articles. Output saved to {path}."
- Suggest 2-3 follow-up questions to explore

## Rules
- At wiki scale (~100 articles, ~400K words), the LLM can read most relevant articles in one pass
- No fancy RAG needed — rely on wiki's auto-maintained index and summaries
- Always cite which wiki articles the answer drew from
- If the question requires information outside the wiki, say so explicitly
- File useful outputs back into the wiki — this is how the KB grows
