# Wiki Index

> Master index of all concepts and articles in this knowledge base.
> Auto-maintained by LLM compile pipeline.

## Concepts

- [[concepts/html-as-output-format]] — Using HTML instead of Markdown as the primary output format for AI agent-generated documents; richer information density, visual clarity, shareability, and interactivity.
- [[concepts/claude-code-workflows]] — Patterns for using Claude Code effectively: planning, code review, prototyping, reporting, and custom editing interfaces.
- [[concepts/interactive-documents]] — HTML documents with JS/CSS that enable two-way interaction; purpose-built editing environments for specific data, not reusable tools.
- [[concepts/inference-time-compute-reasoning]] — Scaling LLM output quality via compute during inference (sampling, search, verification, extended reasoning traces) rather than parameter scaling; compute-optimal allocation, verifier-free plateaus, budget forcing.
- [[concepts/diffusion-language-models]] — Applying the diffusion paradigm to text generation via masked/absorbing diffusion; parallel generation, bidirectional context, publishably immature with first commercial deployments (Mercury, Gemini Diffusion).
- [[concepts/llm-agent-design]] — Architectures, orchestration, memory, tool use, evaluation, and safety for autonomous LLM-based agents; stratified into scaffolds, orchestration, and production layers.
- [[concepts/efficient-llm-serving]] — Techniques for reducing LLM inference cost: quantization (AWQ, QuaRot, SpinQuant), speculative decoding (EAGLE-3), KV-cache optimization (PagedAttention, H2O, SnapKV), pruning, and serving systems.
- [[concepts/rl-for-reasoning]] — RL techniques for eliciting reasoning in LLMs: GRPO, RLVR, process vs. outcome rewards; DeepSeek-R1 as defining result; distillation vs. RL tradeoffs.
- [[concepts/latent-reasoning]] — Performing multi-step reasoning in continuous hidden-state space rather than explicit token sequences; Coconut as pioneering work.
- [[concepts/ai-generated-text-detection]] — Techniques for identifying LLM-generated text in academic manuscripts; no single detector is reliable (17–50% accuracy under humanization), requiring multi-agent ensembles with evidence packets over verdicts.
- [[concepts/stylometric-analysis]] — Quantitative analysis of writing style features (burstiness, lexical tells, paragraph uniformity, specificity deficit) to distinguish human from LLM-generated prose.
- [[concepts/llm-as-judge]] — Using LLMs with structured rubrics to produce interpretable rationales for AI-content detection; never standalone but valuable for chain-of-verification and span-localization.
- [[concepts/multi-agent-detection-systems]] — Orchestrated ensembles of specialized agents (stylometry, commercial detectors, citation verification, fact-check, consistency, author-voice) that outperform single-model approaches.
- [[concepts/adversarial-robustness-detection]] — Ability of AI detectors to maintain accuracy under paraphrasing, humanizers, and text obfuscation; most single detectors fail catastrophically.
- [[concepts/esl-bias-ai-detection]] — Systematic false-positive bias against non-native English speakers; 19.8% of TOEFL essays unanimously misclassified as AI (Liang et al. 2023).
- [[concepts/citation-verification]] — Automated checking of references to detect fabricated/hallucinated citations; key signal for AI-generated content.

## Articles

- [[articles/html-vs-markdown-for-ai-outputs]] — Synthesis of why HTML is replacing Markdown for AI agent outputs; tradeoffs, use cases, and key insight from Claude Code team.
- [[articles/llm-research-directions-comparison]] — Comparative analysis of agents, reasoning/TTC, efficient serving, and diffusion LMs across feasibility, publishability, impact, and risk for compute-constrained researchers.
- [[articles/pre-phd-llm-research-strategy]] — Strategic recommendations for pre-PhD LLM research: anchor in reasoning/TTC, reach into diffusion LMs, opportunistic agent papers; 12-month portfolio plan.
- [[articles/editorial-ai-detection-system-design]] — Synthesis of how to build defensible multi-agent AI-content detection for editorial screening: 7-agent LangGraph architecture, costs, evaluation methodology, ethics.

## Outputs

- `outputs/ai-content-detection-agent-strategy.md` — Agent strategy & build plan: incremental approach from 1 agent (MVP) to 7-agent ensemble (production), reconciling detection quality needs with multi-agent overhead concerns.

## Statistics
- **Concepts:** 16
- **Articles:** 4
- **Raw sources:** 3

---
_Last compiled: 2026-05-27 (updated with AI detection concepts)_
