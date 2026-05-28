# Free and Open-Source Agent Options

This guide helps you participate in the Agentic Workflows Challenge **without spending money on API access**. All options below are either completely free or have free tiers available.

## Quick Comparison

| Option | Cost | Setup Time | Best For |
|--------|------|------------|----------|
| GitHub Copilot Free | $0 (requires verification) | 10 min | Students with GitHub Student Pack |
| Continue.dev + Ollama | $0 | 30 min | Full control, privacy-focused |
| Aider + Ollama | $0 | 30 min | CLI lovers, git integration |
| Open WebUI + Ollama | $0 | 45 min | Teams, web-based interface |

## Option 1: GitHub Copilot (Free for Students)

### Who Can Get It Free?
- Verified students (GitHub Student Developer Pack)
- Verified teachers
- Maintainers of popular open-source projects

### How to Get Free Access

1. **Apply for GitHub Student Developer Pack**:
   - Visit https://education.github.com/pack
   - Click "Sign up for Student Developer Pack"
   - Verify your student status with:
     - School-issued email address, OR
     - Upload proof of enrollment (student ID, transcript, etc.)
   - Wait for approval (usually 1-3 days)

2. **Activate GitHub Copilot**:
   - Once approved, go to https://github.com/settings/copilot
   - Enable GitHub Copilot for free
   - Install in VS Code (see `docs/agent-setup.md`)

### Pros
- ✅ Excellent code completions
- ✅ Integrated with VS Code
- ✅ Easy to use
- ✅ No API key management

### Cons
- ❌ Limited to students/teachers/maintainers
- ❌ Less control over model behavior
- ❌ Cannot use with local models

## Option 2: Continue.dev + Ollama (Fully Free)

This is the **recommended free option** for most students.

### What You Get
- Free, open-source VS Code extension
- Works with local models (completely free)
- Can also connect to APIs if you get access later
- Full privacy - your code never leaves your machine

### Setup Steps

**Step 1: Install Ollama (Local Model Runtime)**

*macOS:*
```bash
# Download and run the installer
curl https://ollama.ai/install.sh | sh

# Or use Homebrew
brew install ollama
```

*Linux/WSL:*
```bash
curl https://ollama.ai/install.sh | sh
```

*Windows:*
- Download installer from https://ollama.ai/download
- Run the installer
- Ollama will run as a background service

**Step 2: Download a Coding Model**

```bash
# Download CodeLlama (good for coding, ~4GB)
ollama pull codellama

# Or download DeepSeek Coder (excellent for code, ~4GB)
ollama pull deepseek-coder

# Verify it works
ollama run codellama "Write a hello world function in JavaScript"
```

**Step 3: Install Continue.dev in VS Code**

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Continue"
4. Click "Install"
5. Click the Continue icon in the sidebar
6. Select "Ollama" as your provider
7. Select "codellama" or "deepseek-coder" as your model

**Step 4: Verify**

1. Open any JavaScript file
2. Press Ctrl+L (Cmd+L on macOS)
3. Type: "create a function to sort an array"
4. You should get a response from your local model

### Hardware Requirements
- **Minimum**: 8GB RAM, 10GB disk space
- **Recommended**: 16GB RAM, 20GB disk space
- Models run on CPU (no GPU required, but GPU speeds things up)

### Pros
- ✅ Completely free forever
- ✅ Total privacy (no data sent to cloud)
- ✅ Works offline
- ✅ No API rate limits
- ✅ Can switch to cloud APIs later

### Cons
- ❌ Slower than cloud APIs
- ❌ Requires downloading large models
- ❌ Quality depends on your hardware

## Option 3: Aider + Ollama (Free CLI Agent)

Best for students who prefer command-line interfaces.

### Setup Steps

**Step 1: Install Ollama** (same as Option 2 above)

**Step 2: Install Aider**

```bash
# Install with pip
pip install aider-chat

# Or with pipx (recommended for isolation)
pipx install aider-chat
```

**Step 3: Configure Aider for Ollama**

```bash
# Navigate to your project
cd your-project

# Start Aider with Ollama
aider --model ollama/codellama

# Or create a config file ~/.aider.conf.yml
echo "model: ollama/codellama" > ~/.aider.conf.yml
```

**Step 4: Verify**

```bash
# Start Aider in your project
aider

# You should see the Aider prompt
# Type: /help
# You should see command help
```

### Pros
- ✅ Free with local models
- ✅ Excellent git integration
- ✅ Can edit multiple files at once
- ✅ Works in terminal

