# Test-First Workflow Guide

## The TDD Mantra

**RED → GREEN → REFACTOR**

1. **RED**: Write a failing test
2. **GREEN**: Write minimal code to pass
3. **REFACTOR**: Clean up while keeping tests green
4. **REPEAT**: Next test

---

## Step-by-Step TDD with Agents

### Step 1: Request Tests Only

```
I need to implement [feature description].

Write comprehensive tests only. Do not implement the feature.

Tests should cover:
- Happy path: [describe expected behavior]
- Edge cases: [list specific edge cases]
- Error cases: [describe error scenarios]

Follow docs/testing-strategy.md:
- Vitest + React Testing Library
- AAA pattern (Arrange-Act-Assert)
- Descriptive test names: "should [behavior] when [condition]"

These tests should FAIL initially (no implementation exists yet).
```

### Step 2: Review Tests Critically

**Ask yourself**:
- [ ] Will these tests actually fail without implementation?
- [ ] Are edge cases covered?
- [ ] Are assertions specific enough?
- [ ] Do tests check behavior (not implementation details)?
- [ ] Are error scenarios tested?

**Give feedback**:
```
Good start. I see some gaps:

1. Missing edge case: What happens when [scenario]?
2. This assertion is too weak: expect(result).toBeDefined()
   → Should be: expect(result).toEqual({ specific: 'value' })
3. Missing error test: What if API returns 500?

Please add tests for these cases.
```

### Step 3: Verify RED State

```bash
npm test
```

**All new tests must fail.** If they pass, they're testing the wrong thing!

### Step 4: Request Implementation

```
Here are the approved tests: [point to test file]

Now implement the feature to make these tests pass.

Requirements:
- Make all tests GREEN
- Write minimal, clean code
- Do not modify the tests
- Follow docs/coding-guidelines.md

Show me when tests are passing.
```

### Step 5: Verify GREEN State

```bash
npm test
```

**All tests must pass.** If they don't, fix implementation (not tests).

### Step 6: Refactor

```
All tests passing! Now refactor to improve:
- Extract duplicated logic
- Improve naming
- Simplify complex code
- Improve performance

It's critical to keep all tests GREEN during refactoring.
Run tests after each change.
```

### Step 7: Verify Still GREEN

```bash
npm test -- --watch
```

Watch tests stay green as you refactor.

---

## Example: Task Deletion with Undo

### Step 1: Request Tests

```
Write tests for task deletion with undo functionality.

Feature requirements:
- deleteTask(id) removes task from list
- undoDelete() restores last deleted task
- Undo stack holds up to 10 deletions
- Undo with empty stack does nothing

Tests should cover:
- Delete single task
- Delete multiple tasks
- Undo single deletion
- Undo multiple times (LIFO stack)
- Undo with empty stack
- Undo stack limit (11 deletes = only 10 undoable)
- Delete non-existent task (error handling)

Do not implement. Just write failing tests.
```

### Step 2: Agent Response (Example)

```typescript
describe('Task Deletion with Undo', () => {
  describe('deleteTask', () => {
    it('should remove task from list when deleted', () => {
      // Arrange
      const tasks = [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' },
      ];
      const { result } = renderHook(() => useTaskDelete(tasks));

      // Act
      result.current.deleteTask('1');

      // Assert
      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks).not.toContainEqual({ id: '1', title: 'Task 1' });
    });

    it('should add deleted task to undo stack', () => {
      const tasks = [{ id: '1', title: 'Task 1' }];
      const { result } = renderHook(() => useTaskDelete(tasks));

      result.current.deleteTask('1');

      expect(result.current.undoStack).toHaveLength(1);
      expect(result.current.undoStack[0]).toEqual({ id: '1', title: 'Task 1' });
    });
  });

  describe('undoDelete', () => {
    it('should restore last deleted task', () => {
      const tasks = [{ id: '1', title: 'Task 1' }];
      const { result } = renderHook(() => useTaskDelete(tasks));

      result.current.deleteTask('1');
      result.current.undoDelete();

      expect(result.current.tasks).toContainEqual({ id: '1', title: 'Task 1' });
      expect(result.current.undoStack).toHaveLength(0);
    });

    it('should do nothing when undo stack is empty', () => {
      const tasks = [{ id: '1', title: 'Task 1' }];
      const { result } = renderHook(() => useTaskDelete(tasks));

      result.current.undoDelete(); // Stack is empty

      expect(result.current.tasks).toEqual(tasks); // Unchanged
      expect(result.current.undoStack).toHaveLength(0);
    });
  });

  // ... more tests
});
```

### Step 3: Your Review

```
Good tests! A few improvements:

1. Add test for undo stack limit:
   it('should limit undo stack to 10 items', () => {
     // Delete 11 tasks, verify only 10 in undo stack
   });

2. Add test for LIFO ordering:
   it('should undo deletions in reverse order (LIFO)', () => {
     // Delete A, B, C
     // Undo should restore C first, then B, then A
   });

3. Add error case:
   it('should handle deletion of non-existent task', () => {
     // Try to delete task that doesn't exist
     // Should throw or return error
   });

Please add these test cases.
```

