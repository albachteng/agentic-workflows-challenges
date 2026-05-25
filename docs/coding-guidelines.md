# Coding Guidelines

These are the coding standards for this project. When working with LLM agents, explicitly reference this document to test whether agents follow established conventions.

---

## General Principles

1. **Consistency over personal preference** - Follow these guidelines even if you disagree
2. **Readability over cleverness** - Code should be obvious, not clever
3. **Explicit over implicit** - Be clear about intent
4. **Fail fast** - Validate early and throw clear errors

---

## TypeScript

### Strict Mode

Always use strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Avoid `any`

Never use `any` unless absolutely necessary. Use `unknown` if type is truly unknown, then narrow with type guards.

**Bad**:
```typescript
function processData(data: any) {
  return data.value;
}
```

**Good**:
```typescript
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: unknown }).value;
  }
  throw new Error('Invalid data format');
}
```

### Type Annotations

Explicitly type function parameters and return values. TypeScript can infer many types, but explicit annotations serve as documentation.

**Acceptable**:
```typescript
const double = (x: number) => x * 2; // return type inferred
```

**Preferred**:
```typescript
const double = (x: number): number => x * 2;
```

### Interfaces vs Types

**Use `interface` for object shapes**:
```typescript
interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}
```

**Use `type` for unions, intersections, and primitives**:
```typescript
type TaskStatus = 'todo' | 'in-progress' | 'done';
type TaskPriority = 'low' | 'medium' | 'high';
```

---

## File Organization

### Naming Conventions

- **Components**: PascalCase (`TaskWidget.tsx`, `ErrorBoundary.tsx`)
- **Utilities**: camelCase (`formatDate.ts`, `apiClient.ts`)
- **Constants**: SCREAMING_SNAKE_CASE in file (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`Task`, `ApiResponse`)
- **Test files**: Same name as source with `.test.ts` or `.test.tsx` suffix

### File Structure

Group related code together. Prefer feature-based organization over type-based.

**Acceptable** (small projects):
```
src/
├── components/
├── services/
├── utils/
└── types/
```

**Preferred** (growing projects):
```
src/
├── features/
│   ├── tasks/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── api.ts
│   └── filters/
└── shared/
    ├── components/
    └── utils/
```

### Import Order

Organize imports in this order:

1. External dependencies (React, third-party libraries)
2. Internal absolute imports (from `@/` or `src/`)
3. Relative imports (`./`, `../`)

Separate groups with blank lines.

**Example**:
```typescript
import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_BASE_URL } from '@/config';
import { Task } from '@/types';

import { formatDate } from './utils';
import styles from './TaskWidget.module.css';
```

---

## React Components

### Component Structure

Organize component files in this order:

1. Imports
2. Types/Interfaces
3. Constants
4. Component definition
5. Helper functions (if small and component-specific)
6. Exports

### Functional Components

Always use functional components with hooks. No class components.

**Use arrow functions for components**:
```typescript
export const TaskWidget = ({ tasks }: TaskWidgetProps) => {
  // component body
};
```

### Props Interface

Always define props interface explicitly:

```typescript
interface TaskWidgetProps {
  tasks: Task[];
  onTaskCreate: (task: Omit<Task, 'id'>) => void;
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskWidget = ({ tasks, onTaskCreate, onTaskUpdate }: TaskWidgetProps) => {
  // ...
};
```

### Hooks

- Order hooks consistently: useState, useEffect, useContext, useRef, custom hooks
- Extract complex logic into custom hooks
- Name custom hooks with `use` prefix

**Example**:
```typescript
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // fetch tasks
  }, []);

  return { tasks, loading, error };
};
```

### Event Handlers

Prefix event handler functions with `handle`:

```typescript
const handleTaskCreate = (task: Omit<Task, 'id'>) => {
  // ...
};

const handleTaskUpdate = (id: string, updates: Partial<Task>) => {
  // ...
};
```

### Conditional Rendering

Use early returns for loading and error states:

**Preferred**:
```typescript
export const TaskWidget = ({ tasks }: TaskWidgetProps) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
```

**Avoid**:
```typescript
export const TaskWidget = ({ tasks }: TaskWidgetProps) => {
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        tasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};
```

---

## Backend (Express)

### Route Handlers

Keep route handlers thin. Delegate to service layer for business logic.

**Bad**:
```typescript
router.post('/tasks', (req, res) => {
  const task = req.body;
  if (!task.title) {
    return res.status(400).json({ error: 'Title required' });
  }
  // ... 20 more lines of business logic
});
```

