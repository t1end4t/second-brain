# Stylometric Analysis

## Definition
Quantitative analysis of writing style features to distinguish human-authored from LLM-generated text. Focuses on measurable patterns in lexical choice, sentence structure, paragraph organization, and specificity that differ systematically between human and machine-generated prose.

## Key Principles
- **Burstiness**: variance in sentence length and clause complexity; LLM text has low burstiness (sentence-length stdev <7 words is a red flag)
- **Lexical tells**: overrepresented words and phrases that spiked after ChatGPT release (delve, underscore, tapestry, intricate, pivotal, "it is important to note", "plays a crucial role")
- **Structural uniformity**: LLM paragraphs follow predictable topic→support→closer patterns; human writing has more variation
- **Specificity deficit**: absence of proper nouns, version strings, numbers with units, first-person experiential detail, acknowledged failures

## Diagnostic Features

### Lexical Tells (Kobak et al. 2024, arXiv 2406.07016)
21 focal words with abrupt frequency jumps in PubMed abstracts post-ChatGPT:
- delve, underscore, showcase, intricate, pivotal, tapestry, realm, leverage, elucidate
- Extended to 75 terms by Juzek & Ward (COLING 2025) and Matsui (medRxiv 2024)

### Phrasal Signatures
- "it is important to note"
- "plays a crucial role"
- "a rich tapestry of"
- "in the ever-evolving landscape of"
- Em-dash overuse between clauses
- Formulaic transitions (however, moreover, furthermore) one-per-paragraph
- Uniform parallel list syntax

### Structural Features
- **Paragraph uniformity**: every paragraph opens with topic sentence, expands with 2–3 similar-length supports, closes with summative sentence
- **Over-hedging**: stacked hedges (may, could potentially, it is possible that) in one sentence
- **Restatements**: restating the question before answering
- **Meta-summaries**: "In summary, we have discussed..."
- **Sentence-length stdev <7 words**: indicates low burstiness

### Academic-Specific Tells
- Overly smooth literature reviews (every cited work gets one balanced sentence, no contested claims)
- Generic methodology missing versions/seeds/sample sizes
- Round-number citation densities
- No citations from preceding 6 months or from preprints/dissertations
- No acknowledgment of failed experiments or messiness

## Production Rubric (6 orthogonal dimensions)
1. **R1_lexical_tells**: density of LLM-overrepresented words/phrases
2. **R2_burstiness**: inverse of sentence-length and clause-complexity variance
3. **R3_transition_uniformity**: over-reliance on however/moreover/furthermore
4. **R4_hedging_and_over_explanation**: stacked hedges, meta-summaries, restatements
5. **R5_paragraph_uniformity**: near-identical structure, no 1-sentence or 8+-sentence paragraphs
6. **R6_specificity_deficit**: lack of proper nouns, numbers with units, version strings, first-person detail

## Related Sources
- [[../_sources#catching-ghostwriters-ai-detection-editorial-system]] — stylometric rubric prompt and feature catalog

## Related Concepts
- [[ai-generated-text-detection]]
- [[llm-as-judge]]

## Open Questions
- How do stylometric features shift as LLMs are trained to avoid these tells?
- Can stylometric embeddings (POS n-grams, function-word frequencies) complement semantic embeddings for author-voice comparison?