### Step 4: Run Tests (RED)

```bash
npm test useTaskDelete

# Output:
# FAIL  useTaskDelete.test.ts
#   ● should remove task from list when deleted
#     ReferenceError: useTaskDelete is not defined
#
# Tests failed: 8
```

✅ **Good!** Tests fail because implementation doesn't exist yet.

### Step 5: Request Implementation

```
Tests are failing as expected (RED state ✓).

Now implement useTaskDelete hook to make all tests pass.

Implementation hints:
- Use useState for tasks and undoStack
- deleteTask: remove from tasks, add to undoStack
- undoDelete: pop from undoStack, add back to tasks
- Limit undoStack to max 10 items

Make tests GREEN.
```

### Step 6: Implementation (Agent)

```typescript
export const useTaskDelete = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [undoStack, setUndoStack] = useState<Task[]>([]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const taskToDelete = prev.find(t => t.id === id);
      if (!taskToDelete) {
        throw new Error(`Task ${id} not found`);
      }

      // Add to undo stack (limit to 10)
      setUndoStack(prevStack => {
        const newStack = [taskToDelete, ...prevStack];
        return newStack.slice(0, 10); // Keep only last 10
      });

      return prev.filter(t => t.id !== id);
    });
  }, []);

  const undoDelete = useCallback(() => {
    setUndoStack(prevStack => {
      if (prevStack.length === 0) return prevStack;

      const [taskToRestore, ...remainingStack] = prevStack;
      setTasks(prev => [...prev, taskToRestore]);

      return remainingStack;
    });
  }, []);

  return { tasks, deleteTask, undoDelete, undoStack };
};
```

### Step 7: Run Tests (GREEN)

```bash
npm test useTaskDelete

# Output:
# PASS  useTaskDelete.test.ts
#   ✓ should remove task from list when deleted
#   ✓ should add deleted task to undo stack
#   ✓ should restore last deleted task
#   ✓ should do nothing when undo stack is empty
#   ✓ should limit undo stack to 10 items
#   ✓ should undo deletions in reverse order (LIFO)
#   ✓ should handle deletion of non-existent task
#
# Tests passed: 8
```

✅ **GREEN!** All tests passing.

### Step 8: Refactor

```
Tests passing! Let's refactor:

1. Extract undo stack limit constant:
   const MAX_UNDO_STACK = 10;

2. Extract stack operations:
   const addToUndoStack = (task: Task, stack: Task[]) =>
     [task, ...stack].slice(0, MAX_UNDO_STACK);

3. Add JSDoc comments for public API

Keep tests GREEN throughout refactoring.
```

### Step 9: Verify Refactoring

```bash
npm test useTaskDelete -- --watch

# Tests stay GREEN after each refactoring step ✅
```

---

## Common Patterns

### Pattern 1: One Test at a Time

Don't write all tests upfront. Write one test, implement, refactor, repeat.

**Why**: Smaller steps = less overwhelming, easier to debug

### Pattern 2: Test Behavior, Not Implementation

**Bad**:
```typescript
expect(component.state.isDeleting).toBe(true);
```

**Good**:
```typescript
expect(screen.getByRole('button', { name: 'Delete' }))
  .toBeDisabled();
```

### Pattern 3: Specific Assertions

**Bad**:
```typescript
expect(result).toBeDefined();
expect(result).toBeTruthy();
```

**Good**:
```typescript
expect(result).toEqual({
  success: true,
  deletedCount: 1,
  remainingTasks: 5
});
```

---

## Troubleshooting

### Tests Pass Without Implementation

**Problem**: Agent wrote tests that pass even with no code.

**Cause**: Testing mocks instead of real code.

**Fix**: Review test setup - are you testing actual behavior?

### Tests Still Fail After Implementation

**Problem**: Implementation doesn't match test expectations.

**Cause**:
- Tests too strict
- Implementation wrong
- Misaligned understanding

**Fix**: Debug one failing test at a time. Check what's expected vs actual.

### Tests Break During Refactoring

**Problem**: Refactoring changed behavior.

**Cause**: Tests were testing implementation details that changed.

**Fix**: Either:
- Revert refactoring (it changed behavior)
- Update tests (if behavior should have changed)

---

## Key Takeaways

1. **Tests first, always** - No code before tests
2. **Review tests critically** - Don't trust agent tests blindly
3. **Verify RED state** - Tests must fail initially
4. **Minimal implementation** - Just enough to pass
5. **Refactor fearlessly** - Tests protect you
6. **Stay GREEN** - Tests should always pass after implementation

---

**Remember**: TDD is a discipline. It feels slower at first but prevents bugs, enables refactoring, and improves design. With agents, it also prevents hallucination!
