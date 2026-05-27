# Latent Reasoning

## Definition
Latent reasoning is the paradigm of performing multi-step reasoning in the continuous hidden-state space of a language model rather than through explicit decoded token sequences (chain-of-thought). By feeding hidden states directly back as input instead of decoding intermediate tokens, models can reason without the overhead of generating and processing verbose reasoning traces.

## Key Principles
- **Hidden-state feedback**: Instead of decoding tokens for each reasoning step, the model's hidden states are fed back directly, enabling "thinking" in continuous space.
- **Efficiency advantage**: Eliminates the token-generation overhead of explicit CoT; particularly beneficial for planning and structured reasoning tasks.
- **Outperforms CoT on structured tasks**: Coconut demonstrated superiority on planning and BFS tasks where explicit CoT can introduce irreversible errors.
- **Interpretability challenge**: Unlike explicit CoT, latent reasoning traces are not directly human-readable.

## Key Papers and Systems
- **Coconut (Meta, ICLR 2025)**: Introduced latent reasoning via hidden-state feedback; outperformed CoT on planning/BFS tasks; spawned a sub-area.
- **CODI**: Follow-up extending the latent reasoning framework.
- **CoT-Valve**: Method for controlling reasoning depth in latent space.
- **implicit-CoT**: Further development of implicit reasoning chains.

## Relationship to Other Paradigms
- **vs. explicit CoT**: Latent reasoning avoids token-level error propagation but sacrifices interpretability.
- **vs. Diffusion-of-Thoughts**: Both reason in non-token spaces; diffusion reasons across timesteps, latent reasoning across hidden-state iterations.
- **vs. efficient reasoning (Chain-of-Draft, DEER)**: These compress explicit CoT; latent reasoning bypasses it entirely.

## Open Problems
- Interpretability and faithfulness of latent reasoning traces
- Theory: what computations can latent reasoning express that explicit CoT cannot?
- Combining latent and explicit reasoning adaptively
- Scaling latent reasoning to complex, open-domain reasoning tasks
- Training methods for latent reasoning beyond supervised fine-tuning

## Related Sources
- [[../_sources#three_llm_research_bets_pre_phd_cv]] — Coconut as pioneer of the latent reasoning sub-area

## Related Concepts
- [[inference-time-compute-reasoning]] — latent reasoning as alternative to explicit CoT scaling
- [[rl-for-reasoning]] — whether RL can elicit latent reasoning capabilities
- [[diffusion-language-models]] — conceptual parallel between hidden-state and diffusion-timestep reasoning

## Open Questions
- Is latent reasoning genuinely different from compressed CoT, or a different parameterization of the same computation?
- Can latent reasoning be made faithful and auditable for safety-critical applications?
- What is the scaling behavior of latent reasoning with model size and task complexity?
