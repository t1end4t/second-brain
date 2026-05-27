# AI Content Detection: Agent Strategy & Build Plan

> Synthesized from the knowledge base wiki. Answers: what to build, whether multi-agent is recommended, and how many agents.

## The Core Insight

**This is an evidence-gathering problem, not a classification problem.** The wiki's strongest finding is that no single detector is reliable — vendor-claimed 99%+ accuracies collapse to 17–50% under light humanization (Perkins 2024; UChicago BFI 2025). The LLM's highest-leverage role is **explanation, not detection**.

## What the Wiki Says About Multi-Agent

### The Full Reference Architecture (7 Agents)

The wiki documents a production-grade 7-agent system from the "Catching Ghostwriters" source:

| # | Agent | Tools | Signal Type |
|---|---|---|---|
| 1 | Parser | Docling + GROBID | Structural (sections, offsets) |
| 2 | Stylometry | Binoculars/Fast-DetectGPT + Claude Sonnet rubric | Stylistic |
| 3 | Commercial Ensemble | Pangram + GPTZero + Originality.ai | Independent detector scores |
| 4 | Citation Verification | CrossRef + OpenAlex + Semantic Scholar | Factual (hallucinated refs) |
| 5 | Fact-Check | Tavily + PubMed + entailment verifier | Factual (claim accuracy) |
| 6 | Cross-Section Consistency | Claude Sonnet 1M-token context | Structural (internal agreement) |
| 7 | Author-Voice | pgvector + stylometric embeddings | Behavioral (style departure) |

Plus an **Arbiter node** (Claude Opus, one call per manuscript) using logistic regression stacker over 5 signal sources.

### Is Multi-Agent Recommended?

**Yes, but with critical caveats from the wiki:**

1. **The wiki's agent design article warns**: multi-agent debate frequently fails to beat single-agent CoT after token-cost normalization. Anthropic documented 10–15× token overhead for multi-agent setups. Multi-agent systems have **low publishability** in 2025–2026 due to reviewer fatigue.

2. **The detection articles insist**: signals orthogonal to stylometry (citations, consistency, author voice) are necessary because stylometry alone is defeated by humanizers. This inherently requires multiple specialized components.

3. **The reconciliation**: multi-agent is the right architecture for detection quality, but you should **build incrementally**, not all 7 agents at once.

### The Wiki's Recommended Build Order

From `editorial-ai-detection-system-design.md`:

> **MVP**: Stylometry agent + commercial ensemble + arbiter only — catches high-confidence cases.
>
> **Add in order**: 1) Citation verification, 2) Consistency agent, 3) Author-voice agent

## Recommended Build Plan (Based on Wiki Evidence)

### Phase 1: Single Agent, 4 Capabilities (Your Current Scope)

This aligns with your DEC-001 decision to simplify. Build **one agent** with these internal capabilities:

| Capability | Wiki Source | Implementation |
|---|---|---|
| **Passage Segmenter** | Parser agent design | Split into sections/paragraphs with character offsets |
| **Stylometric Heuristics** | Stylometric analysis article | 5 rules: burstiness (σ<7 words = red flag), lexical tells (Kobak 21 words + extended 75), phrasal signatures, structural uniformity, specificity deficit |
| **LLM-Judge Rubric** | LLM-as-judge article | 6-rubric scoring (R1–R6), chain-of-verification, span-localization, mandatory dissent, ESL protection |
| **Citation Sanity** | Citation verification article | DOI resolution, author-title-year triple via CrossRef/OpenAlex/Semantic Scholar, pattern flags |

**Output**: passage-level evidence packets with grounded explanations, not scores.

### Phase 2: Add Independent Signals (When Needed)

| Agent | When to Add | Why |
|---|---|---|
| **Commercial Ensemble** | When you need independent signal sources | Pangram + GPTZero have different failure modes; Pangram is strongest against humanizers |
| **Cross-Section Consistency** | When checking full papers | AI introduces subtle numeric inconsistencies (Abstract↔Results↔Discussion) |

### Phase 3: Full Ensemble (Production Only)

| Agent | When to Add | Why |
|---|---|---|
| **Author-Voice** | When prior writing samples exist | Embedding distance from historical voice; requires pgvector store |
| **Fact-Check** | When factual accuracy matters | Decomposes claims into atomic assertions, verifies against PubMed/web |
| **Arbiter** | When combining 3+ signal sources | Logistic regression stacker with Platt-scaled calibration |

## Critical Design Principles (From Wiki)

### 1. Evidence Over Verdicts
- Output: "uniformly low sentence-length variance across section 3, three citations not found"
- Never: "87% AI probability"
- Build for the editor's next conversation with the author

