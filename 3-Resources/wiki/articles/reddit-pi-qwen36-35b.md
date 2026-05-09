# Reddit: Pi Coding Agent with Local Qwen3.6 35B

## Source
- URL: https://www.reddit.com/r/LocalLLaMA/comments/1stjwg5/been_using_pi_coding_agent_with_local_qwen36_35b/
- Subreddit: `r/LocalLLaMA`
- Date observed: 2026-04-24

## Core Claim
The Reddit author reports that `Pi Coding Agent` works surprisingly well with a local `Qwen3.6 35B A3B` quantized model for real coding projects, especially when paired with a strict plan-first workflow skill.

## Model And Runtime
The post centers on a GGUF/llama.cpp setup:

- Model path example: `Qwen3.6-35B-A3B-UD-Q4_K_XL.gguf`
- Runtime: `llama.cpp` / `llama-server`
- API endpoint style: OpenAI-compatible local server
- Alias: `qwen3.6-35b-a3b`
- Context: `131072`
- Max generation: `32768`
- Quantization: `Q4_K_XL`
- Flash attention: enabled
- KV cache quantization: `q8_0`
- Chat template kwargs: `preserve_thinking: true`

## Example llama.cpp Command From Post
```bash
/home/abk/llamacpp/llama-server \
  --model /home/abk/llm-models/Qwen3.6-35B-A3B-UD-Q4_K_XL.gguf \
  --port 8001 \
  --alias qwen3.6-35b-a3b \
  -c 131072 \
  -n 32768 \
  --no-context-shift \
  --temp 0.6 \
  --top-p 0.95 \
  --top-k 20 \
  --repeat-penalty 1.00 \
  --presence-penalty 0.00 \
  --fit on \
  -fa on \
  -ctk q8_0 -ctv q8_0 \
  --chat-template-kwargs '{"preserve_thinking": true}'
```

## Reported Hardware And Performance
- Reported laptop: `8GB VRAM`, `32GB RAM`, DDR5 `5600Mhz`
- Reported generation speed: about `15-30 t/s`
- Reported prompt processing speed in a comment: about `275 t/s`
- Another user reported `11-14 t/s` on a GTX/RTX 1070-like 8GB setup with similar settings plus `--spec-default`
- Another user with DDR4 and `16GB VRAM` reported around `25-30 t/s`
- A MacBook Pro M4 Pro `48GB RAM` user reported a similar Pi + Qwen setup felt fast and useful

## Pi Agent Configuration Snippet
One comment shared a Pi provider config using llama.cpp:

```json
{
  "providers": {
    "llama-cpp": {
      "baseUrl": "http://localhost:8001/v1",
      "api": "openai-completions",
      "apiKey": "none",
      "models": [
        { "id": "qwen3.6-35b-a3b", "contextWindow": 131072, "maxTokens": 32768 }
      ]
    }
  }
}
```

A later comment says the `llama.cpp` server config matters more than the Pi `models.json` context fields, but a very large `131072` context can spill into RAM on a `12GB` GPU.

## Plan-First Skill Idea
The main practical idea is not just the model. It is the workflow:

- Analyze the project first
- Ask up to five critical clarifying questions
- Create a `TODO.md`
- Ask the user to approve the plan
- Execute tasks one by one
- Mark tasks complete in `TODO.md`
- Stop and ask approval if new unplanned work is discovered

This is presented as a way to make a local model more reliable by making the workflow explicit and reducing agent drift.

## Local-Agent Lessons From Comments
- Pi is described as lightweight and minimal compared with OpenCode or Claude-style large agent harnesses.
- Some users prefer Pi for local models because it uses less context and responds faster.
- OpenCode was reported by some commenters as slower or more context-heavy for this model class.
- The tradeoff is that Pi may need custom skills/prompts to get behavior like plan mode.
- One commenter described Pi as only having minimal tools by default: read, write, edit, and bash.
- Dropped tool calls were reported by the author at roughly `1 out of 10` attempts, usually recoverable with one or two retries.
- Safety concern: Pi has shell access, so some commenters recommend Docker/container isolation.
- Suggested safety pattern: run the agent inside a container and mount only the project folder.
- Desired additional guardrails mentioned: prevent git commits, branch switching, or destructive commands by mechanism rather than prompt only.

## Relevance To Local LLM Playground
This post is useful as a first experiment recipe:

1. Test `Qwen3.6 35B A3B` with `llama.cpp`.
2. Connect a lightweight coding agent through an OpenAI-compatible local endpoint.
3. Use a plan-first skill to keep the model controlled.
4. Benchmark speed, memory use, context behavior, and tool-call reliability.
5. Compare Pi against OpenCode/Codex-style workflows on the same local model.

## Open Questions
- Is the intended model actually `Qwen3.6 35B A3B`, not `Qwen3.5 35B`?
- Where is the trusted source for `Qwen3.6-35B-A3B-UD-Q4_K_XL.gguf`?
- What local hardware will be used for the first test?
- Should the playground prioritize Pi first, or compare Pi, OpenCode, and Codex-compatible local endpoints?
- Should experiments run directly on host or inside Docker for safety?
