# Local Model Setup Guide

## Quick Start

### Option 1: Ollama (Easiest)

**1. Install Ollama**:
```bash
# macOS/Linux
curl https://ollama.ai/install.sh | sh

# Or download from https://ollama.ai
```

**2. Pull a coding model**:
```bash
ollama pull qwen2.5-coder:7b
# or
ollama pull deepseek-coder:6.7b
```

**3. Run**:
```bash
ollama run qwen2.5-coder:7b
```

**4. Use with Continue.dev or Aider** - both have Ollama support built-in

---

### Option 2: llama.cpp (More Control)

**1. Build llama.cpp**:
```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make
```

**2. Download GGUF model**:
```bash
# Using huggingface-cli
pip install huggingface_hub
huggingface-cli download \
  Qwen/Qwen2.5-Coder-7B-Instruct-GGUF \
  qwen2.5-coder-7b-instruct-q4_k_m.gguf \
  --local-dir ./models
```

**3. Run server**:
```bash
./server \
  -m models/qwen2.5-coder-7b-instruct-q4_k_m.gguf \
  --ctx-size 4096 \
  --port 8080 \
  --n-gpu-layers 35  # Adjust for your GPU (0 for CPU only)
```

**4. Test**:
```bash
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Write a hello world function"}
    ]
  }'
```

---

## Editor Integration

### Continue.dev

**config.json**:
```json
{
  "models": [
    {
      "title": "Local Qwen Coder",
      "provider": "ollama",
      "model": "qwen2.5-coder:7b"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Local Qwen",
    "provider": "ollama",
    "model": "qwen2.5-coder:7b"
  }
}
```

### Aider

**With Ollama**:
```bash
aider --model ollama/qwen2.5-coder:7b
```

**With llama.cpp**:
```bash
aider \
  --model "openai/qwen2.5-coder" \
  --openai-api-base http://localhost:8080/v1
```

### VSCode + Copilot Alternative

Use Continue.dev extension (free, supports local models)

---

## Model Recommendations

### For Limited Hardware (8GB RAM)

**Qwen2.5-Coder-1.5B** - Very fast, basic capability
```bash
ollama pull qwen2.5-coder:1.5b
```

### For Medium Hardware (16GB RAM)

**Qwen2.5-Coder-7B** - Best balance ⭐ RECOMMENDED
```bash
ollama pull qwen2.5-coder:7b
```

**DeepSeek-Coder-6.7B** - Strong alternative
```bash
ollama pull deepseek-coder:6.7b
```

### For Powerful Hardware (32GB+ RAM, GPU)

**Qwen2.5-Coder-14B** - High quality
```bash
ollama pull qwen2.5-coder:14b
```

---

## Performance Tuning

### GPU Acceleration

**Check GPU support**:
```bash
# llama.cpp shows GPU layers loaded on startup
./server -m model.gguf --n-gpu-layers 35
# Outputs: "llm_load_tensors: offloaded 35/35 layers to GPU"
```

**Adjust layers** for your VRAM:
- 4GB VRAM: ~10-15 layers
- 6GB VRAM: ~20-25 layers
- 8GB+ VRAM: All layers (35+ depending on model)

### Context Size

**Balance memory vs capability**:
```bash
--ctx-size 2048  # Small, less memory
--ctx-size 4096  # Medium, recommended
--ctx-size 8192  # Large, if you have RAM
```

### Batch Size

**Adjust for speed**:
```bash
--batch-size 512   # Default
--batch-size 1024  # Faster if you have RAM
```

---

## Troubleshooting

### Slow Response Times

**Try**:
- Reduce context size
- Use more GPU layers
- Try smaller/quantized model
- Check CPU usage during inference

### Out of Memory

**Try**:
- Smaller model (7B → 3B)
- Higher quantization (Q8 → Q4)
- Reduce context size
- Reduce batch size

### Poor Quality

**Try**:
- Larger model
- Lower quantization (Q4 → Q8)
- Better prompting
- Compare different models

---

## Testing Your Setup

**Prompt**: "Write a TypeScript function to filter an array of tasks by status"

**Expected**: Should generate working TypeScript code

**If output is gibberish**: Model not loaded correctly or incompatible

**If very slow**: Try smaller model or more GPU layers

**If hallucinating heavily**: Try different/larger model

---

## Quick Reference

| Model | Size | RAM Needed | Speed | Quality |
|-------|------|-----------|-------|---------|
| qwen2.5-coder:1.5b | 1GB | 4GB | ⚡⚡⚡ | ⭐⭐ |
| qwen2.5-coder:7b | 4.5GB | 8GB | ⚡⚡ | ⭐⭐⭐⭐ |
| qwen2.5-coder:14b | 8.5GB | 16GB | ⚡ | ⭐⭐⭐⭐⭐ |
| deepseek-coder:6.7b | 4GB | 8GB | ⚡⚡ | ⭐⭐⭐⭐ |

---

See `comparison-approach.md` for how to compare local vs frontier models.
