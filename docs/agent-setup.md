# Agent Environment Setup

This guide will help you set up a coding agent environment for the Agentic Workflows Challenge. Choose one of the agents below based on your preferences and budget.

## Free Options (Recommended for Getting Started)

If you're on a budget or want to try the lab without API costs, start here:

### GitHub Copilot (Free for Students/Verified Accounts)

**Eligibility**: Free for verified students, teachers, and maintainers of popular open-source projects.

**Setup Steps**:
1. Apply for GitHub Student Developer Pack: https://education.github.com/pack
2. Install VS Code: https://code.visualstudio.com/
3. Install GitHub Copilot extension:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "GitHub Copilot"
   - Click "Install"
4. Sign in with your GitHub account when prompted
5. Verify setup:
   - Create a new `.js` file
   - Start typing a function comment like `// function to add two numbers`
   - You should see Copilot suggestions appear

**Verification**:
```bash
# In VS Code, open a JavaScript file and type:
// function to calculate fibonacci

# You should see Copilot suggest code completion
```

### Continue.dev (Fully Free, Local or API)

**Best for**: Developers who want full control and free access with any model.

**Setup Steps (POSIX/Linux/WSL)**:
1. Install VS Code: https://code.visualstudio.com/
2. Install Continue extension:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Continue"
   - Click "Install"
3. Configure Continue:
   - Click the Continue icon in the sidebar
   - Choose your model provider:
     - **Free option**: Select "Ollama" for local models (requires Ollama setup - see Exercise 6)
     - **API option**: Select "Anthropic" or "OpenAI" and add your API key
4. Verify setup:
   - Open any code file
   - Press Ctrl+L (or Cmd+L on macOS)
   - Type a question: "How do I create a React component?"
   - You should get a response

**Setup Steps (Windows)**:
1. Install VS Code from https://code.visualstudio.com/
2. Follow same extension installation steps as above
3. For local models on Windows, install Ollama:
   - Download from https://ollama.ai/download
   - Run the installer
   - Open PowerShell and verify:
     ```powershell
     ollama --version
     ```

**Verification**:
```bash
# Test Continue is working:
# 1. Open any file in VS Code
# 2. Press Ctrl+L (Cmd+L on macOS)
# 3. Type: "explain this code"
# 4. You should see a response from your configured model
```

## Paid/API-Based Options

### Claude Code (Anthropic)

**Best for**: Claude-specific workflows and best-in-class code generation.

