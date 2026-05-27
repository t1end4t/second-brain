# Multi-Agent Detection Systems

## Definition
Orchestrated ensembles of specialized AI agents that collectively gather evidence for AI-content detection, combining stylometric analysis, commercial detector APIs, citation verification, fact-checking, cross-section consistency checking, and author-voice comparison. Outperforms single-model approaches by incorporating signals orthogonal to stylometry and producing auditable evidence packets rather than opaque scores.

## Key Principles
- **Orchestrator-workers topology** (Anthropic's "Building Effective Agents"): central orchestrator dispatches to specialized agents, aggregates results
- **Evidence gathering over classification**: system produces passage-level evidence with grounded explanations, not binary verdicts
- **Signals orthogonal to stylometry**: citations, consistency, author voice catch AI generation that stylometry alone misses
- **Durable execution with audit trails**: LangGraph for state management, Langfuse for observability

## Reference Architecture (7 Agents)

### 1. Parser Agent
- **Tools**: Docling + GROBID
- **Output**: structured JSON with sections, paragraphs, references, character offsets
- **Purpose**: every downstream output maps back to PDF location

### 2. Stylometry Agent
- **Tools**: Binoculars/Fast-DetectGPT (local) + Claude Sonnet rubric JSON
- **Output**: numeric score + 6-rubric breakdown with evidence spans
- **Purpose**: primary stylistic signal

### 3. Commercial Ensemble Agent
- **Tools**: Pangram + GPTZero + (optional) Originality.ai
- **Output**: raw scores from each detector
- **Purpose**: independent signal sources with different failure modes

### 4. Citation Verification Agent
- **Tools**: CrossRef + OpenAlex + Semantic Scholar Graph API
- **Flags**: DOIs that 404, author-title-year triples not found, uniform citation density, absence of recent (<6-month) or grey-literature citations, abstract mismatches
- **Purpose**: catches fabricated references (AI hallucination signature)

### 5. Fact-Check Agent
- **Tools**: Tavily advanced search + PubMed/Europe PMC + entailment verifier LLM
- **Output**: verified/unverified atomic assertions from results claims
- **Purpose**: catches AI-generated factual errors

### 6. Cross-Section Consistency Agent
- **Tools**: Claude Sonnet with 1M-token context (whole-paper pass)
- **Checks**: Abstract↔Results↔Discussion numbers agree, sample sizes match, figures referenced exist, terminology consistent
- **Purpose**: AI assistants frequently introduce subtle numeric inconsistencies

### 7. Author-Voice Agent
- **Tools**: pgvector store of author's prior work + stylometric embeddings
- **Output**: embedding distance from historical voice
- **Purpose**: detects departure from author's established style

### Arbiter Node
- **Model**: Claude Opus (one call per manuscript)
- **Method**: logistic regression stacker over 5 signal sources
- **Calibration**: Platt scaling or isotonic regression on held-out academic text (native + ESL)
- **Output**: calibrated ensemble probability, per-passage flags with evidence, editor-facing note

## Orchestration Frameworks
- **LangGraph** (default for editorial): graph-state machine, reducer-based concurrent updates, checkpointing, audit trails
- **CrewAI**: faster prototype but weaker logging/state recovery
- **AutoGen**: conversational pattern produces ~20 LLM calls per task vs. 4–6 for LangGraph, tends to drift
- **OpenAI Agents SDK**: locks you to one vendor

## Aggregation Strategy
- **Logistic regression stacker** over: commercial detector 1, commercial detector 2, local statistical classifier, LLM-judge rubric score, consistency-agent lift
- **Training data**: 2,000–5,000 labeled passages per discipline (CS, biomed, humanities)
- **Consistency agent output**: multiplicative lift (not additive) because it measures different dimension (semantic/structural vs. stylistic)
- **Evaluation**: policy-cap framework (fix FPR ≤0.5%, report miss rate)

## Chunking Strategy
- **Paragraph chunks**: primary unit for LLM-agent inputs (aligned to GROBID/Docling paragraph IDs)
- **512-token sliding windows with 128-token stride**: for statistical classifier
- **Section rollups**: Abstract, Intro, Methods, Results, Discussion for section-level features
- **Whole-paper pass**: 1M-token context for consistency and arbiter agents
- **Preserve character offsets**: through every transformation (critical for passage-level highlighting)

## Related Sources
- [[../_sources#catching-ghostwriters-ai-detection-editorial-system]] — complete 7-agent architecture with LangGraph implementation

## Related Concepts
- [[ai-generated-text-detection]]
- [[llm-as-judge]]
- [[llm-agent-design]]
- [[citation-verification]]

## Incremental Build Strategy

Cross-referencing with [[llm-agent-design]] (which warns of 10–15× token overhead and reviewer fatigue for multi-agent systems), the recommended approach is incremental:

1. **Phase 1 (MVP)**: Single agent with 4 internal capabilities (segmenter, stylometric heuristics, LLM-judge rubric, citation checks)
2. **Phase 2**: Add commercial ensemble + cross-section consistency as separate agents
3. **Phase 3 (Production)**: Full 7-agent system with arbiter node

This reconciles the detection quality requirement for multiple orthogonal signals with the engineering overhead of multi-agent orchestration. See `outputs/ai-content-detection-agent-strategy.md` for full analysis.

## Open Questions
- What is the optimal agent ordering for early termination (skip expensive agents if high-confidence early signals)?
- How to handle discipline-specific calibration when training data is sparse?
