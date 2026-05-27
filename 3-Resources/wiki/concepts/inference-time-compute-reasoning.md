# Inference-Time Compute and Reasoning

## Definition
Inference-time compute (also called test-time compute or TTC) is the paradigm of improving LLM output quality by allocating more computation during inference — via sampling, search, verification, or extended reasoning traces — rather than scaling model parameters or training compute. The central insight is that compute-optimal adaptive allocation can yield 4× efficiency over naive best-of-N sampling, and that TTC on small models can outperform models 14× larger at FLOPs parity on certain prompts.

## Key Principles
- **Compute-optimal scaling**: Adaptive allocation of inference budget per prompt difficulty outperforms uniform strategies (Snell et al., ICLR 2025).
- **Log-linear coverage scaling**: Coverage scales log-linearly with sample count over four orders of magnitude; DeepSeek-Coder-V2 jumped from 15.9% to 56% on SWE-bench Lite with 250 samples (Brown et al., "Large Language Monkeys").
- **Verifier-free plateau**: Aggregation without verifiers plateaus at hundreds of samples — an explicit open problem.
- **Budget forcing**: Appending "Wait" to extend reasoning or forcing `</think>` to truncate gives fine-grained control over compute allocation (s1, Muennighoff et al., EMNLP 2025).
- **Distillation over RL for small models**: Distilling reasoning traces from large models into 1.5–32B students beats RL-from-scratch on small models (DeepSeek-R1).
- **Process vs. outcome rewards**: The unresolved debate over process reward models (PRMs) vs. outcome reward models (ORMs); DeepSeek-R1 deliberately abandoned PRMs.

## Key Papers and Systems
- **Snell et al. (ICLR 2025)**: Scaling test-time compute optimally > scaling parameters.
- **Brown et al. "Large Language Monkeys"**: Log-linear coverage scaling, verifier-free plateau.
- **DeepSeek-R1 (Nature 2025)**: GRPO + RLVR; AIME 2024 pass@1 from 15.6% to 71%.
- **s1 (EMNLP 2025)**: 1,000 curated examples + SFT + budget forcing on Qwen2.5-32B beat o1-preview by up to 27%.
- **rStar-Math**: 7B SLM rivaling o1 on AIME via MCTS + process-preference model.
- **Coconut (ICLR 2025)**: Latent reasoning via hidden-state feedback.
- **"Stop Overthinking" survey (TMLR 2025)**: Efficient-reasoning counter-trend (O1-Pruner, L1, TokenSkip, Chain-of-Draft, DEER).

## Open Problems
- Verifier-free aggregation past the hundred-sample plateau
- Cross-domain TTC beyond math/code (scientific QA, long-form, multimodal, agentic reasoning)
- Adaptive prompt-difficulty-aware compute allocation
- Length-versus-quality Pareto frontier
- Faithfulness and safety of opaque chain-of-thought
- Theoretical understanding of RLVR: does RL incentivize reasoning beyond the base model?

## Compute Feasibility
Exceptionally high for limited-compute researchers. Almost all sub-areas are feasible with paid API access plus a single A100/H100 (or 24GB consumer GPU for 7B work): search algorithms over closed APIs, PRM training on PRM800K/Math-Shepherd, inference-scaling-law studies via serverless inference, s1-style budget forcing on 7–32B models, distillation from R1/o3-mini traces, GRPO/RLVR on 1.5–7B via TRL/verl/Open-R1. Off-limits: large-scale RLVR on 32B+ or frontier pretraining.

## Crowdedness
Vanilla GRPO tweaks, naive best-of-N studies, and "yet another math PRM" are saturated. Genuine novelty exists in latent reasoning, verifier-free aggregation, reasoning beyond math/code, adaptive meta-controlled compute, and reasoning-plus-tools scaling laws.

## Related Sources
- [[../_sources#three_llm_research_bets_pre_phd_cv]] — primary synthesis of reasoning/TTC as highest-leverage pre-PhD bet

## Related Concepts
- [[rl-for-reasoning]] — GRPO, RLVR, and reward model training for reasoning
- [[latent-reasoning]] — hidden-state reasoning as alternative to chain-of-thought
- [[efficient-llm-serving]] — KV-cache compression and quantization specifically for reasoning models
- [[diffusion-language-models]] — diffusion-based reasoning (Diffusion-of-Thoughts)

## Open Questions
- Can verifier-free methods scale past the plateau without external reward signals?
- Is latent reasoning interpretable or faithful in the same way as explicit CoT?
- What is the theoretical ceiling of RLVR for eliciting reasoning capabilities?
