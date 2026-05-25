# Implementation Plan for Agentic Workflows Lab

## Build Approach

**Documentation/Instructions**: Write directly without TDD
**Code Samples**: Follow TDD - write failing tests first, get approval, then implement

**Batching Strategy**: Pause for review after each exercise is complete

---

## Phase 1: Core Documentation ✅ COMPLETE - Ready for Review

- [x] Main README with setup instructions
- [x] docs/architecture.md (with intentional flaws documented)
- [x] docs/coding-guidelines.md (opinionated conventions)
- [x] docs/api-contracts.md (with example req/res)
- [x] docs/testing-strategy.md (unit test preference, TDD)
- [x] docs/ui-guidelines.md (React patterns, accessibility)

---

## Phase 2: Exercises

### Exercise 1 - Prompting and Context Management ✅ COMPLETE
- [x] README.md (instructions + git workflow reminders)
- [x] prompts/method-a-minimal.md (example approach)
- [x] prompts/method-b-structured.md (example approach)
- [x] prompts/method-c-incremental.md (example approach)
- [x] reflection-template.md (open-ended observations)

### Exercise 2 - Linked Documents and Skills ✅ COMPLETE
- [x] README.md (instructions + git workflow reminders)
- [x] prompts/workflow-a-prompt-only.md
- [x] prompts/workflow-b-linked-docs.md
- [x] prompts/workflow-c-rules-skills.md
- [x] reflection-template.md

### Exercise 3 - Multi-Agent Workflow
- [ ] README.md (instructions + git workflow reminders)
- [ ] prompts/sequential-workflow.md
- [ ] prompts/parallel-workflow.md
- [ ] reflection-template.md

### Exercise 4 - MCP Integration
- [ ] README.md (instructions + git workflow reminders)
- [ ] prompts/basic-mcp-usage.md
- [ ] prompts/custom-mcp-server.md (stretch goal)
- [ ] reflection-template.md

### Exercise 5 - Agentic TDD
- [ ] README.md (instructions + git workflow reminders)
- [ ] prompts/test-first-workflow.md
- [ ] prompts/reviewing-agent-tests.md
- [ ] reflection-template.md

### Exercise 6 - Local Agent with llama.cpp
- [ ] README.md (instructions + git workflow reminders)
- [ ] prompts/local-setup-guide.md
- [ ] prompts/comparison-approach.md
- [ ] reflection-template.md

---

## Phase 3: Supporting Files

- [ ] reflection-notes/general-template.md
- [ ] reflection-notes/README.md

---

## Phase 4: Starter Application (TDD Required)

### Intentional Flaws to Include:
- Performance: unnecessary re-renders, missing memoization
- Architecture: business logic in components, poor separation
- Code Quality: inconsistent patterns, duplicated code

### Frontend (React + Vite + TypeScript)
- [ ] Tests for task list display
- [ ] Tests for task filtering by status
- [ ] Tests for creating new task
- [ ] Tests for editing task title
- [ ] Tests for task priority display
- [ ] Tests for loading/error states
- [ ] Implementation

### Backend (Express + TypeScript)
- [ ] Tests for GET /tasks
- [ ] Tests for POST /tasks
- [ ] Tests for PATCH /tasks/:id
- [ ] Tests for DELETE /tasks/:id
- [ ] Tests for validation
- [ ] Implementation

### Configuration
- [ ] ESLint config
- [ ] Prettier config
- [ ] TypeScript configs
- [ ] Vitest setup
- [ ] Build/run instructions

---

## Current Status

**Last Completed**: Exercise 1 & 2 ✅

**Next Up**: Exercise 3 - Multi-Agent Workflow

**Awaiting Review**:
- Exercise 1: Prompting and Context Management
- Exercise 2: Linked Documents and Skills
