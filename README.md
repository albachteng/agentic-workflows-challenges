# Agentic Workflows — Hands-On Engineering Lab

A practical lab for exploring modern software engineering patterns with LLM agents.

This lab accompanies the lecture: **"Agentic Workflows: Modern Software Engineering with LLM Agents"**

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- Your choice of agent environment (Cursor, Claude Code, Aider, VSCode Copilot, etc.)
- API access to an LLM (OpenAI, Anthropic, etc.) OR a local model setup (Ollama, llama.cpp)

### Setup

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   cd agentic-workflows-challenge
   ```

2. Install dependencies:
   ```bash
   # Frontend
   cd starter-app/frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. Run the starter application:
   ```bash
   # Terminal 1 - Backend
   cd starter-app/backend
   npm run dev

   # Terminal 2 - Frontend
   cd starter-app/frontend
   npm run dev
   ```

4. Verify the app is running:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

### Configuration

- ESLint and Prettier are configured for code quality
- TypeScript is configured for strict type checking
- Vitest is configured for testing

## What This Lab Is About

The goal is NOT to produce perfect software.

The goal is to:

- Explore workflow patterns with LLM agents
- Observe strengths and weaknesses of different approaches
- Compare prompting strategies empirically
- Practice effective context management
- Evaluate tooling and collaboration patterns
- Understand the operational realities of AI-assisted engineering

**Approach these exercises like an engineer running experiments.**

## Lab Structure

```
agentic-workflows-challenge/
├── README.md (you are here)
├── DESIGN.md (detailed pedagogical design)
├── PLAN.md (implementation tracking)
├── docs/
│   ├── architecture.md
│   ├── coding-guidelines.md
│   ├── api-contracts.md
│   ├── testing-strategy.md
│   └── ui-guidelines.md
├── starter-app/
│   ├── frontend/ (React + Vite + TypeScript)
│   └── backend/ (Express + TypeScript)
├── exercises/
│   ├── 01-prompting-and-context/
│   ├── 02-linked-docs-and-skills/
│   ├── 03-multi-agent/
│   ├── 04-mcp-integration/
│   ├── 05-agentic-tdd/
│   └── 06-local-agent-llamacpp/
└── reflection-notes/
```

## How to Use This Lab

1. **Read the docs/** - These files provide architectural guidance, coding standards, and API contracts that you'll reference throughout the exercises.

2. **Explore the starter app** - It's intentionally imperfect. The `docs/architecture.md` file explicitly documents the flaws for you to work with.

3. **Work through exercises sequentially** - Each builds on concepts from previous ones.

4. **Use git branches liberally** - Each exercise should be attempted on a fresh branch. Commit often. Compare different approaches.

5. **Document everything** - Save your prompts, track what worked and what didn't, note hallucinations and surprises.

6. **Be critical** - Don't accept agent output blindly. Review, test, and evaluate rigorously.

## Exercises Overview

### Exercise 1: Prompting and Context Management
Explore how different prompting strategies affect output quality.

### Exercise 2: Linked Documents and Skills
Compare effectiveness of linked docs, rules files, and skills vs prompt-only guidance.

### Exercise 3: Multi-Agent Workflow
Experiment with agent specialization and coordination patterns.

### Exercise 4: MCP Integration
Understand how agents interact with external tools and systems.

### Exercise 5: Agentic TDD
Practice strict test-driven development with an LLM agent.

### Exercise 6: Local Agent with llama.cpp
Evaluate local-first workflows and compare with frontier models.

## What You'll Learn

By completing this lab, you should be able to:

- Structure tasks effectively for LLM-assisted development
- Manage context and maintain consistency across sessions
- Evaluate different prompting and workflow strategies
- Identify common agent failure modes and mitigation strategies
- Apply TDD practices when working with agents
- Make informed decisions about agent tooling and approaches
- Critically evaluate AI-generated software

## Important Reminders

- **Preserve your transcripts** - They're valuable learning artifacts
- **Document your observations** - Use the reflection templates
- **Track failures** - Failed experiments teach as much as successful ones
- **Compare critically** - Don't assume more automation is always better
- **Test rigorously** - Agents can write confident but incorrect code
- **Use version control** - Branch, commit, stash, rollback liberally

## Getting Help

- See `DESIGN.md` for detailed pedagogical goals and exercise designs
- Each exercise folder contains specific instructions and example approaches
- The `docs/` folder provides reference material for the starter app

## Philosophy

The strongest engineers in AI-assisted environments aren't those writing the cleverest prompts.

They're the engineers best at:

- Decomposition
- Architecture
- Verification
- Testing
- Systems thinking
- Context management
- Operational discipline

This lab helps you develop these skills.

---

Ready to begin? Start with `exercises/01-prompting-and-context/`.
