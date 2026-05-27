# Adversarial Robustness in AI Detection

## Definition
The ability of AI-content detection systems to maintain accuracy when text has been deliberately modified to evade detection via paraphrasing tools, commercial humanizers, homoglyph attacks, or other adversarial techniques. The adversarial arms race is the dominant reality of AI detection: most single detectors fail catastrophically under light adversarial modification.

## Key Principles
- **Humanizers defeat most detectors**: commercial tools (StealthGPT, Undetectable.ai, HIX Bypass, AuthorMist) are sold specifically to evade detection
- **Paraphrasing collapses watermarking**: even sophisticated watermarks like SynthID-Text fail under multi-round paraphrasing
- **Simple attacks are surprisingly effective**: homoglyph substitution, zero-width space insertion, single added space degrade most RAID detectors
- **Retrieval-based defenses require generator cooperation**: keeping database of all LLM generations is effective but not currently available

## Adversarial Techniques

### Paraphrasing
- **DIPPER** (Krishna et al., NeurIPS 2023): 11B T5-XXL paraphraser
  - Dropped DetectGPT TPR from 70.3% to 4.6% at 1% FPR
  - 5 rounds of DIPPER dropped SynthID-Text TPR@1%FPR from 99.8% to 15.7% (Sadasivan et al., TMLR 2025)

### Commercial Humanizers
- **StealthGPT**: tested in UChicago BFI 2025 study
- **Undetectable.ai**: commercial evasion tool
- **HIX Bypass**: commercial evasion tool
- **AuthorMist** (arXiv 2503.08716, 2025): drops Originality.ai F1 from 0.90 to 0.11

### Text Obfuscation
- **Silverspeak homoglyph attacks**: substitute visually similar characters from different Unicode blocks
- **Zero-width space insertion**: invisible characters break tokenization
- **Synonym-swap**: cuts Binoculars accuracy by 36%
- **Single added space**: degrades most RAID detectors

### Adversarial Editing
- Perkins et al. (2024): six detectors' average accuracy fell from 39.5% baseline to 17.4% after light adversarial editing of GPT-5/Claude/Gemini output

## Defensive Strategies

### Ensemble Approaches
- Multiple detectors with different failure modes (Pangram + GPTZero + Binoculars)
- Signals orthogonal to stylometry (citations, consistency, author voice)
- Logistic regression stacker trained on adversarial variants

### Retrieval-Based Defense
- **Krishna et al.'s approach**: keep database of all LLM generations, search for near-matches
- **Effectiveness**: 80–97% paraphrase recall
- **Limitation**: requires generator cooperation no one currently offers

### Evaluation Under Adversarial Conditions
- Include adversarial variants in evaluation set: StealthGPT-humanized GPT-5, DIPPER 3-round paraphrased Claude, homoglyph-attacked text
- Report TPR at FPR ≤1% under adversarial conditions, not just clean data
- Use RAID benchmark (6.2M generations, 11 LLMs, 8 domains, 11 attacks)

## Detector Robustness Rankings (Jabarian & Imas 2025)
- **Pangram**: strongest against humanizers, FPR ≤0.5% maintained
- **GPTZero**: FNR rises to ~50% against humanizers
- **Originality.ai**: degrades to 10–40% against humanizers; F1 drops to 0.11 with AuthorMist
- **RoBERTa**: FPR 0.30–0.69, unusable

## Related Sources
- [[../_sources#catching-ghostwriters-ai-detection-editorial-system]] — adversarial arms race analysis and defensive strategies

## Related Concepts
- [[ai-generated-text-detection]]
- [[multi-agent-detection-systems]]

## Open Questions
- Can watermarking schemes be made robust to paraphrasing without generator cooperation?
- What is the equilibrium in the detector-humanizer arms race?
- Are there linguistic invariants that cannot be removed by paraphrasing?
