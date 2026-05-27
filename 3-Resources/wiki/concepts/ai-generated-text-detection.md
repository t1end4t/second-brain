# AI-Generated Text Detection

## Definition
Techniques and systems for identifying text produced by large language models, particularly in academic and editorial contexts. Detection approaches range from statistical classifiers (perplexity-based, zero-shot) to commercial APIs to multi-agent ensembles, but no single method is reliable enough for high-stakes decisions due to adversarial robustness failures and systematic bias against non-native English speakers.

## Key Principles
- **No single detector is sufficient**: vendor-claimed 99%+ accuracies collapse to 17–50% under light humanization (Perkins 2024; UChicago BFI 2025)
- **Document-level scores are not actionable**: most 2026 manuscripts are mixed (human draft + LLM polish), requiring passage-level detection
- **Evidence over verdicts**: defensible systems output evidence packets with grounded explanations, not binary classifications
- **Policy-cap evaluation**: fix acceptable false-positive rate (e.g., 0.5%), report miss rate at that cap rather than raw AUROC

## Detection Methods

### Statistical Classifiers
- **Binoculars** (Hans et al., ICML 2024): ratio of perplexity from Falcon-7B to cross-perplexity from Falcon-7B-Instruct; >90% TPR at 0.01% FPR, no training required
- **Fast-DetectGPT** (Bao et al., ICLR 2024): conditional probability curvature sampling; AUROC 0.989 white-box, 0.934 black-box; 340× faster than DetectGPT
- **Ghostbuster** (Verma et al., NAACL 2024): structured search over weak-LM token probabilities; 99.0 F1 across domains

### Commercial Detectors
- **Pangram**: best independent accuracy per Jabarian & Imas 2025; FPR ≤0.5% with low false negatives; strongest against humanizers
- **GPTZero**: transparent sentence-level highlights; FNR rises to ~50% against humanizers
- **Originality.ai**: mis-flagged 13% of Wikipedia at standard threshold (RAID benchmark)
- **RoBERTa-based**: FPR 0.30–0.69, unusable for editorial purposes

### Watermarking
- **SynthID-Text** (Dathathri et al., *Nature* 2024): tournament sampling at generation time; requires generator cooperation; collapses under paraphrasing (TPR@1%FPR drops from 99.8% to 15.7% after 5 DIPPER rounds)

## Adversarial Vulnerabilities
- **DIPPER** (Krishna et al., NeurIPS 2023): 11B T5-XXL paraphraser dropped DetectGPT TPR from 70.3% to 4.6% at 1% FPR
- **Commercial humanizers** (StealthGPT, Undetectable.ai, AuthorMist): AuthorMist drops Originality.ai F1 from 0.90 to 0.11
- **Simple attacks**: homoglyph substitution, zero-width space insertion, single added space degrade most RAID detectors
- **Synonym-swap**: cuts Binoculars accuracy by 36%

## Related Sources
- [[../_sources#catching-ghostwriters-ai-detection-editorial-system]] — comprehensive system design for editorial AI detection

## Related Concepts
- [[stylometric-analysis]]
- [[llm-as-judge]]
- [[multi-agent-detection-systems]]
- [[adversarial-robustness-detection]]
- [[esl-bias-ai-detection]]

## Open Questions
- Can retrieval-based defenses (database of all LLM generations) scale without generator cooperation?
- How to detect AI polish vs. AI generation of substantive content?
- What is the actual prevalence of undisclosed AI-generated content in mainstream journals? (Kacena et al. 2025 estimate 1–3% for MDPI)
