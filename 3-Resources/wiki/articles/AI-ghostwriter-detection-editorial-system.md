---
type: resource
topic: ai-detection
project: AI Ghostwriter PDF Detection
source: compass artifact
created: 2026-04-30
---

# Catching ghostwriters: an editorial AI-detection system you can actually build

**Build a multi-agent ensemble, not a classifier.** The most defensible system for editorial screening of academic manuscripts in 2026 combines (a) one or two commercial detector APIs, (b) a small open-source statistical detector like Binoculars or Fast-DetectGPT, (c) an LLM-as-judge layer that produces feature-grounded rationales, and (d) specialized agents that verify citations, check cross-section consistency, and compare against the author's prior work. This hybrid is necessary because **no single detector — commercial or academic — is reliable enough on its own**: vendor-claimed accuracies of 99%+ collapse to 17–50% under light humanization (Perkins 2024; UChicago BFI 2025), and the Stanford Liang et al. 2023 study found seven popular detectors flagged **>60% of TOEFL essays by non-native writers as AI**. The system you build must therefore output *evidence packets for editors*, not verdicts, and must have ESL-bias guardrails, audit trails, and a hard rule that no paper is rejected on detector output alone. The stack below — LangGraph orchestrating specialized agents around Claude Sonnet 4.6, plus GROBID + Docling for PDF parsing, pgvector for author-voice comparison, and a Pangram/GPTZero ensemble — can be built by a small team and costs roughly **$1–$4 per manuscript** at journal scale.

## Why traditional detectors fail and what replaced them

