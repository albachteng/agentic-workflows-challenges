# Reviewing Agent-Generated Tests

## Why Critical Review Matters

Agents can generate tests that **look good but are actually useless**.

Common issues:
- Testing mocks instead of real code
- Weak assertions that don't verify correctness
- Missing edge cases
- Testing implementation details
- Tests that would pass even without the feature

**Your job**: Catch these issues before wasting time on implementation.

---

## Review Checklist

For each test the agent proposes, verify:

### ✅ Will This Test Actually Fail?

**Red flag**:
```typescript
const mockFn = vi.fn().mockReturnValue(true);
expect(mockFn()).toBe(true); // This always passes!
```

**Check**: Would this test fail if the feature doesn't exist?

### ✅ Are Assertions Specific?

**Bad**:
```typescript
expect(result).toBeDefined();
expect(result).toBeTruthy();
```

**Good**:
```typescript
expect(result).toEqual({
  id: '123',
  title: 'Test Task',
  status: 'done'
});
```

### ✅ Are Edge Cases Covered?

**Ask**:
- Empty array?
- Null/undefined?
- Boundary values (0, -1, max)?
- Concurrent operations?
- Network failures?

### ✅ Are Error Cases Tested?

**Check for**:
- Invalid input handling
- API failures
- Permission denied
- Resource not found
- Timeout scenarios

### ✅ Do Tests Follow AAA Pattern?

```typescript
it('should delete task when valid', () => {
  // Arrange - Set up test data
  const tasks = [{ id: '1', title: 'Test' }];
  const { result } = renderHook(() => useTaskDelete(tasks));

  // Act - Execute the behavior
  result.current.deleteTask('1');

  // Assert - Verify the outcome
  expect(result.current.tasks).toHaveLength(0);
});
```

### ✅ Do Test Names Describe Behavior?

**Bad**:
```typescript
it('test 1', () => { /* ... */ });
it('delete works', () => { /* ... */ });
```

**Good**:
```typescript
it('should remove task from list when deleted', () => { /* ... */ });
it('should throw error when deleting non-existent task', () => { /* ... */ });
```

---

## Common Test Smells

### Smell 1: Testing the Mock

```typescript
// Agent might write:
const mockDelete = vi.fn().mockResolvedValue({ success: true });
await mockDelete('task-1');
expect(mockDelete).toHaveBeenCalledWith('task-1'); // ❌ Useless test
```

**Problem**: This tests that the mock works, not that the code works.

**Fix**: Test the real function that uses the mock:
```typescript
vi.mocked(apiClient.deleteTask).mockResolvedValue(undefined);
const { result } = renderHook(() => useTaskDelete());
await result.current.deleteTask('task-1');
expect(result.current.tasks).not.toContainEqual(
  expect.objectContaining({ id: 'task-1' })
); // ✅ Tests real behavior
```

### Smell 2: Weak Assertions

```typescript
it('should return result', async () => {
  const result = await fetchTasks();
  expect(result).toBeDefined(); // ❌ Too weak
});
```

**Problem**: Would pass even if result is `{}`, `[]`, `null`, etc.

**Fix**:
```typescript
it('should return array of tasks', async () => {
  const result = await fetchTasks();
  expect(result).toEqual([
    { id: '1', title: 'Task 1', status: 'todo' },
    { id: '2', title: 'Task 2', status: 'done' },
  ]); // ✅ Specific expectation
});
```

### Smell 3: Missing Edge Cases

```typescript
// Agent only tests happy path:
it('should filter tasks by status', () => {
  const filtered = filterTasks(tasks, 'done');
  expect(filtered).toHaveLength(2);
});
```

**Problem**: What about empty array, null status, invalid status?

**Fix**: Add edge case tests:
```typescript
it('should return empty array when no tasks match', () => {
  const filtered = filterTasks(tasks, 'archived');
  expect(filtered).toEqual([]);
});

it('should return all tasks when status is null', () => {
  const filtered = filterTasks(tasks, null);
  expect(filtered).toEqual(tasks);
});

it('should throw error when status is invalid', () => {
  expect(() => filterTasks(tasks, 'invalid'))
    .toThrow('Invalid status');
});
```

### Smell 4: Testing Implementation Details

```typescript
it('should set isLoading to true', () => {
  const { result } = renderHook(() => useTasks());
  // ❌ Testing internal state
  expect(result.current.isLoading).toBe(true);
});
```

**Problem**: If you refactor to remove `isLoading` state, test breaks even though behavior is same.

**Fix**: Test user-visible behavior:
```typescript
it('should show loading indicator while fetching', () => {
  render(<TaskList />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  // ✅ Tests what user sees
});
```

### Smell 5: No Error Testing

```typescript
// Agent only tests happy path:
it('should delete task', async () => {
  await deleteTask('1');
  expect(tasks).toHaveLength(0);
});
```

**Problem**: What if API returns 404? 500? Network error?

