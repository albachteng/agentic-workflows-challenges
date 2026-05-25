# Exercise 5: Agentic TDD

**This is one of the most important exercises in the lab.**

## Learning Objectives

By completing this exercise, you will:

- Practice strict Test-Driven Development with an LLM agent
- Evaluate agent-generated tests critically before implementation
- Understand how tests prevent hallucination and ensure correctness
- Experience the RED-GREEN-REFACTOR cycle with AI assistance
- Identify gaps in agent-generated test coverage
- Learn when tests improve agent reliability vs when they're just checking boxes

---

## The Challenge

**Goal**: Implement three features using **strict TDD**:

1. **Task Deletion with Undo**
   - Delete tasks
   - Undo deletion within same session
   - Cannot undo after page refresh

2. **Request Retry Logic**
   - Automatically retry failed API requests (network errors)
   - Exponential backoff
   - Give up after 3 attempts
   - Don't retry on 4xx errors

3. **Form Validation**
   - Real-time validation as user types
   - Multiple validation rules
   - Clear error messages
   - Disable submit until valid

---

## The TDD Rules

**YOU MUST FOLLOW THESE RULES**:

1. **NO implementation before tests** - Write failing tests first, always
2. **Review tests before implementing** - Critically evaluate agent-proposed tests
3. **One feature at a time** - Complete full TDD cycle before next feature
4. **Tests must fail first** - Verify RED state before going GREEN
5. **Minimal implementation** - Write only enough code to pass tests
6. **Refactor with passing tests** - Clean up code while staying GREEN

---

## Git Workflow

```bash
# Create branch for TDD exercise
git checkout main
git checkout -b exercise-05-agentic-tdd

# For each feature, commit at each TDD phase:
git commit -m "test: add failing tests for task deletion"
git commit -m "feat: implement task deletion (tests passing)"
git commit -m "refactor: extract deletion logic to custom hook"
```

---

## The TDD Cycle

For **each feature**:

### Phase 1: RED - Write Failing Tests

**Prompt the agent**:
```
Write tests for [feature] following TDD.

Do NOT implement the feature yet.
Just write comprehensive tests that would verify the feature works correctly.

Tests should:
- Cover happy path
- Cover edge cases
- Cover error scenarios
- Follow AAA pattern (docs/testing-strategy.md)
- Have descriptive names

The tests should FAIL initially (RED state).
```

**Your job**:
- Review proposed tests critically
- Identify missing edge cases
- Check for weak assertions
- Ensure tests actually test behavior (not implementation details)
- Verify tests will actually fail without implementation

**Common test quality issues to watch for**:
- ❌ Tests that would pass without implementation (testing mocks!)
- ❌ Missing edge cases (empty arrays, null, errors)
- ❌ Weak assertions (`expect(result).toBeDefined()` without checking value)
- ❌ Testing implementation details instead of behavior
- ❌ No error case tests

### Phase 2: Verify RED

**Run the tests**:
```bash
npm test
```

**They MUST fail**. If they pass, the tests are wrong!

### Phase 3: GREEN - Implement to Pass Tests

**Prompt the agent**:
```
Here are the tests we agreed on:
[Reference test file]

Now implement the feature to make these tests pass.

Write minimal, clean implementation.
Do NOT change the tests.
Focus on making all tests GREEN.
```

**Run tests frequently**:
```bash
npm test -- --watch
```

Watch tests go from RED → GREEN.

### Phase 4: REFACTOR - Clean Up

**Prompt the agent**:
```
All tests are passing. Now refactor the implementation to improve:
- Code clarity
- Separation of concerns
- Performance
- Maintainability

KEEP ALL TESTS PASSING.
Do NOT change test behavior.
```

**Run tests after each refactoring**:
Ensure you stay GREEN throughout refactoring.

---

## Feature 1: Task Deletion with Undo

### Test Cases to Cover

**Happy path**:
- Delete a task → task disappears
- Undo deletion → task reappears
- Multiple deletes → undo stack works correctly

**Edge cases**:
- Undo with empty undo stack → no-op
- Delete non-existent task → error handling
- Undo limit (max 10 operations?)

**Error cases**:
- API delete fails → task still visible, show error
- Concurrent deletion → handle gracefully

### Implementation Constraints

- Undo only persists in memory (not across page refresh)
- Use optimistic UI (remove immediately, revert on failure)
- Maximum 10 operations in undo stack

---

## Feature 2: Request Retry Logic

### Test Cases to Cover

**Happy path**:
- Request succeeds first try → no retries
- Request fails, succeeds on retry → returns result
- Request fails 3 times → gives up, returns error

**Edge cases**:
- Retry backoff timing (100ms, 200ms, 400ms)
- Network timeout → retry
- Request canceled → don't retry

**Error cases**:
- 400 Bad Request → don't retry (client error)
- 404 Not Found → don't retry
- 500 Server Error → do retry
- 503 Service Unavailable → do retry

### Implementation Constraints

- Retry only on 5xx errors and network failures
- Don't retry on 4xx client errors
- Exponential backoff: 100ms, 200ms, 400ms
- Maximum 3 attempts total

---

## Feature 3: Form Validation

### Test Cases to Cover

**Happy path**:
- Valid input → no errors, submit enabled
- Fix invalid input → errors clear, submit enabled
- Submit with valid data → calls onSubmit

**Edge cases**:
- Empty input → show required error
- Input too long → show length error
- Multiple validation rules → all errors shown
- Whitespace-only input → treated as empty