Commercial tools advertise 98–99.98% accuracy (Turnitin, Copyleaks, Winston AI, Pangram). Independent audits tell a different story. The August 2025 University of Chicago Becker Friedman Institute working paper (Jabarian & Imas, BFI #2025-116) tested Pangram, Originality.ai, GPTZero, and RoBERTa on ~4,000 passages across six genres and four frontier LLMs, with and without commercial humanizers like StealthGPT. Only **Pangram maintained a false-positive rate ≤ 0.5%** while keeping false negatives near zero; **GPTZero's false-negative rate rose to ~50% against humanizers**, Originality.ai degraded to 10–40%, and RoBERTa's FPR of 0.30–0.69 made it unusable. Perkins et al. (2024) found six detectors' average accuracy fell from 39.5% baseline to **17.4% after light adversarial editing** of GPT-5/Claude/Gemini output. The RAID benchmark (Dugan et al., ACL 2024) showed **Originality.ai mis-flagged 13% of Wikipedia at its standard threshold**, and synonym-swap attacks cut even Binoculars' accuracy by 36%.

The bias story is worse. Liang et al. (Patterns, 2023) found **19.8% of TOEFL essays were unanimously misclassified as AI by all seven detectors tested**; mechanism is simple perplexity collapse — non-native writers use more predictable vocabulary, which older detectors read as "AI-like". Newer detectors like Pangram claim near-zero ESL FPR on held-out TOEFL sets, but perplexity-based methods still inherit the bias. OpenAI **discontinued its own classifier on July 20, 2023** citing low accuracy — a strong signal from the company that ships the models. For formal writing, the infamous tests flagging the U.S. Constitution as AI-generated illustrate that structural formality alone can trigger positive signals.

The academic research frontier has moved beyond single-score classifiers. **Fast-DetectGPT** (Bao et al., ICLR 2024) uses conditional probability curvature sampling for AUROC 0.989 white-box and 0.934 black-box, 340× faster than DetectGPT. **Binoculars** (Hans et al., ICML 2024) computes the ratio of perplexity from Falcon-7B to cross-perplexity from Falcon-7B-Instruct, achieving **>90% true-positive rate at 0.01% FPR on ChatGPT output** with no training. **Ghostbuster** (Verma et al., NAACL 2024) reached 99.0 F1 across domains using structured search over weak-LM token probabilities. **DeepMind's SynthID-Text** (Dathathri et al., *Nature* 2024) watermarks at generation time via tournament sampling without degrading quality — but it requires generator cooperation and **collapses under paraphrasing and translation** (Sadasivan et al., TMLR 2025, showed five rounds of DIPPER dropped watermark TPR@1%FPR from 99.8% to 15.7%).

Span-level detection — identifying *which passages* in a mixed manuscript are AI-written — is a distinct and harder problem. **SeqXGPT** (Wang et al., EMNLP 2023) frames it as sequence labeling over per-token log-probability features from white-box models. More recent work (M4GT-Bench Task 3; Sci-SpanDet, *Neurocomputing* 2025; Pangram's biomedical window-level deployment flagging 12.4% of 2025 papers) approaches sentence-level F1 in the 0.85–0.92 range on in-distribution data but loses substantial accuracy out-of-distribution. **For editorial use, passage-level detection is essential because most 2026 manuscripts are mixed** — authors draft, then LLM-polish — and a document-level score is almost never actionable.

The adversarial arms race is the dominant reality. **DIPPER** (Krishna et al., NeurIPS 2023), an 11B T5-XXL paraphraser, dropped DetectGPT's TPR from 70.3% to 4.6% at 1% FPR. Commercial humanizers (Undetectable.ai, StealthGPT, HIX Bypass, AuthorMist) are sold specifically to evade detection; **AuthorMist** (arXiv 2503.08716, 2025) drops Originality.ai F1 from 0.90 to 0.11. Silverspeak homoglyph attacks, zero-width space insertion, and even a single added space degrade most RAID detectors. Krishna et al.'s retrieval defense — keeping a database of all LLM generations and searching for near-matches — achieves 80–97% paraphrase recall but requires generator cooperation no one currently offers.

## How to turn an LLM into a defensible judge

The naïve approach — asking GPT-5 or Claude "is this AI-generated?" — produces **unusable detectors** according to Bhattacharjee & Liu (SIGKDD 2024, "Fighting Fire with Fire"). GPT-4 in that study labeled 97–100% of inputs as AI, including human text; ChatGPT had high human recall but caught under 50% of AI generations. On DetectRL (Wu et al., NeurIPS 2024), zero-shot LLM-judge prompting lost **39.3% AUROC on average** under adversarial perturbation. LLM-as-judge is therefore never a standalone detector. It is valuable for three things: producing interpretable, feature-grounded **rationales** an editor can audit, running **chain-of-verification** loops over citations and methodology, and localizing **span-level** shifts in a mixed document.

A capable judge assesses stylometric features that show up consistently in LLM output. The empirical literature has now cataloged specific lexical tells that spiked after ChatGPT's release: Kobak et al. (2024, arXiv 2406.07016) identified 21 focal words with abrupt frequency jumps in PubMed abstracts (*delve, underscore, showcase, intricate, pivotal, tapestry, realm, leverage, elucidate*); Juzek & Ward (COLING 2025) and Matsui (medRxiv 2024) extended this to 75 terms. Phrasal signatures are reliable too — *"it is important to note"*, *"plays a crucial role"*, *"a rich tapestry of"*, *"in the ever-evolving landscape of"*, em-dash overuse between clauses, formulaic transitions (*however, moreover, furthermore*) one-per-paragraph, and uniform parallel list syntax. Academic-specific tells include overly smooth literature reviews (every cited work gets one balanced sentence with no contested claims), generic methodology missing versions/seeds/sample sizes, round-number citation densities, and no citations from the preceding six months or from preprints/dissertations.

Structural features are equally diagnostic. **Burstiness** — variance in sentence length and clause complexity — is low in LLM text (sentence-length standard deviation under ~7 words is a red flag). Paragraph uniformity (every paragraph opens with a topic sentence, expands with 2–3 similar-length supports, closes with a summative sentence) is characteristic. Over-hedging (*may, could potentially, it is possible that*) stacked in one sentence, restatements of the question, and closing meta-sentences ("In summary, we have discussed...") are LLM fingerprints. **Specificity deficit** — no proper nouns, no version strings, no numbers with units, no first-person experiential detail, no acknowledgment of failed experiments — is perhaps the strongest academic-specific signal.

Self-consistency and multi-rubric ensembling convert these signals into calibrated outputs. Wang et al.'s self-consistency approach (arXiv 2203.11171) runs the same prompt N=5–10 times at temperature 0.7 and takes majority vote or voting proportion as confidence. Better: **decompose the judgment into orthogonal sub-judges** (one prompt each for lexical tells, burstiness, citation integrity, methodology specificity) and combine via weighted mean or a trained meta-classifier. Verga et al.'s 2024 "Replacing Judges with Juries" shows multiple small judges outperform a single large one. **Chain-of-Verification** (Dhuliawala et al., ACL Findings 2024) materially reduces hallucinated accusations: draft → generate verification questions → answer each in isolation → regenerate grounded on verified answers.

Here is a production-quality stylometric rubric prompt, designed for editorial use and tested in practitioner writeups. It emits strict JSON with character offsets, per-rubric subscores, evidence spans, a mandatory dissent field, and explicit ESL protection:

```
TASK: Score the passage against six orthogonal stylometric rubrics that distinguish
unacknowledged LLM-generated academic prose from human-authored prose. Ground every
observation in a verbatim quote and its 0-indexed character offsets.

RUBRICS (0.0–1.0, 1.0 = strong AI signal):
 R1_lexical_tells: density of LLM-overrepresented words (delve, underscore, tapestry,
   intricate, meticulous, pivotal, showcase, realm, leverage) and phrases ("it is
   important to note", "plays a crucial role", "a rich tapestry of").
 R2_burstiness: inverse of sentence-length and clause-complexity variance. Flag if
   sentence-length stdev < 7 words OR >80% of sentences share the same syntactic skeleton.
 R3_transition_uniformity: over-reliance on however/moreover/furthermore, one-per-paragraph.
 R4_hedging_and_over_explanation: stacked hedges, meta-summaries, restatements.
 R5_paragraph_uniformity: near-identical topic→support→closer structure; no 1-sentence
   or 8+-sentence paragraphs.
 R6_specificity_deficit: lack of proper nouns, numbers with units, version strings,
   first-person detail, acknowledged messiness.

INSTRUCTIONS:
 1. Read the passage end-to-end before scoring.
 2. For each rubric extract ≤3 evidence spans (verbatim) with offsets.
 3. Compute each rubric subscore as the calibrated probability this rubric ALONE
    indicates AI authorship. Do not combine rubrics.
 4. overall_confidence = probability the passage is unacknowledged LLM-generated,
    calibrated against a base rate of ~10–30% for 2024–26 academic prose (Kobak 2024).
 5. Provide a one-sentence dissent: strongest reason this might be human.
 6. If passage < 120 words, cap overall_confidence at 0.4 and set insufficient_evidence=true.
 7. Do NOT penalize non-native English phrasing, minor grammar errors, or L2 lexical
    simplifications; these are HUMAN signals, not AI signals.

OUTPUT: strict JSON with rubrics{score,evidence[]}, overall_confidence, dissent,
insufficient_evidence, recommended_action ∈ {pass, flag_for_human_review,
request_author_clarification}.
```

A companion **citation-and-methodology chain-of-verification prompt** (verify every suspicion with a yes/no question grounded in verbatim quotes, discard unverified observations, emit `citations_to_verify_externally` for the citation agent) and a **span-localization prompt** (compute per-sentence features internally, emit contiguous spans with `driving_features` and `esl_protection_applied` flags) complete the LLM-judge layer. The span prompt should require ≥2 independent features to co-fire before flagging, should never mark math/tables/code as AI, and should lower AI-confidence by 0.3 on spans that also show L2 irregularities.

LLM-judge limitations must be explicit to editors. Judges are **systematically overconfident**; they exhibit **self-preference bias** (Koike et al. 2024) where they prefer text produced by models in their own family; they are defeated by humanizers; and a GPT-4-class judge with self-consistency N=10 + chain-of-verification over a 5,000-word paper runs **$0.30–$2 and 20–90 seconds per document** in 2026 prices. Cost is tractable at journal scale; inaccuracy is not, which is why the judge must sit inside an ensemble.

## Agent architecture that beats single-model detection

The winning pattern is **Anthropic's orchestrator–workers topology** (from "Building Effective Agents", anthropic.com/research/building-effective-agents), implemented on LangGraph for durable execution, checkpointing, and audit trails. Seven specialized agents cover the evidence surface:

1. **Parser agent** — Docling + GROBID extract sections, paragraphs, references, and character offsets; every downstream output maps back to the PDF.
2. **Stylometry agent** — runs a local open-source classifier (Binoculars, Fast-DetectGPT, or DivEye) for a numeric score, plus one Claude Sonnet call emitting the six-rubric JSON above.
3. **Commercial ensemble agent** — queries two or three of GPTZero, Pangram, and Originality.ai in parallel; stores raw scores.
4. **Citation verification agent** — parses the bibliography, hits CrossRef, OpenAlex, and Semantic Scholar Graph API, and flags: DOIs that 404, author-title-year triples not found in any index, overly uniform citation density (always 2–3 per paragraph), absence of recent (<6-month) or grey-literature citations, and abstracts that don't match how the work is cited.
5. **Fact-check agent** — decomposes results claims into atomic assertions, retrieves evidence via Tavily advanced search + PubMed/Europe PMC, and runs an entailment-style verifier LLM.
6. **Cross-section consistency agent** — uses a full-paper pass in a 1M-token Sonnet context to check that Abstract↔Results↔Discussion numbers agree, sample sizes match, figures referenced in prose actually exist, and terminology is consistent. This often catches AI-authored sections because **AI assistants frequently introduce subtle numeric inconsistencies**.
7. **Author-voice agent** — retrieves the author's prior paragraphs from a pgvector store, computes a stylometric embedding distance, and flags large deviations from historical voice.

An **arbiter node** (Claude Opus 4.6, invoked once per manuscript) receives all agent outputs and produces a calibrated ensemble probability, per-passage flags with evidence, and an editor-facing note. LangGraph's graph-state machine with reducer-based concurrent updates fits this workflow naturally; LangSmith or self-hosted **Langfuse** (Apache 2.0) provides the audit trail publishers require. CrewAI is a faster prototype but its logging/state recovery is weaker; AutoGen's conversational pattern produces ~20 LLM calls per task versus 4–6 for LangGraph and tends to drift; OpenAI's Agents SDK locks you to one vendor. For editorial workflows where determinism and auditability matter, **LangGraph is the default choice**.

Tool APIs are mostly free or cheap. CrossRef and OpenAlex are free (use the polite pool by setting `mailto=`); Semantic Scholar is free with 100 requests per 5 minutes unauthenticated; Unpaywall resolves open-access PDFs. Among web search tools, **Tavily** ($0.008 per credit, 2 credits per advanced search) is LangChain-native and LLM-optimized; Exa's neural search is best for "find semantically similar prior text on the web" (a useful paraphrase defense); Serper is cheapest at high volume. Commercial detector API pricing as of April 2026: GPTZero API plans from ~$45/month for 300k words; Originality.ai Enterprise at $136.58/month for 1.5M words with 365-day history; Pangram contract-priced but has the best independent accuracy numbers; Copyleaks and Winston AI tiered by volume.

Chunking strategy matters. An 8,000-word paper is roughly 11,000 body tokens. Use **paragraph chunks** as the primary unit (aligned to GROBID/Docling paragraph IDs) for LLM-agent inputs, **512-token sliding windows with 128-token stride** for the statistical classifier, **section rollups** (Abstract, Intro, Methods, Results, Discussion) for section-level features, and a single **whole-paper pass** in a 1M-token Sonnet window for the consistency and arbiter agents. **Methods and Related Work sections are the most commonly AI-assisted** — score them separately, not just as part of a document-level average. Preserve character offsets through every transformation; the whole point of the system is to highlight specific passages, and losing offsets loses the product.

Aggregation uses a **logistic regression stacker** over the five signal sources (commercial detector 1, commercial detector 2, local statistical classifier, LLM-judge rubric score, consistency-agent lift), trained on 2,000–5,000 labeled passages per discipline (CS, biomed, humanities — vocabulary and rhetorical norms differ). Calibrate with **Platt scaling or isotonic regression** on held-out academic text that includes both native and ESL authors. Report results under a **policy-cap framework** (Jabarian & Imas 2025): fix an acceptable false-positive rate — 0.5% is a reasonable editorial ceiling — and report miss rate at that cap, rather than raw AUROC. The consistency agent's output should get a **multiplicative lift** rather than additive weight because it measures a different dimension (semantic/structural rather than stylistic).

Output is structured JSON with passage-level granularity — the same schema throughout the system — so it can drive both an API and an editor-facing UI. Core fields per passage: `char_offset_start`, `char_offset_end`, `ai_probability`, `confidence`, `signals{gptzero, pangram, originality, local_classifier, llm_rationale_score}`, `explanation` (natural-language, grounded in specific features with numeric values like `burstiness σ=3.1 vs author historical 7.8`), and `evidence[]` with typed feature records. Document-level fields include `overall.ai_probability`, `policy_cap_fp_rate`, `model_versions`, and per-section breakdowns. A separate `citation_audit` section lists references flagged as possibly fabricated; a `fact_audit` section lists verified/unverified numerical claims.

## Highlighting and explanation that editors will trust

The editor UI must make the evidence visible. Proven patterns from existing tools:

- **Inline highlighting with hover explanations** (Turnitin's AI indicator; Clear Skies Papermill Alarm): flagged spans are color-coded by confidence tier, and hovering reveals the driving features and evidence. Never use a binary red/green without showing *why*.
- **Three-tier confidence bands** (Papermill Alarm's traffic-light model): green (pass), yellow (flag for human review), red (escalate to integrity officer). Editorial workflows rarely benefit from more than three tiers.
- **Section-level heatmap** alongside the inline view: a left-rail mini-map of the paper colored by AI probability, so editors can see at a glance whether the Methods section is uniformly flagged or only one paragraph.
- **Mandatory dissent and caveat text**: every report includes the one-sentence dissent from the LLM judge and the standing caveat that detection is probabilistic and documented to false-positive on formal and ESL prose (Liang et al. 2023).
- **Escalation to authors with specific questions** rather than accusations: "We noted unusual stylistic uniformity in section 3.2 and three citations we could not locate — please clarify your writing and verification process." This mirrors Turnitin's guidance to "assume positive intent" and is the standard due-process posture COPE recommends.

Grounding the explanation in specific linguistic features (not just a probability) is the single biggest UX win. An explanation like *"Low burstiness (σ=3.1 vs author historical 7.8), generic transitions (furthermore, moreover used once per paragraph), absence of first-person plural typical of this author, and no methodological specifics"* is auditable; *"87% AI probability"* is not. Build the UI around the evidence, not the score.

## Recommended stack and costs

**Orchestration.** LangGraph v1 with Langfuse for self-hosted observability. Implement the orchestrator-workers and evaluator-optimizer patterns from Anthropic's guide directly; do not over-abstract.

**LLMs.** Claude Sonnet 4.6 ($3/$15 per million input/output tokens) as the default workhorse for agent reasoning, claim decomposition, and per-passage scoring. Claude Opus 4.6 ($5/$25) as the arbiter only — one call per manuscript. Claude Haiku 4.5 ($1/$5) for cheap parallel sentence scoring where needed. GPT-5 ($0.63/$5) is a viable alternative primary; Gemini 3 Flash ($0.50/$3) is the cheapest capable option for bulk passage scoring. For on-premise deployments where unpublished manuscripts cannot leave the firewall, **Llama 4 Maverick or Qwen 3 (72B or 235B MoE)** on 2×H100 handles ~90% of the workload; reserve frontier API calls for arbitration.

**Statistical detectors.** Binoculars (Hans et al. 2024) is the best open zero-shot baseline at low FPR and runs locally on a 7B model. Fast-DetectGPT is a strong alternative. Both should be wrapped as local microservices.

**Commercial detector ensemble.** Pangram (best independent accuracy, strongest against humanizers per Jabarian & Imas 2025) plus GPTZero (transparent sentence-level highlights, low native-English FPR) is a good default pair. Add Originality.ai if your discipline needs its plagiarism and fact-check features.

**Document parsing.** Two-pass: GROBID for bibliography and section tree (this is what S2ORC uses); Docling (IBM, MIT license, ~3 seconds per page on CPU, excellent tables) for the body to markdown with preserved offsets. Fall back to PyMuPDF for text-only extraction. Use Marker or Nougat for math-heavy papers.

**Storage.** PostgreSQL with `pgvector` + `pgvectorscale` (Timescale) for author-voice embeddings, metadata, and audit logs — single database, transactional consistency, simpler ops. Migrate to Qdrant only if you exceed 50M hot vectors or filtered-query latency degrades. Use `text-embedding-3-large` or self-hosted `Qwen3-Embedding-8B` for semantic; add a stylometric embedding (POS n-grams, function-word frequencies, readability stats) as a parallel vector because pure semantic embeddings miss ghostwriting where the topic matches the author but the voice is AI.

**Privacy.** Unpublished manuscripts cannot be sent to APIs that train on or retain them. Use **Anthropic's Zero Data Retention enterprise tier**, Azure OpenAI, or Gemini via Vertex AI with data residency. Commercial detector DPAs must specify no storage — GPTZero and Copyleaks support this contractually; Originality.ai's 30–365 day history is adjustable at the Enterprise tier. For maximum assurance, run open-source LLMs on internal GPUs.

**Integration.** ScholarOne exposes ScholarOne Relay (2025), built specifically to embed research-integrity tools at submission; pilot partners include Clear Skies and STM Integrity Hub. Editorial Manager supports ingest-service integration via Aries partnership. OJS has an open plugin API. The standard pattern is: manuscript submitted → webhook → your pipeline → JSON report + PDF overlay POSTed back → flags appear in the editor dashboard.

**Cost per 8,000-word manuscript:** prompt-only single-LLM runs **$0.60–$0.80**; the multi-agent LangGraph pipeline runs **$0.85–$1.10** (Sonnet default, Opus for arbiter, Tavily for fact-check); hybrid adding GPTZero + Pangram + Originality runs **$2.50–$4.00**. Batch APIs (50% discount on Claude/OpenAI) and prompt caching (90% off repeated context) cut 40–60% at journal scale; at 10,000 manuscripts per month, the hybrid is roughly $25–40k/month and the pure multi-agent is $9–11k/month.

## Evaluation that reflects real deployment risk

Do not evaluate with AUROC alone. The informative metric is **TPR at FPR ≤ 1%** — the operating point where editorial review has tolerable cost. The Becker Friedman study uses a **policy-cap framework** (fix an acceptable FPR, report miss rate at that cap) and should be the template for your internal evaluation. Also report **Expected Calibration Error (ECE)** and reliability diagrams, because downstream editor trust depends on confidence scores being calibrated, not just ranked.

Your internal evaluation set should be **stratified** on five axes: discipline (CS, biomed, humanities), author L1 (native / ESL), generator family (GPT-5, Claude, Gemini, Llama, Qwen), usage type (full generation / polishing / back-translation / DIPPER paraphrase / commercial humanizer), and length bin. Year-balance the samples to detect drift; Latona et al.'s AI Review Lottery work (arXiv 2405.02150) used 2018–2024 ICLR data specifically to measure FPR drift as human writing itself becomes more LLM-inflected. Include **adversarial variants**: at minimum StealthGPT-humanized GPT-5, DIPPER 3-round paraphrased Claude, and homoglyph-attacked text. Report document-level and passage-level metrics separately; they diverge substantially.

The public benchmarks are useful starting points but are not sufficient. **RAID** (Dugan et al., ACL 2024) is the best adversarial benchmark (6.2M generations, 11 LLMs, 8 domains, 11 attacks); **M4GT-Bench** (Wang et al., ACL 2024) covers 9 languages; **MAGE** (Li et al., ACL 2024) covers 27 LLMs × 7 writing tasks; **GPABench2/CheckGPT** (Liu et al., CCS 2024) is the best academic-writing-specific benchmark (2.8M CS/Physics/HSS abstracts). Weber-Wulff et al. (2023) found **none of 14 detectors tested reached 80% accuracy** on mixed academic data — use that as a sobering baseline.

## Journal policies, ethics, and what the system is actually for

Every Tier-1 publisher in 2026 **bans AI authorship and requires disclosure of AI use** but none mandate detector screening. Nature Portfolio: "LLMs do not satisfy our authorship criteria... AI-assisted copy editing does not need to be declared." Science requires full disclosure in cover letter and Methods and prohibits reviewers from uploading manuscripts to LLMs. Elsevier, Wiley, Taylor & Francis, IEEE, ACM, COPE, and ICMJE all have substantively the same policy: humans-only authorship, disclose generative use in Methods/Acknowledgments, basic grammar tools exempt, reviewers forbidden from feeding manuscripts to public AI tools. **Nature and COPE explicitly note that detectors are not reliable enough for editorial decisions** (manusights.com/blog/nature-ai-policy).

The ethical constraints are sharp. Liang et al.'s 61% FPR on ESL writers means any system deployed without ESL protection will systematically discriminate against non-native-English authors. OpenAI's own 2023 decision to pull its classifier is the instructive precedent: if the company that built the generator could not build a reliable detector, extreme caution is warranted. Recent cases document the harm: the Feb 2024 Retraction Watch "falsely accused of using ChatGPT" story; Kacena et al. (2025) analyzed 19,000 MDPI papers and estimated only **1–3% have undisclosed substantive ChatGPT writing**, suggesting the detector-driven moral panic outpaces actual prevalence in mainstream journals.

Three operational rules follow. **First, never use detector output as sole evidence.** Corroborate with draft history, version metadata, and author communication. Second, **communicate uncertainty as ranges and evidence, not probabilities alone** — an editor should see "uniformly low sentence-length variance across section 3, three citations not found in CrossRef/OpenAlex/Semantic Scholar" rather than "87% AI". Third, **give authors due process**: a chance to respond with specific questions about specific passages, not a blanket accusation. This is the posture Turnitin itself recommends in their own false-positive guidance.

Edge cases matter. **Tortured phrases** (Cabanac et al.: *"bosom peril"* for breast cancer, *"haze figuring"* for cloud computing) are still the most reliable papermill indicator — run the Problematic Paper Screener and Clear Skies Papermill Alarm alongside AI detection, because they catch different frauds. LaTeX-to-text artifacts can be mistaken for AI signals — filter before scoring. Fully translated papers trigger detectors because translation reduces perplexity the same way ESL does — protect them explicitly. AI-assisted polishing of human drafts is now near-universal among journals' author populations; the system's goal should be to distinguish **AI polish of a human draft (allowed if disclosed, often undisclosed)** from **AI generation of substantive content passing as human authorship (misconduct)**. The consistency and citation agents target the second; stylometry alone cannot distinguish the two reliably.

## A concrete reference architecture you can build

```
PDF submission (ScholarOne Relay / Editorial Manager webhook)
        │
        ▼
 [Docling + GROBID]  →  structured JSON: sections, paragraphs, refs, offsets
        │
        ▼
 LangGraph orchestrator  (VPC-isolated, Langfuse audit)
   │
   ├─ Stylometry agent          (Binoculars local + Claude Sonnet 4.6 rubric JSON)
   ├─ Commercial ensemble       (Pangram + GPTZero, Zero Data Retention)
   ├─ Citation verification     (CrossRef + OpenAlex + Semantic Scholar)
   ├─ Fact-check agent          (Tavily advanced + Sonnet 4.6 verifier)
   ├─ Cross-section consistency (Sonnet 4.6, whole-paper 1M context)
   └─ Author-voice agent        (pgvector lookup vs prior work)
        │
        ▼
  Arbiter (Claude Opus 4.6, one call)
   - logistic-regression stacker over signals
   - Platt-scaled calibrated probability
   - passage-level JSON with evidence + dissent
        │
        ▼
 Postgres (metadata + vectors + audit) · S3 Object Lock (signed reports, 7+ yr)
        │
        ▼
 POST → ScholarOne Relay / Editorial Manager
        │
        ▼
 Editor UI: inline highlights, section heatmap, three-tier bands,
            mandatory caveat, author-dialogue template
```

Per-manuscript latency is 20–60 seconds depending on fact-check fan-out; throughput scales linearly with LangGraph worker replicas. Build the MVP as stylometry agent + commercial ensemble + arbiter only — that catches the high-confidence cases. Add citation verification, consistency, and author-voice agents in that order. Spend the first month of production building a labeled evaluation set from your own submission stream; calibration on your own domain is worth more than any benchmark number.

## Conclusion

The question is not *can you detect AI-written academic text* — at document level, on clean un-humanized output, in a single language, the answer is yes with Pangram or Binoculars. The real question is *can you build a system defensible enough to act on in editorial practice*, given that false positives harm ESL authors disproportionately, that every serious 2026 manuscript has some AI polish, and that commercial humanizers defeat most single detectors. The answer there is only yes if the system produces **passage-level evidence packets with grounded explanations, runs ensembles that include signals orthogonal to stylometry (citations, consistency, author voice), calibrates to a fixed low-FPR policy cap, and operates as editor-assistance rather than auto-decision**. That is the architecture above. The biggest mistake teams make is treating this as a classification problem; it is an evidence-gathering problem, and the LLM's highest-leverage role is explanation, not detection. Build for the editor's next conversation with the author, not for a number on a dashboard.