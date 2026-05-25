# Exercise 6: Local Agent with llama.cpp

## Learning Objectives

By completing this exercise, you will:

- Set up and run a local LLM using llama.cpp
- Evaluate local model capabilities for coding tasks
- Compare local models to frontier cloud models (Claude, GPT-4, etc.)
- Understand trade-offs: speed, cost, quality, privacy
- Identify which workflows work well locally vs which need cloud
- Experience the limitations and strengths of local-first development

---

## The Challenge

**Goal**: Complete a coding task using **ONLY a local model**, then compare results to a frontier model.

### Task Options

Choose ONE task to implement with both local and cloud models:

**Option A: Simple Feature**
- Add task filtering by priority
- Straightforward, well-defined feature

**Option B: Refactoring**
- Extract duplicated code into reusable functions
- Requires understanding existing code

**Option C: Bug Fix**
- Fix a deliberate bug in the starter app
- Requires debugging and code comprehension

**Option D: Test Writing**
- Write tests for an existing feature
- Tests quality and understanding

---

## Setup: llama.cpp

### Step 1: Install llama.cpp

**macOS/Linux**:
```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make
```

**Or use pre-built binaries** from llama.cpp releases.

### Step 2: Download a Model

**Recommended models for coding**:

**Small (good for limited hardware)**:
- **Qwen2.5-Coder-1.5B** - Fast, basic coding
- **Phi-3-mini-4k** - 3.8B params, decent for simple tasks

**Medium (better quality)**:
- **Qwen2.5-Coder-7B** - Good balance of speed/quality
- **DeepSeek-Coder-6.7B** - Strong coding capabilities

**Large (best quality, if you have resources)**:
- **Qwen2.5-Coder-14B** - High quality
- **DeepSeek-Coder-33B** - Very capable, needs good hardware

**Download** (example):
```bash
# Using Hugging Face
huggingface-cli download TheBloke/Qwen2.5-Coder-7B-Instruct-GGUF \
  qwen2.5-coder-7b-instruct-q4_k_m.gguf
```

### Step 3: Run the Server

```bash
./server -m path/to/model.gguf \
  --ctx-size 4096 \
  --port 8080 \
  --n-gpu-layers 0  # Adjust based on your GPU
```

### Step 4: Connect Your Editor

**For Continue.dev**:
```json
{
  "models": [{
    "title": "Local Qwen",
    "provider": "llama.cpp",
    "model": "qwen2.5-coder-7b",
    "apiBase": "http://localhost:8080"
  }]
}
```

**For Aider**:
```bash
aider --model "openai/local" --openai-api-base http://localhost:8080/v1
```

**Or use raw API**:
```bash
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Write a function..."}]
  }'
```

---

## The Experiment

### Part 1: Local Model Implementation

**Use ONLY the local model** to complete your chosen task.

**Track**:
- Time to complete
- Number of prompts needed
- Quality of first response
- Number of corrections needed
- Code quality
- Test coverage (if applicable)
- Bugs introduced
- Overall satisfaction

### Part 2: Frontier Model Implementation

**Use a frontier model** (Claude, GPT-4, etc.) to complete the **same task** on a fresh branch.

**Track same metrics**:
- Time to complete
- Number of prompts needed
- Quality of first response
- Number of corrections needed
- Code quality
- Test coverage
- Bugs introduced
- Overall satisfaction

### Part 3: Comparison

Compare the two implementations side-by-side.

---

## What to Observe

### Performance Metrics

**Latency**:
- How fast are responses?
- Does local model feel usable?
- How does it compare to cloud?

**Context Window**:
- Can local model handle large files?
- Does it forget context quickly?
- How does it compare to cloud models?

### Quality Metrics

**Code Quality**:
- Is code correct?
- Does it follow conventions?
- Is it maintainable?

**Instruction Following**:
- Does it follow your prompts?
- Does it ignore requirements?
- Does it add unnecessary features?

**Consistency**:
- Are responses consistent?
- Does quality vary between prompts?

### Capabilities

**What Works Well**:
- Simple feature implementation?
- Code completion?
- Refactoring?
- Test generation?
- Bug fixing?
- Documentation?

**What Struggles**:
- Complex logic?
- Large codebases?
- Architectural decisions?
- Edge case handling?
- Multi-file changes?

---

## Git Workflow

```bash
# Create branch for local model
git checkout main
git checkout -b exercise-06-local-model

# Implement with local model
git commit -m "feat: implement [feature] with local model"

# Create branch for frontier model
git checkout main
git checkout -b exercise-06-frontier-model

# Implement same feature with frontier model
git commit -m "feat: implement [feature] with frontier model"

# Compare
git diff exercise-06-local-model exercise-06-frontier-model
```

---

## Evaluation Criteria

