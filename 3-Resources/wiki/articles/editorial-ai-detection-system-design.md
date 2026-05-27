# Editorial AI-detection System Design

> Synthesis of how to build a defensible multi-agent system for screening academic manuscripts for unacknowledged AI-generated content, based on the "Catching Ghostwriters" technical guide.

## Core Thesis

**Build a multi-agent ensemble, not a classifier.** The most defensible system for editorial screening in 2026 combines commercial detector APIs, open-source statistical detectors, LLM-as-judge with stylometric rubrics, and specialized verification agents. This hybrid is necessary because no single detector is reliable enough: vendor-claimed 99%+ accuracies collapse to 17–50% under light humanization, and detectors systematically false-positive on ESL writers (>60% of TOEFL essays flagged by Liang et al. 2023).

The system must output **evidence packets for editors, not verdicts**, with ESL-bias guardrails, audit trails, and a hard rule that no paper is rejected on detector output alone.

## Why Single Detectors Fail

### Accuracy Collapse Under Adversarial Conditions
- **Perkins et al. (2024)**: six detectors' average accuracy fell from 39.5% to 17.4% after light adversarial editing
- **UChicago BFI 2025** (Jabarian & Imas): only Pangram maintained FPR ≤0.5% with low false negatives; GPTZero FNR rose to ~50% against humanizers
- **RAID benchmark**: Originality.ai mis-flagged 13% of Wikipedia at standard threshold

### Systematic Bias
- **ESL writers**: 19.8% of TOEFL essays unanimously misclassified as AI by all 7 detectors (Liang et al. 2023)
- **Formal writing**: tests flagging the U.S. Constitution illustrate structural formality triggers detectors
- **OpenAI withdrew its own classifier** (July 2023) citing low accuracy

### The Adversarial Arms Race
- **DIPPER** (11B paraphraser): dropped DetectGPT TPR from 70.3% to 4.6% at 1% FPR
- **Commercial humanizers** (StealthGPT, AuthorMist): AuthorMist drops Originality.ai F1 from 0.90 to 0.11
- **Simple attacks**: homoglyph substitution, zero-width spaces, single added space degrade most detectors

## The 7-Agent Architecture

