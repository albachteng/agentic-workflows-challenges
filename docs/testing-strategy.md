# Testing Strategy

This document defines the testing philosophy and practices for this project.

**Core Principle**: Tests are not optional. Tests are how we verify that code works correctly, especially when working with LLM agents.

---

## Testing Philosophy

### Unit Tests First

**We prefer unit tests over integration tests.**

Why?

1. **Faster feedback** - Unit tests run in milliseconds
2. **Better isolation** - Easy to identify exactly what broke
3. **Force good design** - Hard to unit test usually means poor separation of concerns
4. **Agent-friendly** - LLMs can reason about isolated units more effectively
5. **Comprehensive coverage** - Can test edge cases that are hard to reproduce in integration tests

### The Testing Pyramid

```
      /\
     /  \    E2E Tests (Few)
    /----\
   /      \  Integration Tests (Some)
  /--------\
 /          \ Unit Tests (Many)
/____________\
```

**Our distribution**:
- 70% Unit tests
- 25% Integration tests
- 5% E2E tests (mostly manual for this lab)

---

## Test-Driven Development (TDD)

### The TDD Cycle

```
1. Write a failing test (RED)
   ↓
2. Write minimal code to pass (GREEN)
   ↓
3. Refactor while keeping tests green (REFACTOR)
   ↓
Return to step 1
```

### Why TDD?

When working with LLM agents, TDD is especially powerful:

- **Prevents hallucination** - Agent can't fake implementation when tests verify behavior
- **Clear requirements** - Tests serve as executable specifications
- **Safe refactoring** - Tests catch regressions during agent refactoring
- **Better design** - Forces thinking about interfaces before implementation
- **Confidence** - You know exactly what works and what doesn't

### TDD Rules for This Project

1. **No implementation before tests** - Write the test first, always
2. **One test at a time** - Don't write multiple tests before implementing
3. **Minimal implementation** - Write only enough code to make the test pass
4. **Refactor with confidence** - Tests protect you during refactoring

---

## What to Test

### Always Test

✅ **Business logic** - Pure functions, data transformations, validation
✅ **Error handling** - Both happy path and error cases
✅ **Edge cases** - Empty arrays, null values, boundary conditions
✅ **API contracts** - Request/response validation
✅ **State management** - Reducers, hooks, state updates

### Sometimes Test

⚠️ **UI interactions** - Critical user flows, form submissions
⚠️ **Integration points** - API calls, data fetching
⚠️ **Performance** - Only when performance is a requirement

### Rarely Test

❌ **Third-party libraries** - They should have their own tests
❌ **Framework code** - React, Express already tested
❌ **Constants** - No logic to test
❌ **Trivial code** - Getters/setters with no logic

---

## Unit Testing Guidelines

### What is a Unit Test?

A unit test:
- Tests a single function, method, or component in isolation
- Has no external dependencies (network, filesystem, database)
- Runs in milliseconds
- Can run in any order
- Is deterministic (same input = same output, always)

### Structure: Arrange-Act-Assert

Every test should follow this pattern:

```typescript
describe('filterTasks', () => {
  it('should filter tasks by status', () => {
    // Arrange - Set up test data
    const tasks = [
      { id: '1', title: 'Task 1', status: 'todo', priority: 'low' },
      { id: '2', title: 'Task 2', status: 'done', priority: 'high' },
      { id: '3', title: 'Task 3', status: 'todo', priority: 'medium' },
    ];

    // Act - Execute the code under test
    const result = filterTasks(tasks, 'todo');

    // Assert - Verify the results
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('3');
  });
});
```

### Naming Tests

Use descriptive names that explain the behavior:

**Pattern**: `should [expected behavior] when [condition]`

**Examples**:
```typescript
it('should return empty array when no tasks match filter')
it('should throw ValidationError when title is empty')
it('should call onTaskCreate when form is submitted')
it('should update timestamp when task is modified')
```

**Avoid vague names**:
```typescript
it('works')  // ❌ Too vague
it('test task creation')  // ❌ Not descriptive
it('handles edge cases')  // ❌ Which edge cases?
```

### One Assertion Per Test (Guideline, Not Rule)

**Preferred**:
```typescript
it('should set status to todo by default', () => {
  const task = createTask({ title: 'Test' });
  expect(task.status).toBe('todo');
});

it('should set priority to medium by default', () => {
  const task = createTask({ title: 'Test' });
  expect(task.priority).toBe('medium');
});
```

