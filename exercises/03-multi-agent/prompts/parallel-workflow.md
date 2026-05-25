# Parallel Multi-Agent Workflow

## Approach

Use **four agents working simultaneously** on different aspects:

- **Agent A (Frontend)** - UI components and client logic
- **Agent B (Backend)** - API endpoints and server logic
- **Agent C (Testing)** - Tests for both frontend and backend
- **Agent D (Documentation)** - Code comments and architecture docs

Then **you** integrate all their work.

---

## Pre-Work: Define Contracts

**Before launching agents**, establish shared contracts:

### 1. API Contract

Define the exact API endpoints all agents will use:

```
DELETE /tasks/:id
Response: 204 No Content (success) or 404 Not Found

GET /tasks?sort=priority|createdAt
Response: Task[] (sorted as requested)
```

### 2. Type Definitions

Create shared TypeScript types:

```typescript
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

type SortPreference = 'priority' | 'createdAt';

interface OptimisticUpdate<T> {
  id: string;
  data: T;
  status: 'pending' | 'success' | 'error';
}
```

### 3. Component Interface

Define what the frontend will expose:

```typescript
interface TaskWidgetProps {
  tasks: Task[];
  onTaskDelete: (id: string) => Promise<void>;
  onSortChange: (sort: SortPreference) => void;
  sortPreference: SortPreference;
}
```

**Share these contracts with ALL agents upfront.**

---

## Agent A: Frontend Developer

### Role

Implement all UI components and client-side logic.

### Prompt Template

```
You are the Frontend Developer on a multi-agent team.

## Your Responsibilities

Implement the following UI features:

1. **Priority Sorting UI**
   - Dropdown/toggle for sort preference (priority vs created date)
   - Visual indication of current sort
   - Persist preference to localStorage

2. **Task Deletion UI**
   - Delete button on each task
   - Confirmation dialog before deletion
   - Loading state during deletion
   - Error handling if deletion fails

3. **Optimistic UI Updates**
   - Show deletion immediately (before API confirms)
   - Revert if API call fails
   - Visual feedback for pending operations

## Shared Contracts

Use these exact types (other agents are using the same):
[Paste type definitions]

API endpoints (Backend agent is implementing these):
- DELETE /tasks/:id → 204 or 404
- GET /tasks?sort=priority|createdAt → Task[]

## Constraints

- DO implement: All UI components, client state, optimistic updates
- DO NOT implement: API endpoints (Backend agent's job)
- DO NOT implement: Tests (Testing agent's job)

Follow:
- docs/coding-guidelines.md for code style
- docs/ui-guidelines.md for React patterns and accessibility

Focus on working UI. Don't write tests yet.
```

### What Agent A Should Produce

- UI components for sorting, deletion, confirmation
- Client-side optimistic update logic
- State management for UI
- API client calls (but not API implementation)
- Accessible, keyboard-navigable UI

### Monitor for Issues

- **Scope creep**: Is Frontend agent trying to implement backend?
- **Contract deviation**: Are they using the agreed types?
- **Missing features**: Did they skip any requirements?

---

## Agent B: Backend Developer

### Role

Implement API endpoints and server-side logic.

### Prompt Template

```
You are the Backend Developer on a multi-agent team.

## Your Responsibilities

Implement the following API endpoints:

1. **DELETE /tasks/:id**
   - Remove task from data store
   - Return 204 No Content on success
   - Return 404 Not Found if task doesn't exist
   - Handle edge cases (already deleted, invalid ID)

2. **Update GET /tasks to support sorting**
   - Accept query param: ?sort=priority|createdAt
   - Return tasks sorted accordingly
   - Default to createdAt if param missing

3. **Idempotency**
   - DELETE should be idempotent (safe to call multiple times)
   - Handle concurrent deletion requests

## Shared Contracts

Use these exact types (Frontend agent is using the same):
[Paste type definitions]

Return formats (Frontend expects these):
- DELETE /tasks/:id → 204 (empty body) or 404 with { error: "Task not found" }
- GET /tasks?sort=X → Task[] (array of tasks, sorted)

## Constraints

- DO implement: API endpoints, validation, error handling
- DO NOT implement: UI components (Frontend agent's job)
- DO NOT implement: Tests (Testing agent's job)

Follow:
- docs/coding-guidelines.md for code style
- docs/api-contracts.md for API patterns

Focus on working API. Don't write tests yet.
```

### What Agent B Should Produce

- DELETE endpoint implementation
- GET endpoint with sorting support
- Validation and error handling
- Idempotent deletion logic

### Monitor for Issues

- **Contract deviation**: Are response formats exactly as specified?
- **Missing error handling**: Are all edge cases covered?
- **Scope creep**: Is Backend agent trying to implement frontend?

---

## Agent C: Testing Specialist

### Role

Write comprehensive tests for both frontend and backend.

### Prompt Template