### 2. ESL Protection (Non-Negotiable)
From the ESL bias article: 19.8% of TOEFL essays unanimously misclassified as AI by all 7 detectors.
- Never penalize non-native English phrasing — these are **human signals**
- Lower AI-confidence by 0.3 on spans showing L2 irregularities
- Require ≥2 independent features to co-fire before flagging
- Report FPR separately for ESL authors

### 3. Adversarial Awareness
From the adversarial robustness article:
- DIPPER drops DetectGPT TPR from 70.3% to 4.6%
- AuthorMist drops Originality.ai F1 from 0.90 to 0.11
- Simple attacks (homoglyph, zero-width spaces) degrade most detectors
- Ensemble with different failure modes is the only defense

### 4. Evaluation That Matters
From the detection methods article:
- **TPR at FPR ≤1%**: the operating point for editorial review (not AUROC alone)
- **Policy-cap framework**: fix acceptable FPR, report miss rate
- **Stratify on**: discipline, author L1, generator family, usage type, length bin
- Include adversarial variants in test set

### 5. Three Operational Rules
1. Never use detector output as sole evidence
2. Communicate uncertainty as ranges and evidence, not probabilities
3. Give authors due process — specific questions about specific passages

## Cost Estimates (From Wiki)

| Approach | Per 8,000-word manuscript |
|---|---|
| Single LLM prompt-only | $0.60–$0.80 |
| Multi-agent LangGraph (Sonnet + Opus arbiter) | $0.85–$1.10 |
| Hybrid with commercial detectors | $2.50–$4.00 |

## Stack Recommendations (From Wiki)

### LLMs
- **Default**: Claude Sonnet 4.6 ($3/$15 per M tokens)
- **Arbiter**: Claude Opus 4.6 ($5/$25), one call per manuscript
- **Bulk**: Claude Haiku 4.5 ($1/$5) or Gemini 3 Flash ($0.50/$3)
- **On-premise**: Llama 4 Maverick or Qwen 3 (72B/235B MoE) for unpublished manuscripts

### Statistical Detectors
- **Binoculars**: best open zero-shot baseline, >90% TPR at 0.01% FPR, runs locally on 7B model
- **Fast-DetectGPT**: AUROC 0.989 white-box, 340× faster than DetectGPT

### Commercial Detectors
- **Pangram**: best independent accuracy, strongest against humanizers
- **GPTZero**: transparent sentence-level highlights, low native-English FPR

### Orchestration
- **LangGraph** (default): graph-state machine, reducer-based concurrent updates, checkpointing, audit trails
- Avoid: CrewAI (weaker logging), AutoGen (drift, ~20 LLM calls vs. 4–6), OpenAI Agents SDK (vendor lock-in)

## Gaps in the Wiki

1. **No implementation code** — the wiki is design-level, no actual agent implementations yet
2. **Dangling reference** — `project.md` references a second raw source that doesn't exist in the vault
3. **No evaluation dataset** — building a stratified evaluation set is listed as "Later" in tasks
4. **Discipline-specific calibration** — wiki notes this as an open question; no guidance on how to calibrate for your specific domain

## Summary Answer

| Question | Answer (from wiki) |
|---|---|
| Is multi-agent recommended? | **Yes for detection quality**, but build incrementally. Start with 1 agent, graduate to multi-agent when you need orthogonal signals. |
| How many agents should I build? | **Start with 1** (segmenter + stylometric heuristics + LLM-judge rubric + citation checks). Add agents 2–3 (commercial ensemble, consistency) only when needed. Full 7-agent system is production-grade, not MVP. |
| What's the biggest risk? | ESL false positives and adversarial defeat. Build ESL protection and evidence-packet output from day one. |
| What's the key insight? | Build for the editor's conversation with the author, not for a number on a dashboard. |

---

## Wiki Articles Used (8)

- `concepts/ai-generated-text-detection`
- `concepts/stylometric-analysis`
- `concepts/llm-as-judge`
- `concepts/multi-agent-detection-systems`
- `concepts/adversarial-robustness-detection`
- `concepts/esl-bias-ai-detection`
- `concepts/citation-verification`
- `concepts/llm-agent-design`
- `articles/editorial-ai-detection-system-design`

## Suggested Follow-Up Questions

1. **What are the first 5 stylometric heuristics to implement?** — Deep dive into the specific features from the stylometric analysis article, with implementation guidance.
2. **How should the LLM-judge rubric prompt be structured?** — Detailed prompt engineering based on the production rubric from the LLM-as-judge article.
3. **What evaluation methodology should I use for the MVP?** — Policy-cap framework, stratified evaluation set design, and benchmark selection.