### Orchestration
**LangGraph** with orchestrator-workers topology (Anthropic's "Building Effective Agents"), Langfuse for audit trails. Chosen over CrewAI (weaker logging), AutoGen (drift, ~20 LLM calls vs. 4–6), and OpenAI Agents SDK (vendor lock-in).

### Specialized Agents

1. **Parser**: Docling + GROBID → structured JSON with sections, paragraphs, refs, character offsets
2. **Stylometry**: Binoculars/Fast-DetectGPT (local) + Claude Sonnet 6-rubric JSON
3. **Commercial ensemble**: Pangram + GPTZero + (optional) Originality.ai in parallel
4. **Citation verification**: CrossRef + OpenAlex + Semantic Scholar; flags fabricated refs, uniform density, absence of recent work
5. **Fact-check**: Tavily + PubMed/Europe PMC + entailment verifier; decomposes claims into atomic assertions
6. **Cross-section consistency**: Claude Sonnet 1M-token context; checks Abstract↔Results↔Discussion agreement, sample sizes, figure references
7. **Author-voice**: pgvector lookup vs. author's prior work; stylometric embeddings (not just semantic)

### Arbiter
Claude Opus (one call per manuscript) receives all agent outputs, applies logistic regression stacker over 5 signal sources, Platt-scaled calibration, produces passage-level JSON with evidence + dissent.

## Recommended Stack

### LLMs
- **Default workhorse**: Claude Sonnet 4.6 ($3/$15 per M tokens) for agent reasoning
- **Arbiter**: Claude Opus 4.6 ($5/$25), one call per manuscript
- **Bulk scoring**: Claude Haiku 4.5 ($1/$5) or Gemini 3 Flash ($0.50/$3)
- **On-premise**: Llama 4 Maverick or Qwen 3 (72B/235B MoE) on 2×H100 for unpublished manuscripts

### Statistical Detectors
- **Binoculars** (Hans et al. 2024): best open zero-shot baseline, >90% TPR at 0.01% FPR, runs locally on 7B model
- **Fast-DetectGPT** (Bao et al. 2024): AUROC 0.989 white-box, 340× faster than DetectGPT

### Commercial Detectors
- **Pangram**: best independent accuracy, strongest against humanizers
- **GPTZero**: transparent sentence-level highlights, low native-English FPR
- **Originality.ai**: add if plagiarism/fact-check features needed

### Document Parsing
- **Two-pass**: GROBID for bibliography/section tree (S2ORC approach); Docling (IBM, MIT license, ~3s/page CPU) for body to markdown with preserved offsets
- **Math-heavy**: Marker or Nougat
- **Fallback**: PyMuPDF for text-only

### Storage
- **PostgreSQL + pgvector + pgvectorscale**: author-voice embeddings, metadata, audit logs; single database, transactional consistency
- **Migrate to Qdrant** only if >50M hot vectors or filtered-query latency degrades
- **Embeddings**: `text-embedding-3-large` or `Qwen3-Embedding-8B` for semantic; add stylometric embeddings (POS n-grams, function-word frequencies) as parallel vector

### Privacy
- **Unpublished manuscripts**: cannot be sent to APIs that train/retain; use Anthropic Zero Data Retention, Azure OpenAI, or Gemini via Vertex AI with data residency
- **Commercial detector DPAs**: must specify no storage; GPTZero and Copyleaks support this contractually

## Evaluation Methodology

### Metrics That Matter
- **TPR at FPR ≤1%**: the operating point where editorial review has tolerable cost (not AUROC alone)
- **Policy-cap framework** (Jabarian & Imas 2025): fix acceptable FPR, report miss rate at that cap
- **Expected Calibration Error (ECE)**: editor trust depends on calibrated confidence, not just ranking
- **Separate document-level and passage-level**: they diverge substantially

### Stratified Evaluation Set
Five axes:
1. **Discipline**: CS, biomed, humanities (vocabulary and rhetorical norms differ)
2. **Author L1**: native / ESL
3. **Generator family**: GPT-5, Claude, Gemini, Llama, Qwen
4. **Usage type**: full generation / polishing / back-translation / DIPPER paraphrase / commercial humanizer
5. **Length bin**: short abstracts vs. full papers

Include adversarial variants: StealthGPT-humanized GPT-5, DIPPER 3-round paraphrased Claude, homoglyph-attacked text.

### Public Benchmarks
- **RAID** (Dugan et al., ACL 2024): best adversarial benchmark (6.2M generations, 11 LLMs, 8 domains, 11 attacks)
- **M4GT-Bench** (Wang et al., ACL 2024): 9 languages
- **MAGE** (Li et al., ACL 2024): 27 LLMs × 7 writing tasks
- **GPABench2/CheckGPT** (Liu et al., CCS 2024): academic-writing-specific (2.8M CS/Physics/HSS abstracts)

Weber-Wulff et al. (2023): **none of 14 detectors tested reached 80% accuracy** on mixed academic data.

## Costs

### Per 8,000-Word Manuscript
- **Prompt-only single-LLM**: $0.60–$0.80
- **Multi-agent LangGraph**: $0.85–$1.10 (Sonnet default, Opus arbiter, Tavily fact-check)
- **Hybrid with commercial detectors**: $2.50–$4.00 (GPTZero + Pangram + Originality)

### At Journal Scale (10,000 manuscripts/month)
- **Multi-agent**: $9–11k/month
- **Hybrid**: $25–40k/month
- **Batch APIs** (50% discount on Claude/OpenAI) + **prompt caching** (90% off repeated context) cut 40–60%

## Journal Policies and Ethics

### Publisher Policies (2026)
Every Tier-1 publisher bans AI authorship and requires disclosure but none mandate detector screening:
- **Nature Portfolio**: "LLMs do not satisfy authorship criteria... AI-assisted copy editing does not need to be declared"
- **Science**: full disclosure in cover letter and Methods; reviewers forbidden from uploading manuscripts to LLMs
- **Elsevier, Wiley, Taylor & Francis, IEEE, ACM, COPE, ICMJE**: substantively the same (humans-only authorship, disclose generative use, basic grammar tools exempt)
- **Nature and COPE explicitly note**: detectors are not reliable enough for editorial decisions

### Three Operational Rules
1. **Never use detector output as sole evidence**: corroborate with draft history, version metadata, author communication
2. **Communicate uncertainty as ranges and evidence**: "uniformly low sentence-length variance across section 3, three citations not found" rather than "87% AI probability"
3. **Give authors due process**: chance to respond with specific questions about specific passages, not blanket accusation (Turnitin's own guidance)

### Edge Cases
- **Tortured phrases** (Cabanac et al.): "bosom peril" for breast cancer, "haze figuring" for cloud computing — most reliable papermill indicator; run Problematic Paper Screener and Clear Skies Papermill Alarm alongside AI detection
- **LaTeX-to-text artifacts**: can be mistaken for AI signals; filter before scoring
- **Translated papers**: trigger detectors because translation reduces perplexity like ESL; protect explicitly
- **AI polish vs. AI generation**: near-universal among journal authors; system goal is to distinguish allowed (if disclosed) polish from misconduct (generation passing as human authorship)

## Editor UI Patterns

### Proven Patterns
- **Inline highlighting with hover explanations**: flagged spans color-coded by confidence tier; hovering reveals driving features and evidence (Turnitin's AI indicator; Clear Skies Papermill Alarm)
- **Three-tier confidence bands**: green (pass), yellow (flag for human review), red (escalate to integrity officer); rarely benefit from more than three tiers
- **Section-level heatmap**: left-rail mini-map colored by AI probability; see at a glance whether Methods is uniformly flagged or only one paragraph
- **Mandatory dissent and caveat**: every report includes one-sentence dissent from LLM judge and standing caveat about ESL/formal prose false-positives
- **Escalation to authors with specific questions**: "We noted unusual stylistic uniformity in section 3.2 and three citations we could not locate — please clarify" (mirrors Turnitin's "assume positive intent" guidance)

### Grounding in Features
**Auditable**: "Low burstiness (σ=3.1 vs author historical 7.8), generic transitions (furthermore, moreover used once per paragraph), absence of first-person plural typical of this author, and no methodological specifics"

**Not auditable**: "87% AI probability"

Build the UI around the evidence, not the score.

## Integration

### Submission Systems
- **ScholarOne Relay** (2025): built specifically to embed research-integrity tools at submission; pilot partners include Clear Skies and STM Integrity Hub
- **Editorial Manager**: supports ingest-service integration via Aries partnership
- **OJS**: open plugin API

### Standard Pattern
Manuscript submitted → webhook → your pipeline → JSON report + PDF overlay POSTed back → flags appear in editor dashboard

## MVP and Rollout

### MVP
Stylometry agent + commercial ensemble + arbiter only — catches high-confidence cases.

### Add in Order
1. Citation verification
2. Consistency agent
3. Author-voice agent

### First Month of Production
Build labeled evaluation set from your own submission stream; calibration on your own domain is worth more than any benchmark number.

## Key Insight

The question is not *can you detect AI-written academic text* — at document level, on clean un-humanized output, in a single language, the answer is yes with Pangram or Binoculars.

The real question is *can you build a system defensible enough to act on in editorial practice*, given that false positives harm ESL authors disproportionately, that every serious 2026 manuscript has some AI polish, and that commercial humanizers defeat most single detectors.

The answer is only yes if the system produces **passage-level evidence packets with grounded explanations, runs ensembles that include signals orthogonal to stylometry (citations, consistency, author voice), calibrates to a fixed low-FPR policy cap, and operates as editor-assistance rather than auto-decision**.

**The biggest mistake teams make is treating this as a classification problem; it is an evidence-gathering problem, and the LLM's highest-leverage role is explanation, not detection. Build for the editor's next conversation with the author, not for a number on a dashboard.**

## Related Concepts
- [[../concepts/ai-generated-text-detection]]
- [[../concepts/stylometric-analysis]]
- [[../concepts/llm-as-judge]]
- [[../concepts/multi-agent-detection-systems]]
- [[../concepts/adversarial-robustness-detection]]
- [[../concepts/esl-bias-ai-detection]]
- [[../concepts/citation-verification]]
- [[../concepts/llm-agent-design]]

## Related Sources
- [[../_sources#catching-ghostwriters-ai-detection-editorial-system]] — complete technical guide with implementation details