**Acceptable** (when testing related properties):
```typescript
it('should set default values when creating task', () => {
  const task = createTask({ title: 'Test' });
  expect(task.status).toBe('todo');
  expect(task.priority).toBe('medium');
  expect(task.id).toBeDefined();
});
```

---

## Mocking Guidelines

### Mock External Dependencies

**Always mock**:
- Network requests (API calls)
- File system operations
- Database queries
- Timers (setTimeout, setInterval)
- Random number generation
- Current date/time

**Example**:
```typescript
import { vi } from 'vitest';
import { fetchTasks } from './api';

vi.mock('./api', () => ({
  fetchTasks: vi.fn(),
}));

describe('useTasks', () => {
  it('should load tasks on mount', async () => {
    // Arrange
    const mockTasks = [{ id: '1', title: 'Test' }];
    vi.mocked(fetchTasks).mockResolvedValue(mockTasks);

    // Act
    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert
    expect(result.current.tasks).toEqual(mockTasks);
  });
});
```

### Don't Over-Mock

**Bad** - Mocking too much (testing the mock, not the code):
```typescript
const mockAdd = vi.fn((a, b) => a + b);
expect(mockAdd(2, 3)).toBe(5); // You're testing the mock!
```

**Good** - Only mock external dependencies:
```typescript
// Real function
const add = (a: number, b: number) => a + b;

// Real test
expect(add(2, 3)).toBe(5);
```

---

## Component Testing

### Test User Behavior, Not Implementation

**Bad** - Testing implementation details:
```typescript
it('should set state when button is clicked', () => {
  const { getByRole } = render(<TaskWidget />);
  const button = getByRole('button');
  fireEvent.click(button);
  // Testing internal state - fragile!
});
```

**Good** - Testing user-visible behavior:
```typescript
it('should display new task when create button is clicked', () => {
  const { getByRole, getByText } = render(<TaskWidget />);
  const input = getByRole('textbox');
  const button = getByRole('button', { name: /create/i });

  fireEvent.change(input, { target: { value: 'New task' } });
  fireEvent.click(button);

  expect(getByText('New task')).toBeInTheDocument();
});
```

### Query Priority (React Testing Library)

Use queries in this order of preference:

1. **getByRole** - Most accessible, closest to how users interact
2. **getByLabelText** - Good for form fields
3. **getByPlaceholderText** - Acceptable for inputs
4. **getByText** - Good for non-interactive elements
5. **getByTestId** - Last resort, use sparingly

**Example**:
```typescript
// ✅ Preferred
const button = getByRole('button', { name: /create task/i });

// ⚠️ Acceptable
const input = getByLabelText('Task title');

// ❌ Avoid
const button = getByTestId('create-button');
```

---

## Integration Testing

### When to Write Integration Tests

Use integration tests when:
- Testing multiple units working together
- Verifying API routes with middleware and validation
- Testing data flow through multiple layers
- Verifying critical user journeys

### API Integration Test Example

```typescript
import request from 'supertest';
import { app } from '../server';

describe('POST /tasks', () => {
  it('should create task and return 201', async () => {
    const newTask = {
      title: 'Integration test task',
      status: 'todo',
      priority: 'high',
    };

    const response = await request(app)
      .post('/tasks')
      .send(newTask)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      title: newTask.title,
      status: newTask.status,
      priority: newTask.priority,
    });
    expect(response.body.id).toBeDefined();
  });
});
```

---

## Test Coverage

### Coverage Goals

- **Overall**: 80%+ coverage
- **Business logic**: 90%+ coverage
- **Critical paths**: 100% coverage

### Coverage Is Not Everything

**100% coverage doesn't mean bug-free code.**

You can have:
- ✅ 100% line coverage
- ❌ Missing edge case tests
- ❌ Missing error handling tests
- ❌ Weak assertions

**Focus on meaningful tests, not coverage percentage.**

---

## Edge Cases to Always Test

### For Any Function

- Empty input (`[]`, `""`, `null`, `undefined`)
- Boundary values (0, -1, max int)
- Invalid input types
- Error conditions

### For Arrays

```typescript
it('should return empty array when input is empty', () => {
  expect(filterTasks([])).toEqual([]);
});

it('should handle array with single item', () => {
  const tasks = [{ id: '1', title: 'Test', status: 'todo' }];
  expect(filterTasks(tasks, 'todo')).toEqual(tasks);
});
```

### For Strings

```typescript
it('should trim whitespace from title', () => {
  const task = createTask({ title: '  Test  ' });
  expect(task.title).toBe('Test');
});

it('should reject empty string after trimming', () => {
  expect(() => createTask({ title: '   ' })).toThrow();
});
```