| Dimension | Local Model | Frontier Model | Winner |
|-----------|-------------|----------------|--------|
| **Speed (latency)** | | | |
| **Time to complete** | | | |
| **Code quality** | | | |
| **Instruction following** | | | |
| **Bugs introduced** | | | |
| **Context retention** | | | |
| **Cost** | Free | $$$ | |
| **Privacy** | Full | Limited | |
| **Overall satisfaction** | /10 | /10 | |

---

## Deliverables

1. **Local model implementation** - Code on `exercise-06-local-model` branch
2. **Frontier model implementation** - Code on `exercise-06-frontier-model` branch
3. **Comparison analysis** - Side-by-side code diff and quality assessment
4. **Performance metrics** - Timing, prompt counts, etc.
5. **Reflection** - Fill out `reflection-template.md`

---

## Common Findings

### What Local Models Do Well

✅ **Code completion** - Fast, accurate autocomplete
✅ **Simple refactoring** - Extracting functions, renaming
✅ **Documentation** - Adding comments, docstrings
✅ **Simple bug fixes** - Obvious errors, typos
✅ **Template generation** - Boilerplate code

### What Local Models Struggle With

⚠️ **Complex reasoning** - Architectural decisions
⚠️ **Large context** - Multi-file changes
⚠️ **Edge cases** - Often missed
⚠️ **Consistency** - Variable quality
⚠️ **Following detailed specs** - May miss requirements

### Sweet Spot for Local Models

🎯 **Well-suited for**:
- Code completion and suggestions
- Quick refactorings
- Documentation generation
- Simple, well-defined tasks
- Privacy-sensitive work

🚫 **Not ideal for**:
- Complex feature development
- Architectural planning
- Critical production code
- Tasks requiring deep reasoning

---

## Reflection Questions

After completing the experiment:

1. **Was the local model fast enough to be usable?**

2. **How did code quality compare?**

3. **What workflows worked well locally?**

4. **What tasks clearly needed a frontier model?**

5. **Would you use a local model for real work?** For what?

6. **What would need to improve for local-first viability?**

7. **How important is privacy vs capability trade-off?**

8. **What's the right balance of local vs cloud?**

---

## Advanced Experiments

### Experiment 1: Hybrid Workflow

Use local model for:
- Code completion
- Simple refactoring
- Documentation

Use cloud model for:
- Architecture decisions
- Complex features
- Critical reviews

**Track**: Does this hybrid approach give best of both worlds?

### Experiment 2: Model Size Comparison

Try multiple local models:
- 1.5B (tiny, very fast)
- 7B (medium, balanced)
- 14B+ (large, slower but better)

**Compare**: Is bigger always better? What's the sweet spot?

### Experiment 3: Quantization Impact

Try different quantizations of same model:
- Q4_K_M (smaller, faster, lower quality)
- Q5_K_M (balanced)
- Q8_0 (larger, slower, higher quality)

**Measure**: Quality vs speed trade-off

---

## Hardware Considerations

**Minimum**:
- 8GB RAM for small models (1-3B)
- CPU-only is usable but slow

**Recommended**:
- 16GB+ RAM for 7B models
- GPU with 6GB+ VRAM for good performance
- Apple Silicon Macs work great with Metal

**Optimal**:
- 32GB+ RAM for 13B+ models
- GPU with 12GB+ VRAM
- Fast SSD for model loading

**Adjust model size** based on your hardware!

---

## Cost Analysis

**Local Model**:
- Setup time: ~30-60 minutes
- Inference: FREE (after initial hardware cost)
- Privacy: Full control of data
- Customization: Can fine-tune

**Frontier Model (e.g., Claude)**:
- Setup time: ~5 minutes
- Inference: ~$3-15 per million tokens
- Privacy: Data sent to third party
- Customization: Limited to prompting

**Break-even point**: Heavy usage makes local cost-effective

---

## Next Steps

After completing this exercise:

1. Fill out `reflection-template.md`
2. Share insights on local vs cloud trade-offs
3. Recommend workflows for each
4. Reflect on the entire lab experience
5. Complete general lab reflection in `reflection-notes/`

---

## Resources

### llama.cpp
- https://github.com/ggerganov/llama.cpp
- https://github.com/ggerganov/llama.cpp/tree/master/examples/server

### Model Sources
- https://huggingface.co/models?library=gguf
- https://huggingface.co/TheBloke (quantized models)
- https://ollama.ai/library (easy setup alternative)

### Alternatives to llama.cpp
- **Ollama** - Easier setup, fewer options
- **LM Studio** - GUI, user-friendly
- **LocalAI** - OpenAI-compatible API

---

**Remember**: The goal isn't to prove local models are "good enough." The goal is to **understand** where they work, where they don't, and how to make informed decisions about when to use local vs cloud models in your workflow.

Good luck!
