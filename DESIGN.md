# Agentic Workflows — Hands-On Engineering Lab

## Overview

This lab is designed to accompany the lecture:

# "Agentic Workflows: Modern Software Engineering with LLM Agents"

The goal is not to produce perfect software.

The goal is to:

* explore workflow patterns
* observe strengths and weaknesses of agents
* compare prompting strategies
* practice context management
* evaluate tooling approaches
* understand the operational realities of AI-assisted engineering

Students should approach the exercises like engineers running experiments.

---

# Learning Objectives

By the end of this lab, students should be able to:

* structure tasks for LLM-assisted development
* manage context effectively
* compare different prompting strategies
* evaluate linked-document and skill-based workflows
* experiment with multi-agent collaboration
* use MCP integrations
* apply TDD with an LLM agent
* run and evaluate a local model using llama.cpp
* identify common agent failure modes
* critically evaluate AI-generated software

---

# Recommended Tech Stack

Students may use any stack they are comfortable with.

Recommended baseline:

## Frontend

* React
* Vite
* TypeScript

## Backend

* Node.js
* Express
* TypeScript

## Testing

* Vitest
* React Testing Library
* Supertest

## Suggested Agent Environments

* Cursor
* Claude Code
* Aider
* VSCode Copilot
* Open WebUI
* Continue.dev

---

# Repository Structure

```text
agentic-workflows-lab/
│
├── README.md
├── docs/
│   ├── architecture.md
│   ├── coding-guidelines.md
│   ├── api-contracts.md
│   ├── testing-strategy.md
│   └── ui-guidelines.md
│
├── starter-app/
│   ├── frontend/
│   └── backend/
│
├── exercises/
│   ├── 01-prompting-and-context/
│   ├── 02-linked-docs-and-skills/
│   ├── 03-multi-agent/
│   ├── 04-mcp-integration/
│   ├── 05-agentic-tdd/
│   └── 06-local-agent-llamacpp/
│
└── reflection-notes/
```

---

# Starter Project

The starter project intentionally remains small.

Students should not spend time building infrastructure from scratch.

The focus is workflow experimentation.

---

# Starter Application Requirements

## Frontend Widget

Build a small React dashboard widget:

### Features

* display a list of tasks
* filter tasks by status
* create a new task
* edit a task title
* show task priority
* display loading/error states

---

## Backend API

Build a simple Express API:

### Endpoints

```text
GET /tasks
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id
```

---

## Suggested Constraints

Students should:

* use TypeScript
* separate layers cleanly
* avoid giant files
* include validation
* include tests
* maintain API contracts

---

# Authentication / Model Access

Students may use:

## Commercial APIs

Examples:

* OpenAI
* Anthropic
* Google Gemini

Using their own API tokens.

---

## Free or Local Options

Examples:

* Ollama
* llama.cpp
* LM Studio
* HuggingFace inference APIs

---

# General Rules for the Exercises

Students should:

* preserve transcripts/prompts
* document workflow decisions
* note where the agent succeeded or failed
* track hallucinations or regressions
* compare outputs critically

---

# Exercise 1 — Prompting and Context Management

## Goal

Explore how context quality affects output quality.

---

# Task

Implement the task filtering functionality in the frontend widget.

Students must attempt the task using:

## Method A — Minimal Prompt

Example:

> "Add filtering to the task widget."

---

## Method B — Structured Prompt

Include:

* constraints
* architecture notes
* interfaces
* coding standards
* expected behavior

---

## Method C — Incremental Context

Break implementation into:

1. planning
2. interface design
3. state management
4. implementation
5. testing

---

# Reflection Questions

* Which approach produced the best output?
* Which produced the fewest regressions?
* Did more context always help?
* Where did the model hallucinate?
* Did smaller tasks improve quality?
* Did the model preserve architecture consistency?

---

# Exercise 2 — Linked Documents and Skills

## Goal

Compare the effectiveness of:

* linked documentation
* rules files
* skills
* prompt-only guidance

---

# Setup

Provide students with:

## docs/coding-guidelines.md

Contains:

* naming conventions
* component structure
* testing requirements
* accessibility requirements

---

## docs/testing-strategy.md

Contains:

* preferred testing philosophy
* mocking guidance
* edge case requirements

---

## docs/api-contracts.md

Contains:

* request/response contracts
* validation rules
* expected error formats

---

# Task

Implement task editing support.

Students should compare:

## Workflow A

Prompt-only guidance.

---

## Workflow B

Linked documents referenced explicitly.

---

## Workflow C

Rules/skills integration.

Examples:

* Cursor rules
* Claude skills
* Copilot instructions

---

# Reflection Questions

* Did linked docs improve consistency?
* Did rules reduce regressions?
* Did the agent actually follow the guidance?
* What kinds of instructions were ignored?
* Which workflow scaled best?
* Which required the most manual correction?

---

# Exercise 3 — Multi-Agent Workflow

## Goal

Experiment with specialization and coordination.

---

# Task

Add:

* task priority support
* sorting support
* optimistic UI updates

Students should use multiple agents.

---

# Option A — Sequential Workflow

Example:

Agent 1:

* architecture planning

Agent 2:

* implementation

Agent 3:

* test generation

Agent 4:

