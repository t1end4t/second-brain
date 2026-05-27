# LLM Agent Design

## Definition
LLM agent design encompasses research on architectures, orchestration patterns, memory systems, tool use, evaluation, and safety for autonomous AI systems that use language models as their reasoning core. The field has stratified into three layers: foundational scaffolds (ReAct, Reflexion, Tree-of-Thoughts), orchestration frameworks (LangGraph, AutoGen, CrewAI), and production systems (Devin, Claude Computer Use, Manus).

## Key Principles
- **Five canonical workflow patterns**: Codified by Anthropic's "Building Effective Agents" (Dec 2024), explicitly recommending avoiding heavyweight frameworks.
- **Reliability over accuracy**: Tool-use research shifted from accuracy to reliability; τ-bench introduced pass^k metric showing reliability collapses under repeated trials.
- **Multi-agent overhead**: After token-cost normalization, multi-agent debate frequently fails to beat single-agent CoT; Anthropic documented 10–15× token overhead for multi-agent setups.
- **Benchmark exploitability**: Near-perfect scores achievable via grading exploits on SWE-bench, WebArena, OSWorld, GAIA, Terminal-Bench ("How We Broke Top AI Agent Benchmarks", 2026).
- **Reviewer fatigue**: Prompt-engineering and multi-agent-debate variants face severe reviewer fatigue in 2025–2026.

## Publishable Sub-niches (2025–2026)
| Sub-niche | Publishability | API-feasible |
|---|---|---|
| Tool use reliability | High | Yes |
| Memory systems (MemGPT, Mem0, A-Mem, HippoRAG) | High | Yes |
| Benchmarks (GAIA, τ-bench, OSWorld, AgentBoard) | High | Yes |
| Safety/red-teaming (AgentDojo, AgentHarm) | High | Yes |
| Evaluation methodology (ABC checklist, cost-normalized eval) | High | Yes |
| Application-grounded agents (scientific, legal, medical) | Medium | Yes |
| Grounding (WebArena, OSWorld, AppWorld) | Medium | Partially |
| Multi-agent systems | Low (fatigue) | Yes |
| Orchestration/frameworks | Low | Yes |
| RL-for-agents (RAGEN, WebRL, DeepSWE) | High but compute-hostile | No (8×H100 for 32B) |

## Key Papers and Systems
- **ReAct (ICLR 2023)**, **Reflexion (NeurIPS 2023)**, **Tree-of-Thoughts (NeurIPS 2023)**: Foundational scaffolds, now textbook-standard.
- **Voyager (TMLR 2024)**, **Generative Agents (UIST 2023)**, **MetaGPT (ICLR 2024 oral)**: All done API-only.
- **MemGPT (ICML 2024)**, **Mem0**, **HippoRAG (NeurIPS 2024)**: Memory systems — currently the hottest API-feasible bucket.
- **τ-bench, τ²-bench, BFCL**: Tool-use reliability benchmarks.
- **AgentDojo (NeurIPS 2024)**: Safety benchmark; NIST CAISI documented adaptive attacks pushing Claude 3.5 Sonnet's task-hijacking from 11% to 81%.
- **GAIA (ICLR 2024)**, **OSWorld (NeurIPS 2024)**, **BrowseComp (2025)**: Benchmark papers, all API-only.
- **OpenHands (ICLR 2025)**: Open-source coding agent.

## What Still Publishes (API-only)
Rigorous new benchmarks, empirical studies overturning conventional wisdom, memory/context-engineering with proper benchmarks, safety/red-teaming, cost-normalized evaluation methodology, application-grounded agents with rigorous evaluation.

## What Doesn't Publish Well
Prompt-engineering variants, orchestration framework papers, multi-agent debate without cost normalization, leaderboard-climbing without benchmark analysis.

## Skill Signal
Strong for systems-leaning NLP/HCI/AI-safety labs. Weaker for theoretical-ML or foundational-ML programs. The highest-leverage CV move is a rigorous benchmark-and-evaluation paper.

## Related Sources
- [[../_sources#three_llm_research_bets_pre_phd_cv]] — primary synthesis of agent design as viable but increasingly narrow direction

## Related Concepts
- [[inference-time-compute-reasoning]] — agents using inference-time scaling; compute allocation for agentic loops
- [[diffusion-language-models]] — agentic diffusion LMs (wild intersection, early 2026 preprints only)
- [[efficient-llm-serving]] — serving systems for agent deployment

## Open Questions
- Can multi-agent systems demonstrate genuine advantages over single-agent after cost normalization?
- What evaluation methodology properly captures agent reliability vs. peak performance?
- How should reasoning compute be allocated across multi-step tool-use trajectories?