```
You are the Testing Specialist on a multi-agent team.

## Your Responsibilities

Other agents are implementing features. Your job: write all tests.

Features being implemented:
1. Priority sorting (frontend + backend)
2. Optimistic UI updates (frontend)
3. Task deletion with confirmation (frontend + backend)

## Frontend Tests to Write

Test these components/behaviors:
- Sorting dropdown/toggle functionality
- Task deletion confirmation dialog
- Optimistic update (immediate UI change)
- Rollback on API failure
- Loading states during deletion
- Error display if deletion fails

## Backend Tests to Write

Test these API endpoints:
- DELETE /tasks/:id
  - Returns 204 on success
  - Returns 404 if task doesn't exist
  - Is idempotent (multiple calls safe)
  - Handles invalid IDs
- GET /tasks?sort=priority
  - Returns tasks sorted by priority (high→medium→low)
- GET /tasks?sort=createdAt
  - Returns tasks sorted by creation date

## Shared Contracts

Types and interfaces:
[Paste type definitions]

API contracts:
[Paste API contracts]

## Constraints

- DO write: Unit tests, component tests, integration tests
- DO NOT: Modify implementation code (that's other agents' job)

Follow docs/testing-strategy.md:
- Vitest for unit tests
- React Testing Library for component tests
- Supertest for API tests
- AAA pattern (Arrange-Act-Assert)
- Descriptive test names

Write comprehensive tests covering happy paths and edge cases.
```

### What Agent C Should Produce

- Frontend component tests
- Frontend integration tests (UI flow)
- Backend API endpoint tests
- Edge case coverage
- All tests following testing standards

### Monitor for Issues

- **Incomplete coverage**: Are all features tested?
- **Wrong assumptions**: Does agent understand what to test?
- **Testing implementation details**: Are tests brittle?

---

## Agent D: Documentation Specialist

### Role

Add code documentation, comments, and update architecture docs.

### Prompt Template

```
You are the Documentation Specialist on a multi-agent team.

## Your Responsibilities

Other agents are implementing features. Your job: document everything.

Features being implemented:
1. Priority sorting
2. Optimistic UI updates
3. Task deletion

## Documentation to Create

1. **Code Comments**
   - Add JSDoc to all public functions
   - Comment complex logic (especially optimistic updates)
   - Explain "why" not just "what"

2. **Architecture Documentation**
   - Document how optimistic updates work
   - Explain deletion flow (UI → confirmation → API → optimistic update)
   - Document error handling and rollback strategy
   - Add diagrams if helpful

3. **API Documentation**
   - Document new DELETE endpoint
   - Document updated GET endpoint (sorting params)
   - Add example requests/responses

4. **README Updates**
   - Document new features for users
   - Update any relevant setup/usage instructions

## Shared Contracts

Types, APIs, and architecture:
[Paste contracts and current architecture]

## Constraints

- DO write: Comments, docs, architecture updates
- DO NOT: Modify implementation logic (other agents' job)
- DO NOT: Write tests (Testing agent's job)

Follow docs/coding-guidelines.md for comment style.

Focus on clarity and completeness.
```

### What Agent D Should Produce

- JSDoc comments on functions
- Inline comments for complex logic
- Updated architecture documentation
- API documentation
- README updates

### Monitor for Issues

- **Over-commenting**: Comments stating the obvious
- **Inaccurate docs**: Documentation not matching implementation
- **Missing "why"**: Only explaining "what" not "why"

---

## Integration Phase (Your Job)

After all agents complete their work, **you** integrate everything.

### Step 1: Collect All Work

Gather from each agent:
- Agent A (Frontend): UI components, client state
- Agent B (Backend): API endpoints
- Agent C (Testing): All test files
- Agent D (Documentation): Comments and docs

### Step 2: Check for Conflicts

Look for:
- **Type mismatches**: Do Frontend and Backend use exact same types?
- **API contract violations**: Does Backend return what Frontend expects?
- **Naming inconsistencies**: Different agents naming things differently?
- **Duplicated code**: Did agents implement similar utilities?

### Step 3: Resolve Conflicts

For each conflict:
```
Conflict: Frontend expects 204 with empty body, Backend returns { success: true }

Resolution:
- Update Backend to match contract (return 204 with empty body)
- Reason: Frontend spec was agreed upfront

Document: Added to conflict log
```

### Step 4: Integrate Code

Merge all code:
```bash
# Create integration branch
git checkout -b exercise-03-parallel-integration

# Copy Frontend agent's code
[Add Agent A's files]

# Copy Backend agent's code
[Add Agent B's files]

# Copy Testing agent's tests
[Add Agent C's files]

# Merge Documentation agent's updates
[Add Agent D's comments and docs]
```

### Step 5: Run Tests

```bash
npm test
```

**If tests fail:**
- Are tests wrong? (fix tests)
- Is implementation wrong? (fix implementation)
- Is contract mismatch? (align Frontend/Backend)

### Step 6: Manual Testing

Run the full application:
- Test sorting UI
- Test task deletion flow
- Test optimistic updates
- Test error scenarios
- Test all edge cases

### Step 7: Final Review

