# RL for Reasoning

## Definition
Reinforcement learning for reasoning refers to the application of RL techniques — particularly GRPO (Group Relative Policy Optimization) and RLVR (RL with Verifiable Rewards) — to elicit and improve step-by-step reasoning capabilities in language models. This sub-area emerged as the dominant post-training paradigm for reasoning after DeepSeek-R1 demonstrated that RL alone (without supervised reasoning traces) can produce emergent chain-of-thought behavior.

## Key Principles
- **GRPO**: Group Relative Policy Optimization — eliminates the need for a separate value model by using group-relative advantage estimation; the algorithm behind DeepSeek-R1.
- **RLVR**: RL with Verifiable Rewards — uses automatically verifiable reward signals (math answers, code execution) rather than learned reward models.
- **Emergent reasoning**: RL can produce chain-of-thought behavior without explicit reasoning supervision, though the mechanism is debated.
- **Distillation > RL for small models**: For 1.5–32B models, distilling reasoning traces from larger models beats RL-from-scratch (DeepSeek-R1 finding).
- **Process vs. outcome rewards**: DeepSeek-R1 deliberately abandoned process reward models (PRMs) in favor of outcome-only rewards; the debate remains unresolved.

## Key Papers and Systems
- **DeepSeek-R1 (Nature 2025)**: GRPO + RLVR; AIME 2024 pass@1 from 15.6% to 71% (86.7% with majority voting); demonstrated emergent reasoning without supervised traces.
- **s1 (EMNLP 2025)**: Simple SFT + budget forcing as RL-free alternative; competitive with o1-preview.
- **RAGEN/StarPO**: RL-for-agents framework; compute-hostile (8×H100 for 32B).
- **WebRL (ICLR 2025)**, **WebAgent-R1 (EMNLP 2025)**: RL for web agents.
- **SWE-Gym (ICML 2025)**, **DeepSWE**, **SkyRL-v0**: RL for software engineering agents.
- **DeepScaleR-1.5B**: RLVR on modest compute setup.
- **Open-R1, TRL, verl**: Open-source RL training frameworks.

## Compute Requirements
- **Feasible solo**: GRPO/RLVR on 1.5–7B math/code models via TRL/verl/Open-R1; distillation from R1/o3-mini into 1.5–7B students.
- **Off-limits solo**: Large-scale RLVR on 32B+; RL-for-agents on large models (typically 8×H100).

## Saturated Areas
Vanilla GRPO tweaks and naive best-of-N studies are saturated. "Yet another math PRM" is also saturated.

## Open Problems
- Theoretical understanding: does RL incentivize reasoning beyond the base model's capabilities?
- RLVR for non-math/code domains
- Process reward models: when do they help vs. hurt?
- Faithfulness of RL-elicited reasoning traces
- RL for diffusion language models (VRPO, UniGRPO, SPG) — essentially virgin territory

## Related Sources
- [[../_sources#three_llm_research_bets_pre_phd_cv]] — GRPO/RLVR as core techniques in the reasoning/TTC direction

## Related Concepts
- [[inference-time-compute-reasoning]] — RL as training-time complement to inference-time compute
- [[latent-reasoning]] — alternative to explicit CoT reasoning that RL may or may not produce
- [[diffusion-language-models]] — RL alignment for DLMs is an unsolved problem

## Open Questions
- Is RL-elicited reasoning faithful to the model's actual computation, or post-hoc rationalization?
- Can RLVR generalize beyond verifiable domains (math, code) to open-ended reasoning?
- What is the optimal combination of distillation, SFT, and RL for reasoning at different model scales?
