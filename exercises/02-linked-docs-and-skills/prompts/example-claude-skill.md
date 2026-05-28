# Example Claude Code Skill

Place files like this in `.claude/skills/` directory in your project root.

## File: `.claude/skills/task-app-guidelines.md`

```markdown
---
name: task-app-guidelines
description: Coding standards and patterns for the Task Management App
triggers:
  - "write a component"
  - "create a function"
  - "add a feature"
  - "implement"
---

# Task Management App Coding Guidelines

When working on the Task Management App, follow these guidelines:

## Always Reference Documentation

Before implementing features, review:
1. `docs/coding-guidelines.md` - Coding standards
2. `docs/api-contracts.md` - API specifications
3. `docs/testing-strategy.md` - Testing approach
4. `docs/ui-guidelines.md` - UI patterns
5. `docs/architecture.md` - System architecture and intentional flaws

## TypeScript Patterns

### Component Structure
```typescript
import { useState, useEffect } from 'react';
import type { Task } from '../services/api';

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Implementation...

  return (
    <ul role="list">
      {/* Component JSX */}
    </ul>
  );
};
```

### API Client Patterns
```typescript
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};
```

### Event Handler Naming
```typescript
const handleTaskCreate = async (e: React.FormEvent) => {
  e.preventDefault();
  // Implementation
};

const handleTaskUpdate = async (id: string, updates: UpdateTaskInput) => {
  // Implementation
};
```

## Testing Patterns

### AAA Pattern
```typescript
it('should create task with valid data', async () => {
  // Arrange
  const newTask = { title: 'Test Task', status: 'todo' };

  // Act
  const response = await request(app).post('/tasks').send(newTask);

  // Assert
  expect(response.status).toBe(201);
  expect(response.body).toMatchObject(newTask);
});
```

### Component Testing
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

it('should display task list', async () => {
  // Arrange
  vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

  // Act
  render(<TaskWidget />);

  // Assert
  await waitFor(() => {
    expect(screen.getByText('Task 1')).toBeInTheDocument();
  });
});
```

## Intentional Flaws (DO NOT FIX)

The starter app contains these intentional teaching flaws:
- Unnecessary re-renders (no memoization)
- Business logic in components
- No debouncing for requests
- Magic strings
- Duplicated validation
- Inconsistent error handling
- Poor separation of concerns
- No error boundary

These are documented in `docs/architecture.md`. Students will fix these as exercises.

## API Contracts

Always follow the API specification in `docs/api-contracts.md`:

**GET /tasks**
- Returns: `Task[]`
- Status: 200

**POST /tasks**
- Body: `{ title: string, status?: TaskStatus, priority?: TaskPriority }`
- Returns: `Task`
- Status: 201
- Errors: 400 (validation)

**PATCH /tasks/:id**
- Body: Partial `Task` fields
- Returns: `Task`
- Status: 200
- Errors: 400 (validation), 404 (not found)

**DELETE /tasks/:id**
- Returns: Empty
- Status: 204
- Errors: 404 (not found)

## Accessibility Requirements

Every interactive element must have:
- Semantic HTML (`<button>`, `<form>`, correct input types)
- ARIA labels where text content isn't sufficient
- Keyboard support (Enter, Escape, Tab navigation)
- Focus indicators
- Proper roles (`role="list"`, `role="alert"`, etc.)

Example:
```typescript
<button
  type="submit"
  aria-label="Create task"
  onClick={handleCreateTask}
>
  Add Task
</button>

<ul role="list" aria-label="Task list">
  {tasks.map(task => (
    <li key={task.id}>{task.title}</li>
  ))}
</ul>
```

## File Organization

```
src/
├── components/     # React components (one per file)
│   └── TaskWidget.tsx
├── services/       # API clients and utilities
│   └── api.ts
├── App.tsx         # Root component
└── main.tsx        # Entry point

tests/
├── TaskWidget.test.tsx  # Component tests
└── setup.ts             # Test configuration
```

## When in Doubt

1. Check the docs first (`docs/` folder)
2. Follow patterns from existing code
3. Keep it simple - no over-engineering
4. Write tests before implementation (TDD)
5. Ask clarifying questions if requirements are unclear
```

## File: `.claude/skills/git-workflow.md`

```markdown
---
name: git-workflow
description: Git commit and branching patterns for exercises
triggers:
  - "commit"
  - "create branch"
  - "git"
---

# Git Workflow for Agentic Workflows Challenge

## Branch Naming

```
exercise-{number}-{approach}-{name}
```

Examples:
- `exercise-01-method-b-structured`
- `exercise-02-workflow-c-rules`
- `exercise-05-tdd-deletion-undo`

## Commit Message Format

```
[ExNN] Brief description

Detailed explanation of changes if needed.

- Specific change 1
- Specific change 2
```

Examples:
```
[Ex01] Implement task filtering with structured prompts

Used method B (structured prompts) to add filtering by status.
```

```
[Ex05] Add deletion with undo (TDD)

Following strict TDD:
- Wrote failing tests for deletion
- Implemented deletion with undo stack
- All tests passing
```

## Commit Frequency

- Commit after each meaningful unit of work
- Commit when tests pass (in TDD exercises)
- Commit before switching approaches
- Don't commit broken code (except in TDD RED phase if noted)

## What to Commit

✅ Commit:
- Source code changes
- Test files
- Configuration changes
- Documentation updates
- Reflection notes

❌ Don't Commit:
- `node_modules/`
- Build artifacts (`dist/`, `.next/`, etc.)
- IDE-specific files (`.vscode/`, `.idea/`)
- Environment files (`.env.local`)
- Log files

## Reflection Commits

After completing an exercise:
```
[ExNN] Add reflection notes

Completed exercise NN using [approach]. Key learnings:
- Learning 1
- Learning 2
```
```