Verify:
- ☐ All features work end-to-end
- ☐ All tests pass
- ☐ No conflicts remain
- ☐ Code is documented
- ☐ Follows coding guidelines

---

## Parallel Workflow Timeline Example

**Time 0:00** - Define contracts, launch all agents simultaneously

**Time 0:00-0:30** - All agents work independently:
- Agent A builds UI components
- Agent B implements API endpoints
- Agent C writes tests (based on contracts)
- Agent D writes documentation

**Time 0:30** - Collect work from all agents

**Time 0:30-0:45** - Integration phase:
- Identify conflicts
- Resolve mismatches
- Merge code
- Run tests

**Time 0:45-0:55** - Fix integration issues:
- Fix test failures
- Resolve type mismatches
- Align implementations

**Time 0:55-1:00** - Final verification:
- Manual testing
- Final review
- Commit integrated code

**Total**: ~1 hour

---

## Advantages of Parallel Workflow

✅ **Faster** - Work happens simultaneously
✅ **Specialization** - Each agent focuses on their domain
✅ **Parallelizable** - True concurrent work
✅ **Scalable** - Can add more specialized agents
✅ **Clear ownership** - Each agent owns their domain

---

## Disadvantages of Parallel Workflow

⚠️ **Integration overhead** - Combining work takes time and effort
⚠️ **Conflicts** - Agents may make incompatible decisions
⚠️ **Coordination required** - Must define contracts upfront
⚠️ **Risk of rework** - Misaligned agents require rework
⚠️ **Testing challenges** - Tests written before implementation might be wrong
⚠️ **Your effort** - YOU do the integration work

---

## Common Integration Challenges

### Challenge 1: Type Mismatches

```typescript
// Frontend agent wrote:
interface OptimisticUpdate {
  taskId: string;
  status: string;
}

// Backend agent wrote:
interface PendingOperation {
  id: string;
  state: 'pending' | 'done';
}

// Resolution: Pick one, update the other
```

### Challenge 2: API Contract Violations

```typescript
// Contract says: DELETE returns 204 No Content
// Backend implemented: DELETE returns 200 OK with { deleted: true }

// Resolution: Backend must change to match contract
```

### Challenge 3: Duplicated Logic

```typescript
// Frontend agent created: sortTasksByPriority()
// Testing agent created: sortByPriority()

// Resolution: Use Frontend's version, delete Testing's duplicate
```

### Challenge 4: Missing Dependencies

```typescript
// Frontend agent assumes: useTasks() hook exists
// Backend agent didn't create it

// Resolution: Add missing hook or refactor Frontend
```

---

## Metrics to Track

| Metric | Value |
|--------|-------|
| Contract definition time | ___ min |
| Parallel work time | ___ min |
| Integration time | ___ min |
| Total time | ___ min |
| Number of conflicts found | ___ |
| Time resolving conflicts | ___ min |
| Test failures after integration | ___ |
| Manual fixes required | ___ |
| Final code quality (1-10) | ___ |

---

## Conflict Log Template

Document every conflict:

```markdown
## Conflict 1: API Response Format

**Agents involved**: Frontend (A), Backend (B)

**Issue**:
- Frontend expects: 204 No Content
- Backend returns: 200 OK with { success: true }

**Root cause**: Backend agent didn't check contract

**Resolution**: Updated Backend to return 204

**Time spent**: 5 minutes

**Lesson**: Need clearer API contracts
```

---

## After Completing Parallel Workflow

1. **Review conflict log** - What caused misalignment?
2. **Measure integration time** - How much effort was integration?
3. **Compare to sequential** - Faster? Better quality?
4. **Identify bottlenecks** - Where did parallel workflow struggle?
5. **Document learnings** - What would you do differently?

---

## Reflection Questions

1. Was parallel work actually faster than sequential?
2. How much time did integration take?
3. Could conflicts have been prevented with better contracts?
4. Which agent's work was highest quality?
5. Did specialization produce better results?
6. Would you use parallel workflow for real projects?
7. What would you change about the contract definition?
8. How much of your time was spent coordinating vs agents working?

---

## Tips for Success

### Before Starting

1. **Define contracts precisely** - Types, APIs, interfaces
2. **Share contracts with ALL agents** - Everyone uses same spec
3. **Set clear boundaries** - What each agent is/isn't responsible for
4. **Plan integration** - Know how you'll combine the work

### During Parallel Work

1. **Check in periodically** - Make sure agents aren't drifting
2. **Catch deviations early** - Review work-in-progress
3. **Document decisions** - Track what each agent decided
4. **Prepare for integration** - Think about how pieces fit together

### During Integration

1. **Start with types** - Resolve type conflicts first
2. **Then APIs** - Ensure Frontend/Backend align
3. **Run tests frequently** - Catch issues incrementally
4. **Be willing to refactor** - Sometimes agents' code needs changes
5. **Document conflicts** - Learn from what went wrong

---

**Remember**: Parallel workflow is about **speed through specialization**. It should be faster than sequential, but integration requires human expertise. Track whether the time saved is worth the coordination complexity!
