# Diffusion Language Models

## Definition
Diffusion language models (DLMs) apply the diffusion paradigm to text generation via two branches: continuous embedding diffusion (Diffusion-LM, Plaid, DiffuSeq) and discrete token-space diffusion, where the dominant 2024–2026 variant is absorbing/masked diffusion — randomly masking tokens and training a BERT-like denoiser to recover them in parallel. The 2024 theoretical insight (RADD, MDLM, MD4) showed that the masked-diffusion ELBO reduces to a weighted mixture of masked-LM cross-entropy losses, mathematically equivalent to any-order autoregressive modeling.

## Key Principles
- **Parallel generation**: All tokens generated simultaneously rather than sequentially, enabling high throughput.
- **Bidirectional context**: Native access to full context during generation, unlike causal AR models.
- **Clean infilling**: Natural support for fill-in-the-middle tasks without special training.
- **Masked-diffusion ELBO**: Reduces to weighted masked-LM cross-entropy; time embeddings not needed; BERT backbones work.
- **AR-to-diffusion adaptation**: Pretrained AR models can be adapted to diffusion via attention-mask annealing and shift tricks using <200B tokens (DiffuLLaMA, ICLR 2025).
- **Blockwise decomposition**: BD3-LMs interpolate AR and diffusion, restoring KV-caching and arbitrary-length generation.

## Key Papers and Systems
- **SEDD (ICML 2024 Best Paper)**: Generalized score matching to discrete spaces; GPT-2-scale parity.
- **MDLM (NeurIPS 2024)**: SUBS parameterization; de facto baseline.
- **MD4 (NeurIPS 2024, DeepMind)**: Continuous-time ELBO and state-dependent schedules.
- **Diffusion-of-Thoughts (NeurIPS 2024)**: Reasoning along diffusion timesteps beats AR on multi-digit multiplication and boolean logic.
- **DiffuLLaMA/DiffuGPT (ICLR 2025)**: AR-to-diffusion adaptation with <200B tokens.
- **BD3-LMs (ICLR 2025 Oral)**: Blockwise AR+diffusion interpolation with KV-caching.
- **LLaDA (NeurIPS 2025 Oral)**: 8B from scratch on 2.3T tokens; matched LLaMA-3-8B; beat GPT-4o on reversal tasks.
- **Dream 7B**: Matched AR teacher on general tasks; outperformed larger AR on planning (Countdown, Sudoku).
- **Mercury (Inception Labs, 2025)**: ~1109 tok/s on H100; ~10× throughput vs. speed-optimized AR; Mercury 2 reports AIME 2025 = 91.1.
- **Google Gemini Diffusion (May 2025)**: 1479 tok/s near Gemini 2.0 Flash-Lite quality.

## Quality Gap and Caveats
- LLaDA-8B ≈ LLaMA-3-8B (2024 model); Dream 7B ≈ Qwen2.5-7B; LLaDA2.0-100B ≈ Qwen3-30B.
- Mercury's 10× claim compares to speed-optimized AR, not speculative-decoding-plus-FA3 frontier.
- Variable-length generation, KV-cache equivalents, hardware ecosystem, and alignment/RLHF all remain unsolved.
- RLHF/PPO/GRPO assume AR likelihood factorizations; DLM-specific alignment (VRPO, UniGRPO, SPG, d-TreeRPO) is wide open.

## Open Problems
- Sampling efficiency and consistency models for text
- RL/preference alignment for DLMs (VRPO, UniGRPO, SPG)
- Hybrid AR+diffusion architectures
- Variable-length generation
- Reasoning capability extension beyond planning tasks
- Multimodal extension
- Watermarking and safety for DLMs
- Theoretical work on ELBO tightness and discreteness
- Retrieval-augmented and agentic DLMs

## Compute Feasibility
Canonical experiments are at GPT-2-to-8B scale and reproducible on 1–8 GPUs: SEDD on single A100 node, MDLM/MD4 on 8×A100, BD3-LMs as fine-tunes from MDLM-OWT checkpoints, DoT on 8×V100. Public 7–8B checkpoints (LLaDA, Dream, DiffuLLaMA) fit on a single 24GB card at int8, enabling LoRA fine-tuning, RL research, and downstream evaluation for a single-student project.

## Commercial Signal
Inception Labs (founded by Stefano Ermon, Aditya Grover, Volodymyr Kuleshov) raised $50M; Mercury ranks #2 on Copilot Arena. Google shipped Gemini Diffusion. ByteDance shipped Seed Diffusion. Apple released DiffuCoder. Nvidia uses MDLM in Genmol. Andrew Ng and Andrej Karpathy personally invested in Inception.

## Related Sources
- [[../_sources#three_llm_research_bets_pre_phd_cv]] — primary synthesis of DLMs as publishably immature but promising direction

## Related Concepts
- [[inference-time-compute-reasoning]] — Diffusion-of-Thoughts as reasoning method; diffusion as efficient inference
- [[rl-for-reasoning]] — RL alignment for DLMs is virgin territory (VRPO, UniGRPO)
- [[efficient-llm-serving]] — DLMs as efficient inference engines (Mercury, Gemini Diffusion)
- [[latent-reasoning]] — conceptual parallel between latent reasoning and diffusion timestep reasoning

## Open Questions
- Will the quality gap with frontier AR close, or is it structural?
- Can DLM-specific RLHF match the maturity of AR RLHF?
- Is diffusion's speed advantage durable as speculative decoding and hardware improve?
- Do DLMs have a structural advantage on multi-constraint planning problems?

## Key Researchers
Stefano Ermon, Volodymyr Kuleshov, Aaron Lou, Subham Sahoo, Tatsunori Hashimoto, Aditya Grover, Jiaxin Shi, Lingpeng Kong, Chongxuan Li
