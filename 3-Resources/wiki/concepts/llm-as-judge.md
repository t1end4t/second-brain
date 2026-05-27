# LLM-as-Judge

## Definition
Using large language models to evaluate text quality, authenticity, or other properties through structured prompting with explicit rubrics. For AI-content detection, LLM-as-judge is never a standalone detector but provides interpretable, feature-grounded rationales, chain-of-verification loops, and span-level localization that statistical classifiers cannot.

## Key Principles
- **Never standalone**: naïve "is this AI-generated?" prompting produces unusable detectors (GPT-4 labeled 97–100% of inputs as AI in Bhattacharjee & Liu 2024)
- **Three valid uses**: (1) interpretable rationales an editor can audit, (2) chain-of-verification over citations/methodology, (3) span-level localization in mixed documents
- **Decompose into orthogonal sub-judges**: one prompt each for lexical tells, burstiness, citation integrity, methodology specificity; combine via weighted mean or meta-classifier
- **Self-consistency**: run same prompt N=5–10 times at temperature 0.7, take majority vote or voting proportion as confidence (Wang et al., arXiv 2203.11171)

## Limitations
- **Systematically overconfident**: judges exhibit self-preference bias (Koike et al. 2024), preferring text from models in their own family
- **Defeated by humanizers**: zero-shot LLM-judge prompting lost 39.3% AUROC on average under adversarial perturbation (DetectRL, Wu et al., NeurIPS 2024)
- **Cost**: GPT-4-class judge with self-consistency N=10 + chain-of-verification over 5,000-word paper runs $0.30–$2 and 20–90 seconds per document (2026 prices)

## Chain-of-Verification (Dhuliawala et al., ACL Findings 2024)
Materially reduces hallucinated accusations:
1. Draft initial judgment
2. Generate verification questions from suspicions
3. Answer each question in isolation (yes/no, grounded in verbatim quotes)
4. Regenerate judgment grounded only on verified answers
5. Emit `citations_to_verify_externally` for downstream agents

## Production Rubric Prompt Structure
```
TASK: Score passage against 6 orthogonal stylometric rubrics
RUBRICS (0.0–1.0, 1.0 = strong AI signal):
  R1_lexical_tells, R2_burstiness, R3_transition_uniformity,
  R4_hedging, R5_paragraph_uniformity, R6_specificity_deficit

INSTRUCTIONS:
  1. Read passage end-to-end before scoring
  2. Extract ≤3 evidence spans (verbatim) with character offsets per rubric
  3. Compute each rubric subscore independently
  4. overall_confidence calibrated against 10–30% base rate
  5. One-sentence dissent (strongest reason this might be human)
  6. If <120 words, cap confidence at 0.4, set insufficient_evidence=true
  7. Do NOT penalize non-native English phrasing (HUMAN signals)

OUTPUT: strict JSON with rubrics{score, evidence[]}, overall_confidence,
        dissent, insufficient_evidence, recommended_action
```

## Span-Localization Prompt
- Compute per-sentence features internally
- Emit contiguous spans with `driving_features` and `esl_protection_applied` flags
- Require ≥2 independent features to co-fire before flagging
- Never mark math/tables/code as AI
- Lower AI-confidence by 0.3 on spans showing L2 irregularities

## Related Sources
- [[../_sources#catching-ghostwriters-ai-detection-editorial-system]] — production rubric prompt and chain-of-verification design

## Related Concepts
- [[stylometric-analysis]]
- [[ai-generated-text-detection]]
- [[multi-agent-detection-systems]]

## Open Questions
- Can smaller open-source LLMs (Llama 4, Qwen 3) match frontier models for judge quality at lower cost?
- How to calibrate judge confidence across disciplines with different rhetorical norms?
