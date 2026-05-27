# Citation Verification

## Definition
Automated checking of bibliographic references in academic manuscripts to detect fabricated, hallucinated, or misattributed citations. A key signal for AI-generated content because LLMs frequently hallucinate plausible-sounding but non-existent references, and AI-generated text often exhibits suspicious citation patterns (uniform density, absence of recent work, grey literature gaps).

## Key Principles
- **Hallucinated references are a strong AI signal**: LLMs generate plausible author-title-venue combinations that don't exist
- **Multiple data sources required**: CrossRef, OpenAlex, Semantic Scholar each have different coverage; checking all three reduces false negatives
- **Pattern analysis complements existence checking**: uniform citation density, absence of recent preprints, round-number citation counts are suspicious
- **Abstract mismatch detection**: cited work's actual abstract may not match how it's characterized in the manuscript

## Verification Checks

### Existence Verification
- **DOI resolution**: check if DOI returns 200 (not 404)
- **Author-title-year triple**: verify this combination exists in at least one index (CrossRef, OpenAlex, Semantic Scholar)
- **Venue validation**: confirm journal/conference exists and published the claimed volume/issue

### Pattern Analysis
- **Uniform citation density**: always 2–3 citations per paragraph (suspicious; human writing is more variable)
- **Absence of recent work**: no citations from preceding 6 months (AI training data cutoff signal)
- **Grey literature gaps**: no preprints, dissertations, technical reports (AI tends to cite only published papers)
- **Round-number citation counts**: suspicious if all cited papers have citation counts that are round numbers

### Semantic Verification
- **Abstract mismatch**: retrieve cited paper's abstract, check if it matches how the work is characterized
- **Context appropriateness**: does the citation support the claim being made?
- **Self-citation patterns**: unusual self-citation patterns may indicate AI generation

## Implementation

### APIs and Data Sources
- **CrossRef**: free, use polite pool by setting `mailto=` parameter
- **OpenAlex**: free, comprehensive coverage
- **Semantic Scholar Graph API**: free with 100 requests per 5 minutes unauthenticated
- **Unpaywall**: resolves open-access PDFs for full-text verification

### Agent Architecture
Citation verification agent in multi-agent system:
1. Parse bibliography (GROBID for structured extraction)
2. For each reference:
   - Query CrossRef, OpenAlex, Semantic Scholar in parallel
   - Check DOI resolution
   - Verify author-title-year triple
   - Retrieve abstract if available
3. Analyze citation patterns across whole paper
4. Flag suspicious references with specific reasons
5. Emit `citations_to_verify_externally` for manual review

### Output Schema
```json
{
  "citation_audit": [
    {
      "reference_id": "ref-23",
      "status": "not_found",
      "reason": "Author-title-year triple not found in CrossRef/OpenAlex/Semantic Scholar",
      "doi": "10.1234/fake.2024",
      "doi_status": "404"
    },
    {
      "reference_id": "ref-45",
      "status": "abstract_mismatch",
      "reason": "Cited as 'demonstrating X' but abstract describes Y",
      "actual_abstract": "..."
    }
  ],
  "pattern_flags": [
    "uniform_citation_density",
    "no_recent_citations"
  ]
}
```

## Related Sources
- [[../_sources#catching-ghostwriters-ai-detection-editorial-system]] — citation verification agent design

## Related Concepts
- [[multi-agent-detection-systems]]
- [[ai-generated-text-detection]]

## Open Questions
- What is the false-positive rate for legitimate but obscure references (small workshops, non-English venues)?
- Can citation verification catch "citation laundering" (citing real papers but mischaracterizing them)?
- How to handle preprints that are later withdrawn or substantially revised?