### Cons
- ❌ CLI-only (no GUI)
- ❌ Steeper learning curve
- ❌ Requires comfortable with terminal

## Option 4: Open WebUI (Self-Hosted Web Interface)

Best for teams or students who want a ChatGPT-like interface.

### Setup Steps

**Step 1: Install Docker**

*macOS/Windows:*
- Download Docker Desktop from https://www.docker.com/products/docker-desktop/

*Linux:*
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Step 2: Install Ollama** (same as Option 2 above)

**Step 3: Run Open WebUI**

```bash
# Start Open WebUI with Ollama connection
docker run -d -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  -v open-webui:/app/backend/data \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

**Step 4: Access and Configure**

1. Navigate to http://localhost:3000
2. Create an account (stored locally)
3. Go to Settings → Connections
4. Verify Ollama connection
5. Select your model (codellama or deepseek-coder)

### Pros
- ✅ Web-based ChatGPT-like interface
- ✅ Multiple users (for teams)
- ✅ Conversation history
- ✅ Works with local models

### Cons
- ❌ Requires Docker
- ❌ More complex setup
- ❌ Not integrated with your editor

## Recommended Learning Path

### Week 1: Get Started Free
1. Set up Continue.dev + Ollama (Option 2)
2. Complete Exercises 1-3 with local models
3. Get familiar with the workflow

### Week 2-3: Continue Learning
4. Complete Exercises 4-5
5. For Exercise 6, you're already using local models!

### Week 4: Compare (Optional)
6. If you get API access later, try a cloud-based agent
7. Complete the comparison reflection in Exercise 6

## Upgrading to API Access (Optional)

If you later want to try cloud APIs:

### OpenAI Free Credits
- New accounts get $5 in free credits
- Expires after 3 months
- Good for trying GPT-4

### Anthropic Free Credits
- New accounts sometimes get promotional credits
- Check https://console.anthropic.com/

### GitHub Copilot Paid
- $10/month for individuals
- Includes GitHub Copilot Chat

### Continue.dev API Configuration
You can switch Continue.dev from Ollama to an API anytime:
1. Click Continue icon → Settings
2. Change provider from "Ollama" to "Anthropic" or "OpenAI"
3. Add your API key
4. Select your model

## Troubleshooting Free Options

### "Ollama command not found"
**Solution**: Restart your terminal or add Ollama to your PATH:
```bash
# macOS/Linux
export PATH=$PATH:/usr/local/bin

# Windows (in PowerShell as Administrator)
[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Program Files\Ollama", "Machine")
```

### "Model is too slow"
**Solutions**:
1. Use a smaller model: `ollama pull phi` (1.3GB, faster)
2. Close other applications to free up RAM
3. Use CPU-optimized models
4. Consider cloud APIs for critical work

### "Out of memory" errors
**Solutions**:
1. Use smaller models (phi, tinyllama)
2. Close other applications
3. Restart Ollama: `killall ollama && ollama serve`
4. Upgrade RAM if possible

### "Continue.dev not connecting to Ollama"
**Solution**: Make sure Ollama is running:
```bash
# Check if Ollama is running
ollama list

# If not running, start it
ollama serve

# Windows: Check system tray for Ollama icon
```

## Cost Comparison

### Free Options (This Guide)
- **Setup cost**: $0
- **Monthly cost**: $0
- **Per-request cost**: $0
- **Hardware**: Your existing computer

### Paid API Options
- **Setup cost**: $0
- **Monthly cost**: $0-50 (depending on usage)
- **Per-request cost**: $0.003 - $0.06 per 1K tokens
- **Typical monthly usage**: $10-30 for moderate use

### Why Free Might Be Better for Learning
1. ✅ No worry about costs while learning
2. ✅ Experiment freely
3. ✅ Learn about local AI deployment
4. ✅ Complete privacy
5. ✅ Works offline

## Next Steps

1. Choose your free option (we recommend Option 2: Continue.dev + Ollama)
2. Follow the setup steps in `docs/agent-setup.md`
3. Verify your setup works
4. Start with Exercise 1!

## Getting Help

- **Ollama**: https://github.com/ollama/ollama/issues
- **Continue.dev**: https://discord.gg/continue-dev
- **Aider**: https://github.com/paul-gauthier/aider/discussions
- **Open WebUI**: https://github.com/open-webui/open-webui/discussions

Remember: The goal of this lab is to learn agentic workflows, not to use the most expensive model. Free options are perfectly suitable for learning!
