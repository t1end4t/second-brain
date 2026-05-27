# ESL Bias in AI Detection

## Definition
Systematic false-positive bias in AI-content detectors against non-native English speakers (ESL writers). Perplexity-based detectors misclassify ESL writing as AI-generated because non-native writers use more predictable vocabulary and simpler syntactic structures, which overlap with LLM output characteristics. This is one of the most serious ethical failures of current detection systems.

## Key Principles
- **Perplexity collapse**: non-native writers use more predictable vocabulary, which older detectors read as "AI-like"
- **Unanimous misclassification**: Liang et al. (Patterns, 2023) found 19.8% of TOEFL essays were unanimously misclassified as AI by all seven detectors tested
- **>60% false-positive rate**: same study found seven popular detectors flagged >60% of TOEFL essays by non-native writers as AI
- **Structural formality triggers detectors**: tests flagging the U.S. Constitution as AI-generated illustrate that formal writing alone can trigger positive signals

## Empirical Evidence

### Liang et al. (Patterns, 2023) - Stanford Study
- **Dataset**: TOEFL essays by non-native English speakers
- **Finding**: 19.8% unanimously misclassified as AI by all 7 detectors
- **Mechanism**: perplexity collapse from predictable vocabulary
- **Implication**: any system deployed without ESL protection will systematically discriminate

### Newer Detectors
- **Pangram**: claims near-zero ESL FPR on held-out TOEFL sets
- **Perplexity-based methods**: still inherit the bias despite improvements
- **Fundamental issue**: overlap between L2 simplifications and LLM characteristics

### OpenAI's Classifier Withdrawal
- **July 20, 2023**: OpenAI discontinued its own classifier citing low accuracy
- **Signal**: if the company that ships the models cannot build a reliable detector, extreme caution is warranted

## Mitigation Strategies

### Rubric-Level Protection
From production stylometric rubric prompt:
```
Do NOT penalize non-native English phrasing, minor grammar errors, 
or L2 lexical simplifications; these are HUMAN signals, not AI signals.
```

### Span-Localization Protection
- Lower AI-confidence by 0.3 on spans that also show L2 irregularities
- Require ≥2 independent features to co-fire before flagging
- Apply `esl_protection_applied` flag in output

### Evaluation Requirements
- Stratify evaluation on author L1 (native / ESL)
- Include TOEFL essays and other L2 writing in test sets
- Report FPR separately for ESL authors
- Use policy-cap framework: fix FPR ≤0.5% for ESL subset, not just overall

### Operational Rules
- **Never use detector output as sole evidence**: corroborate with draft history, version metadata, author communication
- **Give authors due process**: chance to respond with specific questions about specific passages
- **Communicate uncertainty**: "uniformly low sentence-length variance" rather than "87% AI probability"

## Ethical Constraints
- **COPE and Nature explicitly note**: detectors are not reliable enough for editorial decisions
- **Retraction Watch (Feb 2024)**: documented cases of authors falsely accused of using ChatGPT
- **Actual prevalence**: Kacena et al. (2025) estimated only 1–3% of MDPI papers have undisclosed substantive ChatGPT writing, suggesting detector-driven moral panic outpaces actual prevalence

## Related Sources
- [[../_sources#catching-ghostwriters-ai-detection-editorial-system]] — ESL bias analysis and mitigation strategies

## Related Concepts
- [[ai-generated-text-detection]]
- [[stylometric-analysis]]
- [[multi-agent-detection-systems]]

## Open Questions
- Can stylometric features be disentangled from L2 characteristics reliably?
- What is the false-positive rate for ESL authors in current commercial detectors post-2024 improvements?
- Should detectors be prohibited from use in high-stakes editorial decisions without human review?