**Good**:
```typescript
router.post('/tasks', validateTaskInput, (req, res) => {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    handleError(error, res);
  }
});
```

### Error Handling

Create typed error classes:

```typescript
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}
```

Use centralized error handler:

```typescript
export const handleError = (error: unknown, res: Response) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  if (error instanceof NotFoundError) {
    return res.status(404).json({ error: error.message });
  }
  console.error('Unexpected error:', error);
  return res.status(500).json({ error: 'Internal server error' });
};
```

### Request Validation

Validate all input explicitly:

```typescript
const validateTaskInput = (req: Request, res: Response, next: NextFunction) => {
  const { title, status, priority } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Valid title required' });
  }

  if (status && !['todo', 'in-progress', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority' });
  }

  next();
};
```

---

## Testing

See `testing-strategy.md` for detailed testing philosophy.

### Test File Naming

- Unit tests: `functionName.test.ts`
- Component tests: `ComponentName.test.tsx`
- Integration tests: `featureName.integration.test.ts`

### Test Structure

Use Arrange-Act-Assert pattern:

```typescript
describe('createTask', () => {
  it('should create a task with generated id', () => {
    // Arrange
    const taskInput = { title: 'Test task', status: 'todo' as const };

    // Act
    const result = createTask(taskInput);

    // Assert
    expect(result.id).toBeDefined();
    expect(result.title).toBe(taskInput.title);
    expect(result.status).toBe(taskInput.status);
  });
});
```

### Test Naming

Use descriptive test names:

**Good**:
```typescript
it('should return 400 when title is missing')
it('should filter tasks by status')
it('should call onTaskCreate when form is submitted')
```

**Bad**:
```typescript
it('works')
it('test task creation')
it('handles errors')
```

---

## Constants and Enums

### Prefer String Unions Over Enums

**Preferred**:
```typescript
type TaskStatus = 'todo' | 'in-progress' | 'done';
```

**Avoid**:
```typescript
enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in-progress',
  Done = 'done'
}
```

### Extract Magic Values

**Bad**:
```typescript
if (task.status === 'in-progress') {
  // ...
}
```

**Good**:
```typescript
const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done'
} as const;

if (task.status === TASK_STATUS.IN_PROGRESS) {
  // ...
}
```

---

## Comments and Documentation

### When to Comment

- **Do** explain why (not what) when the reason isn't obvious
- **Do** document public APIs and exported functions
- **Don't** comment obvious code
- **Don't** leave commented-out code in the codebase

**Good**:
```typescript
// Debounce API calls to avoid overwhelming the server during rapid typing
const debouncedUpdate = debounce(updateTask, 300);
```

**Bad**:
```typescript
// Set loading to true
setLoading(true);
```

### JSDoc for Public APIs

Document exported functions with JSDoc:

```typescript
/**
 * Filters tasks by status and priority
 * @param tasks - The tasks to filter
 * @param status - Optional status filter
 * @param priority - Optional priority filter
 * @returns Filtered tasks
 */
export const filterTasks = (
  tasks: Task[],
  status?: TaskStatus,
  priority?: TaskPriority
): Task[] => {
  // ...
};
```

---

## Formatting

### Prettier Configuration

Use Prettier with these settings (already configured):

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Line Length

Keep lines under 100 characters when possible.

### Destructuring

Prefer destructuring for objects:

**Preferred**:
```typescript
const { id, title, status } = task;
```

**Acceptable**:
```typescript
const id = task.id;
const title = task.title;
```

---

## Accessibility

See `ui-guidelines.md` for detailed accessibility requirements.

### Minimum Requirements

- All interactive elements must be keyboard accessible
- Images must have alt text
- Form inputs must have associated labels
- Use semantic HTML elements

---

## Version Control

### Commit Messages

Use conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example**:
```
feat(tasks): add task filtering by priority

Implement priority filter dropdown and update filter logic
to support filtering by both status and priority.

Closes #42
```

### Branch Naming

Use descriptive branch names:
- Features: `feature/task-filtering`
- Fixes: `fix/error-handling`
- Experiments: `experiment/optimistic-updates`

---

## When Working with LLM Agents

When prompting agents to follow these guidelines:

1. **Reference this file explicitly** - "Follow the conventions in docs/coding-guidelines.md"
2. **Be specific** - "Use string union types instead of enums as per coding guidelines"
3. **Test compliance** - Check if agent-generated code follows conventions
4. **Document deviations** - Note when agents ignore guidelines (valuable learning data)

---

**Remember**: These are not universal best practices, but project-specific conventions designed to test agent instruction-following and consistency.