### For Async Operations

```typescript
it('should handle API errors gracefully', async () => {
  vi.mocked(fetchTasks).mockRejectedValue(new Error('Network error'));

  const { result } = renderHook(() => useTasks());

  await waitFor(() => expect(result.current.error).toBeTruthy());
  expect(result.current.tasks).toEqual([]);
});
```

---

## Testing with LLM Agents

### Exercise 5: Agentic TDD

The TDD exercise (Exercise 5) is the most important in this lab.

**Workflow**:

1. **Have the agent propose tests** - Ask agent to write tests for a feature first
2. **Review tests critically** - Check for missing edge cases, weak assertions
3. **Request improvements** - Point out gaps in test coverage
4. **Approve tests** - Only when comprehensive
5. **Implement** - Let agent implement until tests pass
6. **Verify** - Run tests, confirm all pass
7. **Refactor** - Improve implementation while keeping tests green

### Evaluating Agent-Generated Tests

**Red flags**:
- Tests that always pass (testing mocks, not real code)
- Missing edge cases
- Weak assertions (`expect(result).toBeDefined()` without checking values)
- Testing implementation details instead of behavior
- No error case testing

**Good signs**:
- Tests fail initially (RED phase)
- Comprehensive edge case coverage
- Specific assertions
- Clear test names
- Tests pass after implementation (GREEN phase)

---

## Common Testing Anti-Patterns

### ❌ Testing Private Methods

Don't test private/internal functions directly. Test the public API.

### ❌ Brittle Tests

Tests shouldn't break when you refactor without changing behavior.

### ❌ Testing Framework Code

Don't test that React hooks work or Express handles requests.

### ❌ Shared Test State

Each test should be independent. No shared state between tests.

**Bad**:
```typescript
let tasks: Task[] = [];

it('should add task', () => {
  tasks.push(createTask({ title: 'Test' }));
  expect(tasks).toHaveLength(1);
});

it('should filter tasks', () => {
  // Depends on previous test!
  expect(filterTasks(tasks, 'todo')).toHaveLength(1);
});
```

**Good**:
```typescript
it('should add task', () => {
  const tasks: Task[] = [];
  tasks.push(createTask({ title: 'Test' }));
  expect(tasks).toHaveLength(1);
});

it('should filter tasks', () => {
  const tasks = [createTask({ title: 'Test', status: 'todo' })];
  expect(filterTasks(tasks, 'todo')).toHaveLength(1);
});
```

---

## Test Organization

### File Structure

```
src/
├── components/
│   ├── TaskWidget.tsx
│   └── TaskWidget.test.tsx
├── services/
│   ├── api.ts
│   └── api.test.ts
└── utils/
    ├── validation.ts
    └── validation.test.ts
```

Tests live next to the code they test.

### Describe Blocks

Group related tests:

```typescript
describe('TaskWidget', () => {
  describe('rendering', () => {
    it('should display task list', () => { /* ... */ });
    it('should show loading state', () => { /* ... */ });
  });

  describe('filtering', () => {
    it('should filter by status', () => { /* ... */ });
    it('should filter by priority', () => { /* ... */ });
  });

  describe('error handling', () => {
    it('should display error message', () => { /* ... */ });
  });
});
```

---

## Running Tests

### Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test TaskWidget.test.tsx
```

### CI/CD

All tests must pass before merging:
- Pre-commit hook runs tests
- CI pipeline runs full test suite
- No commits allowed if tests fail

---

## Snapshot Testing (Use Sparingly)

Snapshot tests can catch unintended UI changes, but use them carefully.

**When to use snapshots**:
- Testing complex rendered output
- Ensuring UI consistency

**When NOT to use snapshots**:
- As a replacement for proper assertions
- For data structures (use explicit assertions instead)
- For frequently changing UI

**Example**:
```typescript
it('should match snapshot', () => {
  const { container } = render(<TaskWidget tasks={mockTasks} />);
  expect(container.firstChild).toMatchSnapshot();
});
```

---

## Key Takeaways

1. **Tests are documentation** - They show how code should be used
2. **Write tests first** - TDD prevents hallucination and improves design
3. **Prefer unit tests** - Fast, isolated, comprehensive
4. **Test behavior, not implementation** - Tests should survive refactoring
5. **Mock external dependencies** - Keep tests fast and deterministic
6. **Critical evaluation** - Don't blindly trust agent-generated tests
7. **Edge cases matter** - Especially when working with agents

---

**Remember**: When working with LLM agents, tests are your safety net. Demand comprehensive tests before accepting any implementation.