* code review

---

# Option B — Parallel Workflow

Example:

Agent A:

* frontend implementation

Agent B:

* backend implementation

Agent C:

* testing

Agent D:

* documentation

---

# Required Deliverable

Students must document:

* how tasks were delegated
* where coordination failed
* conflicting assumptions
* duplicated work
* hallucinated architecture
* context drift issues

---

# Reflection Questions

* Did specialization help?
* Where did agents disagree?
* Was orchestration overhead worth it?
* Which tasks parallelized well?
* Which required tight human supervision?
* Did agents maintain shared assumptions successfully?

---

# Exercise 4 — MCP Integration

## Goal

Understand how agents interact with external tools and systems.

---

# Recommended MCP Integrations

Students only need ONE.

Examples:

* filesystem MCP
* GitHub MCP
* browser MCP
* Postgres MCP
* Slack MCP
* local shell execution MCP

---

# Suggested Task

Use an MCP integration to:

* inspect files
* run tests
* review logs
* update documentation
* inspect API responses

---

# Stretch Goal

Build a tiny custom MCP server.

Example:

```text
weather-mcp/
```

Or:

```text
task-stats-mcp/
```

That exposes:

* task counts
* completed tasks
* average priorities
* generated summaries

---

# Reflection Questions

* What workflows improved most?
* What security concerns emerged?
* Did the agent misuse tools?
* Where did tool access dramatically help?
* What permissions should agents have?
* Which integrations felt production-ready?

---

# Exercise 5 — Agentic TDD

## Goal

Use strict TDD with an LLM agent.

This is one of the most important exercises.

---

# Rules

Students are NOT allowed to:

* manually implement features first
* accept untested code
* skip failing tests

---

# Task

Implement:

* task deletion
* undo deletion
* retry handling for failed requests

Using:

1. failing tests first
2. implementation second
3. refactoring third

---

# Required Workflow

## Step 1

Have the agent propose test cases.

---

## Step 2

Review tests critically.

Students must identify:

* missing edge cases
* weak assertions
* incorrect assumptions

---

## Step 3

Allow the agent to implement until tests pass.

---

## Step 4

Refactor with tests protecting behavior.

---

# Reflection Questions

* Did tests improve agent reliability?
* Did the agent overfit to the tests?
* What bugs escaped initially?
* How much manual review was still required?
* Did TDD reduce hallucinated behavior?
* Was the agent better at implementation or testing?

---

# Exercise 6 — Local Agent with llama.cpp

## Goal

Evaluate local-first workflows.

---

# Setup

Students should:

1. install llama.cpp
2. download a small coding-capable model
3. run a local inference server
4. connect their editor/tooling

---

# Suggested Models

Examples:

* Qwen Coder
* DeepSeek Coder
* Phi
* Llama variants

Students should select models appropriate for their hardware.

---

# Suggested Tasks

Attempt:

* code generation
* summarization
* refactoring
* test generation
* debugging

Using ONLY the local model.

---

# Compare Against Frontier Models

Students should compare:

* latency
* code quality
* hallucinations
* instruction following
* consistency
* context handling
* cost

---

# Reflection Questions

* What limitations appeared immediately?
* What tasks worked surprisingly well?
* How did context windows affect output?
* Was local inference fast enough?
* Which workflows felt viable locally?
* What would you offload to cloud models?

---

# Optional Advanced Challenges

## Challenge — Git Worktrees

Use separate worktrees for:

* competing implementations
* agent experiments
* parallel feature development

Compare:

* merge difficulty
* regressions
* coordination complexity

---

## Challenge — Context Compression

Run a very long conversation with an agent.

Observe:

* drift
* forgotten requirements
* inconsistent assumptions
* degraded architecture coherence

Then:

* restart with summarized context
* compare output quality

---

## Challenge — Ralph Wiggums Detection

Students should intentionally search for:

* fabricated APIs
* invented framework behavior
* fake test coverage
* incoherent reasoning hidden behind confident language

---

# Deliverables

Students should submit:

## 1. Working Repository

Including:

* implementation
* prompts
* rules/skills
* linked docs
* tests

---

## 2. Reflection Notes

Document:

* successful workflows
* failed workflows
* hallucinations
* surprising behavior
* productivity gains
* productivity losses
* recommended practices

---

## 3. Comparative Analysis

Students should compare:

* local vs cloud
* single-agent vs multi-agent
* prompt-only vs linked docs
* no-tests vs TDD
* broad prompts vs scoped prompts

---

# Instructor Notes

The purpose of the lab is NOT:

* maximizing generated LOC
* blindly automating software development
* proving agents are “good” or “bad”

The purpose IS:

* building engineering judgment
* understanding workflow design
* identifying operational limitations
* learning practical collaboration patterns
* improving software engineering discipline

---

# Recommended Debrief Topics

After the lab, discuss:

* which workflows scaled best
* where agents failed hardest
* what engineering skills became more important
* what surprised students most
* how organizational workflows may change
* what still clearly requires humans

---

# Final Thought

The strongest engineers in AI-assisted environments are rarely the ones writing the cleverest prompts.

They are usually the engineers best at:

* decomposition
* architecture
* verification
* testing
* systems thinking
* context management
* operational discipline