**Error cases**:
- Submit while invalid → prevented
- Validation runs on blur, not every keystroke (performance)
- Clear form → validation resets

### Validation Rules

For task title:
- Required (not empty after trim)
- Min length: 1 character
- Max length: 200 characters
- No leading/trailing whitespace (auto-trim)

---

## Critical Evaluation Checklist

**Before accepting agent-proposed tests**:

- ☐ Tests will actually fail without implementation
- ☐ Tests cover happy path AND edge cases
- ☐ Tests include error scenarios
- ☐ Assertions are specific (not just `.toBeDefined()`)
- ☐ Tests use AAA pattern (Arrange-Act-Assert)
- ☐ Test names clearly describe what's being tested
- ☐ Tests test behavior, not implementation details
- ☐ No duplicate or redundant tests
- ☐ Tests are independent (can run in any order)
- ☐ Mock external dependencies appropriately

**Questions to ask**:
- What edge cases are missing?
- Are these assertions strong enough?
- Would these tests catch the bug if I introduced it?
- Can the agent "fake" passing tests without real implementation?

---

## Common Agent Failures in Testing

### Failure Mode 1: Testing the Mock

```javascript
// BAD: This always passes!
const mockDelete = vi.fn().mockResolvedValue({ success: true });
const result = await mockDelete(taskId);
expect(result.success).toBe(true); // Testing the mock, not the code!
```

**Fix**: Test the real function that uses the mock:
```javascript
vi.mocked(apiClient.deleteTask).mockResolvedValue(undefined);
const { result } = renderHook(() => useTaskDelete());
await result.current.deleteTask('task-1');
expect(result.current.deletedTasks).toContain('task-1');
```

### Failure Mode 2: Weak Assertions

```javascript
// BAD: Doesn't verify correctness
expect(result).toBeDefined();
expect(result).toBeTruthy();
```

**Fix**: Check actual values:
```javascript
expect(result).toEqual({ id: '123', title: 'Test task', status: 'done' });
```

### Failure Mode 3: Missing Edge Cases

```javascript
// Only tests happy path
it('should delete task', () => { /* ... */ });
```

**Fix**: Test edge cases:
```javascript
it('should delete task when valid', () => { /* ... */ });
it('should handle delete of non-existent task', () => { /* ... */ });
it('should handle API failure during delete', () => { /* ... */ });
it('should handle concurrent delete requests', () => { /* ... */ });
```

### Failure Mode 4: Testing Implementation

```javascript
// BAD: Tests internal state
expect(component.state.isLoading).toBe(true);
```

**Fix**: Test user-visible behavior:
```javascript
expect(screen.getByText('Loading...')).toBeInTheDocument();
```

---

## Example TDD Session

### Feature: Task Deletion with Undo

**You**: "Write comprehensive tests for task deletion with undo functionality. Follow TDD - write failing tests only, no implementation yet."

**Agent**: [Proposes tests]

**You** (reviewing):
"I see tests for basic delete and undo. What about:
- Undo with empty undo stack?
- Multiple sequential deletes?
- Undo after API failure?
- Undo stack limit?

Please add test cases for these edge cases."

**Agent**: [Adds more tests]

**You**: "Better. But this assertion is weak:
`expect(result).toBeDefined()`

Change it to verify the actual task is in the undo stack:
`expect(result.undoStack).toContainEqual(deletedTask)`"

**Agent**: [Improves assertions]

**You**: "Good. Now I'll run the tests to verify they fail."

**[Runs tests - they fail]** ✅ RED state confirmed

**You**: "Tests are failing as expected. Now implement the feature to make them pass."

**Agent**: [Implements feature]

**[Runs tests - they pass]** ✅ GREEN state

**You**: "All tests passing. Now refactor to extract the undo logic into a custom hook. Keep tests passing."

**Agent**: [Refactors]

**[Runs tests - still passing]** ✅ Still GREEN after refactor

**You**: "Perfect. Feature complete with tests protecting the implementation."

---

## Deliverables

1. **Test files** - All three features with comprehensive tests
2. **Implementation files** - Clean code that passes all tests
3. **Test run output** - Screenshots or logs showing RED → GREEN transitions
4. **Reflection** - Fill out `reflection-template.md`

---

## Reflection Questions

After completing all three features:

1. **Did tests prevent hallucination?** Did the agent try to fake implementation?

2. **What bugs did tests catch?** Were there issues tests revealed?

3. **How comprehensive were agent-generated tests?** What did you have to add?

4. **Did TDD reduce agent errors?** Compared to previous exercises?

5. **Was the agent better at testing or implementation?** Which needed more guidance?

6. **Did refactoring break tests?** How well did tests protect behavior?

7. **Would you use TDD with agents in production?** Why or why not?

8. **What test smells did you see?** Weak assertions, mock testing, etc.?

---

## Next Steps

After completing this exercise:

1. Fill out `reflection-template.md`
2. Compare TDD experience to non-TDD exercises
3. Document test quality patterns
4. Move on to Exercise 6: Local Agent with llama.cpp

---

## Resources

- `docs/testing-strategy.md` - Testing philosophy and TDD practices
- `docs/coding-guidelines.md` - Code style for tests
- Prompts:
  - `prompts/test-first-workflow.md` - TDD workflow examples
  - `prompts/reviewing-agent-tests.md` - How to review test quality

---

**Remember**: The goal isn't just to get tests. The goal is to use tests to **prevent agent hallucination, ensure correctness, and enable confident refactoring**.

Be ruthless in reviewing tests. Weak tests are worse than no tests - they give false confidence!

Good luck!
