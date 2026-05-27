# Efficient LLM Serving

## Definition
Efficient LLM serving encompasses techniques for reducing the computational cost, memory footprint, and latency of LLM inference while preserving output quality. The field spans four canonical sub-threads: quantization, speculative decoding, KV-cache optimization, and pruning, plus serving systems engineering.

## Key Principles
- **Rotation-based quantization**: Hadamard/learned-Cayley rotations (QuaRot, SpinQuant) enable end-to-end W4A4-KV4 with <0.5 PPL loss on Llama-2-70B.
- **Speculative decoding consolidation**: EAGLE-3 drops feature-prediction constraint, fuses low/mid/high features, achieves up to 2.5× speedup in vLLM.
- **KV-cache as bottleneck**: PagedAttention/vLLM, StreamingLLM, H2O, SnapKV address memory; KV compression for reasoning models with long CoT is wide open.
- **FP4/MXFP4 frontier**: Rotation tricks fail to transfer cleanly to Blackwell FP4 — open problem.
- **Quantization-for-reasoning**: Long CoT outputs break standard quantization assumptions; GPTQ-int4 drops up to 6.9 points on 64–128K tasks (EMNLP 2025).

## Sub-threads

### Quantization
- **AWQ (MLSys 2024 Best Paper)**, **GPTQ (ICLR 2023)**, **SmoothQuant**: Foundational methods.
- **QuaRot (NeurIPS 2024)**, **SpinQuant (ICLR 2025)**: Rotation-based, end-to-end W4A4-KV4.
- **Open**: FP4/Blackwell, quantization for reasoning models.

### Speculative Decoding
- **EAGLE family → EAGLE-3 (NeurIPS 2025)**: Up to 2.5× speedup in vLLM.
- **Open**: Speculative decoding for reasoning traces (long thinking traces are highly redundant).

### KV-Cache Optimization
- **PagedAttention/vLLM (SOSP 2023)**, **StreamingLLM (ICLR 2024)**, **H2O (NeurIPS 2024)**, **SnapKV (NeurIPS 2024)**.
- **"Hold Onto That Thought" (Dec 2025)**: H2O and SnapKV-Decoding still beat newer methods on reasoning workloads; eviction lags full cache — explicit open problem.
- **Open**: KV compression specifically for long-CoT reasoning models.

### Pruning
- **Wanda (ICLR 2024)**, **SparseGPT (ICML 2023)**: Least active sub-thread.

### Serving Systems
- **vLLM**, **SGLang (RadixAttention, NeurIPS 2024)**, **TensorRT-LLM**, **FlashAttention-3 (NeurIPS 2024 Spotlight, 75% H100 utilization in FP16)**, **Mooncake**, **DistServe**.
- Venues: MLSys, OSDI, SOSP, ASPLOS.

## Compute Feasibility
Medium. A single A100/H100/4090 supports publishable studies on 7B–13B models for: quantization (KurTail targets single consumer GPU), KV eviction (inference-time hooks, no training), pruning, draft-head training for spec decoding, small-scale serving benchmarks. Gated: 70B+ end-to-end evaluations, kernel work without Hopper/Blackwell hardware, DeepSeek-V3-scale serving experiments.

## Skill Signal
CUDA/Triton, PyTorch internals, profiling, MLSys benchmarking — scarcer and uniquely valued by systems-leaning labs (Berkeley Sky/RISE, Stanford ScalingIntelligence, CMU Catalyst, MIT HAN-lab, UW Efficient ML).

## Related Sources
- [[../_sources#three_llm_research_bets_pre_phd_cv]] — primary synthesis of efficient serving as strong but compute-gated direction

## Related Concepts
- [[inference-time-compute-reasoning]] — KV-cache and quantization specifically for reasoning models; speculative decoding for reasoning traces
- [[diffusion-language-models]] — DLMs as efficient inference engines (Mercury, Gemini Diffusion)
- [[llm-agent-design]] — serving systems for agent deployment

## Open Questions
- Can rotation-based quantization transfer to FP4/MXFP4 on Blackwell?
- What KV eviction strategy works for long-CoT reasoning workloads?
- Is speculative decoding effective for highly redundant reasoning traces?
- How does quantization interact with reasoning model output distributions over long sequences?