**Fix**: Add error tests:
```typescript
it('should throw error when task not found', async () => {
  apiClient.deleteTask.mockRejectedValue(
    new Error('Task not found')
  );

  await expect(deleteTask('999'))
    .rejects.toThrow('Task not found');
});

it('should retry on network error', async () => {
  apiClient.deleteTask
    .mockRejectedValueOnce(new Error('Network error'))
    .mockResolvedValueOnce(undefined);

  await deleteTask('1');

  expect(apiClient.deleteTask).toHaveBeenCalledTimes(2);
});
```

---

## Questions to Ask the Agent

When reviewing tests, ask:

### "What edge cases are missing?"

```
These tests look good for the happy path.
What edge cases should we add?

Consider:
- Empty input
- Null/undefined
- Boundary values
- Invalid input
- Concurrent operations
```

### "Are these assertions strong enough?"

```
This assertion is too weak:
expect(result).toBeDefined()

What should the actual value be?
Change to a specific assertion.
```

### "Would this test catch a bug?"

```
If I introduced this bug: [describe bug]
Would this test catch it?

If not, strengthen the test.
```

### "Are we testing behavior or implementation?"

```
This test checks internal state.
Can we test user-visible behavior instead?
```

---

## Example Review Session

**Agent proposes**:
```typescript
describe('Task Deletion', () => {
  it('should work', async () => {
    const result = await deleteTask('1');
    expect(result).toBeDefined();
  });
});
```

**Your review**:
```
Several issues with this test:

1. Test name is too vague: "should work"
   → Change to: "should remove task from list when deleted"

2. Assertion is too weak: expect(result).toBeDefined()
   → What should result actually be?
   → Should verify task is removed from state

3. Missing edge cases:
   - What if task doesn't exist?
   - What if API call fails?
   - What if task is already deleted?

4. Not testing actual behavior:
   - Test should verify task is removed from UI/state
   - Not just that function returns something

Please rewrite with:
- Descriptive test name
- Specific assertions
- Happy path + edge cases + error cases
- Tests actual deletion behavior
```

**Agent revises**:
```typescript
describe('Task Deletion', () => {
  it('should remove task from list when deleted successfully', async () => {
    const { result } = renderHook(() => useTaskDelete(initialTasks));

    await result.current.deleteTask('1');

    expect(result.current.tasks).not.toContainEqual(
      expect.objectContaining({ id: '1' })
    );
    expect(result.current.tasks).toHaveLength(initialTasks.length - 1);
  });

  it('should throw error when deleting non-existent task', async () => {
    const { result } = renderHook(() => useTaskDelete(initialTasks));

    await expect(result.current.deleteTask('999'))
      .rejects.toThrow('Task not found');
  });

  it('should handle API failure gracefully', async () => {
    apiClient.deleteTask.mockRejectedValue(new Error('Server error'));
    const { result } = renderHook(() => useTaskDelete(initialTasks));

    await expect(result.current.deleteTask('1'))
      .rejects.toThrow('Server error');

    // Task should still be in list
    expect(result.current.tasks).toContainEqual(
      expect.objectContaining({ id: '1' })
    );
  });
});
```

**Your approval**:
```
Much better! These tests now:
✅ Have descriptive names
✅ Test actual behavior
✅ Have specific assertions
✅ Cover error cases

Approved. Run tests to verify RED state, then implement.
```

---

## Red Flags That Require Pushback

### 🚩 "Tests pass without implementation"

```
I ran the tests and they're already passing.
That means they're not testing the right thing.

Please revise tests so they FAIL without implementation.
```

### 🚩 "Only testing happy path"

```
I don't see any error case tests.
What happens if:
- Input is invalid?
- API call fails?
- Resource doesn't exist?

Add tests for these error scenarios.
```

### 🚩 "Testing mocks"

```
This test is checking that the mock returns what we told it to return.
That's not useful.

Test the actual code that uses the mock instead.
```

### 🚩 "Duplicate tests"

```
Tests 2, 3, and 4 are all testing the same thing.
Consolidate into one comprehensive test.
```

---

## Good Test Indicators

You know tests are good when:

✅ **Tests fail initially** (RED state)
✅ **Tests pass after implementation** (GREEN state)
✅ **Coverage is comprehensive** (happy path + edges + errors)
✅ **Assertions are specific** (check actual values)
✅ **Tests are independent** (can run in any order)
✅ **Tests are maintainable** (clear names, focused scope)
✅ **Tests protect behavior** (refactoring doesn't break them)

---

## Final Advice

**Be ruthless** in reviewing tests. Bad tests are worse than no tests because they give false confidence.

**Ask questions** when tests seem unclear or incomplete.

**Verify RED state** before implementing. If tests pass without implementation, they're wrong.

**Keep iterating** until tests are comprehensive and meaningful.

**Remember**: You're the quality gate. The agent will accept weak tests if you do!
