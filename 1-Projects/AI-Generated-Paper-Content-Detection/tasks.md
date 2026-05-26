# AI-Generated Paper Content Detection — TODO

## Active Phase

Agent scoping + minimal design

### Now
- [ ] Decide whether this should become a Jcode skill, a local prompt pack, or both.
- [ ] Decide MVP input format: markdown/plain text first.
- [ ] Define the simplest useful output format: markdown report vs JSON vs both.
- [ ] Draft a minimal agent prompt that focuses on evidence gathering, not accusations.
- [ ] List the first five stylometric heuristics to implement.

### Next
- [ ] Implement a simple passage segmenter with offsets.
- [ ] Implement basic stylometric heuristics.
- [ ] Add one optional LLM-judge rubric pass with verbatim evidence.
- [ ] Add basic reference/citation sanity checks.
- [ ] Build a compact editor-facing report template.
- [ ] Test on one real markdown file from `3-Resources/raw/`.

### Waiting
- [ ] 

### Later
- [ ] Add PDF ingestion only if needed.
- [ ] Add one open-source detector wrapper if local numeric signal is useful.
- [ ] Add optional consistency checks across sections.
- [ ] Add optional author-voice comparison if prior writing exists.
- [ ] Add tiny evaluation set across human, AI, AI-polished, ESL, and humanized text.

## Done

- [x] 2026-05-22: Simplified project direction to a custom agent for coding agents.