**Prerequisites**:
- Anthropic API key (https://console.anthropic.com/)

**Setup Steps (POSIX/Linux/WSL)**:
```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Set up API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Add to your shell profile for persistence
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc  # or ~/.zshrc

# Verify installation
claude --version
```

**Setup Steps (Windows PowerShell)**:
```powershell
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Set up API key (session-based)
$env:ANTHROPIC_API_KEY="your-api-key-here"

# Set up API key (persistent)
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'your-api-key-here', 'User')

# Verify installation
claude --version
```

**Verification**:
```bash
# Test Claude Code
claude chat "Hello, can you help me with code?"

# You should see Claude respond
```

**Configuration**:
Create `~/.claude/config.json` (or `%USERPROFILE%\.claude\config.json` on Windows):
```json
{
  "model": "claude-sonnet-4-5",
  "temperature": 0.7
}
```

### Cursor

**Best for**: IDE integration with AI capabilities built-in.

**Setup Steps (macOS/Linux)**:
1. Download Cursor from https://cursor.sh/
2. Install the application
3. Open Cursor
4. Go to Settings → General → Models
5. Add your API key (supports OpenAI, Anthropic, or others)
6. Select your preferred model

**Setup Steps (Windows)**:
1. Download Cursor from https://cursor.sh/
2. Run the installer
3. Open Cursor
4. Configure API key in Settings → General → Models

**Verification**:
1. Open any code file in Cursor
2. Press Ctrl+K (Cmd+K on macOS)
3. Type: "add error handling to this function"
4. Cursor should generate suggestions

**Configuration Files**:
Cursor supports `.cursorrules` files in your project root:
```
# .cursorrules example
- Always use TypeScript strict mode
- Prefer arrow functions over function declarations
- Use const for all variables unless reassignment is needed
```

See `exercises/02-linked-docs-and-skills/prompts/example-cursorrules.md` for a complete example.

### Aider

**Best for**: Command-line workflows and integration with version control.

**Setup Steps (POSIX/Linux/WSL)**:
```bash
# Install Aider
pip install aider-chat

# Or use pipx for isolated installation
pipx install aider-chat

# Set up API key (for OpenAI)
export OPENAI_API_KEY="your-api-key-here"

# Or for Anthropic
export ANTHROPIC_API_KEY="your-api-key-here"

# Add to shell profile for persistence
echo 'export OPENAI_API_KEY="your-api-key-here"' >> ~/.bashrc

# Verify installation
aider --version
```

**Setup Steps (Windows PowerShell)**:
```powershell
# Install Python if not already installed
# Download from https://www.python.org/downloads/

# Install Aider
pip install aider-chat

# Set up API key
$env:OPENAI_API_KEY="your-api-key-here"

# Or persistent
[System.Environment]::SetEnvironmentVariable('OPENAI_API_KEY', 'your-api-key-here', 'User')

# Verify installation
aider --version
```

**Verification**:
```bash
# Navigate to a git repository
cd your-project

# Start Aider
aider

# At the prompt, type:
# > /help

# You should see Aider's help menu
```

**Using with Local Models**:
Aider can work with Ollama (free):
```bash
# Start Ollama (see Exercise 6 for setup)
ollama serve

# In another terminal, run Aider with Ollama
aider --model ollama/codellama
```

### Open WebUI (Self-Hosted)

**Best for**: Teams wanting full control and privacy, or using local models.

**Setup Steps (POSIX/Linux/WSL)**:
```bash
# Install Docker
# See https://docs.docker.com/engine/install/

# Run Open WebUI
docker run -d -p 3000:8080 \
  -v open-webui:/app/backend/data \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main

# Access at http://localhost:3000
```

**Setup Steps (Windows)**:
```powershell
# Install Docker Desktop
# Download from https://www.docker.com/products/docker-desktop/

# Run Open WebUI
docker run -d -p 3000:8080 `
  -v open-webui:/app/backend/data `
  --name open-webui `
  ghcr.io/open-webui/open-webui:main

# Access at http://localhost:3000
```

**Verification**:
1. Navigate to http://localhost:3000
2. Create an account
3. Configure your model (local via Ollama or API-based)
4. Start a chat to verify it's working

## Choosing the Right Agent

| Agent | Cost | Best For | Setup Difficulty | Windows Support |
|-------|------|----------|-----------------|-----------------|
| GitHub Copilot (Free Tier) | Free* | Students, simple completions | Easy | Excellent |
| Continue.dev | Free | Full control, any model | Easy | Excellent |
| Claude Code | ~$15-30/month | Claude-specific workflows | Medium | Good |
| Cursor | $20/month | Integrated IDE experience | Easy | Excellent |
| Aider | Pay-as-you-go API | CLI workflows, git integration | Medium | Good |
| Open WebUI | Free (self-hosted) | Privacy, team use, local models | Hard | Good |

*Free tier requires student/teacher verification or open-source maintainer status

## Common Issues

### "API key not found"
**Solution**: Make sure you've set the environment variable correctly. Restart your terminal or IDE after setting it.

```bash
# Check if API key is set (POSIX)
echo $ANTHROPIC_API_KEY
echo $OPENAI_API_KEY

# Check if API key is set (Windows PowerShell)
echo $env:ANTHROPIC_API_KEY
echo $env:OPENAI_API_KEY
```

### "Model not available"
**Solution**: Check your API account has access to the model you're trying to use. Some models require tier upgrades.

### "Rate limit exceeded"
**Solution**: You've hit your API rate limit. Wait a few minutes or upgrade your API tier.

### "Connection refused" (local models)
**Solution**: Make sure Ollama is running:
```bash
# POSIX/Linux/WSL
ollama serve

# Windows
# Ollama runs as a service - check system tray
```

## Next Steps

Once you've set up your agent:

1. **Verify it works**: Try a simple code generation task
2. **Configure settings**: Adjust temperature, model, and other preferences
3. **Start Exercise 1**: Begin with prompting and context management
4. **Experiment**: Try different agents to find your preferred workflow

## Additional Resources

- [Anthropic API Documentation](https://docs.anthropic.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Ollama Documentation](https://ollama.ai/docs)
- [Continue.dev Documentation](https://continue.dev/docs)
- [Aider Documentation](https://aider.chat/docs/)
- [Cursor Documentation](https://cursor.sh/docs)
