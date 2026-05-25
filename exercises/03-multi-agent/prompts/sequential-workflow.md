# Sequential Multi-Agent Workflow

## Approach

Use **four specialized agents working sequentially**:

1. **Architect** - Plans the implementation
2. **Implementer** - Writes the code
3. **Tester** - Creates comprehensive tests
4. **Reviewer** - Reviews and refactors

Each agent builds on the previous agent's work.

---

## Agent 1: The Architect

### Role

Plan the implementation **without writing code**. Focus on:
- Architecture decisions
- Component structure
- Data flow
- API design
- Edge cases to consider

### Example Prompt

```
I need you to architect (not implement) three features:

1. Priority sorting (high/medium/low)
2. Optimistic UI updates (show changes immediately, revert on failure)
3. Task deletion with confirmation

## Your Task: Architecture Planning

Please review:
- docs/architecture.md (current system)
- docs/coding-guidelines.md (our standards)
- docs/ui-guidelines.md (React patterns)

Then design:

1. **Component Structure**
   - What new components are needed?
   - What existing components need modification?
   - How will components communicate?

2. **State Management**
   - What state is needed for each feature?
   - Where should state live?
   - How to handle optimistic updates + rollback?

3. **API Integration**
   - What API calls are needed?
   - How to handle DELETE /tasks/:id?
   - Error handling strategy?

4. **Testing Strategy**
   - What needs to be tested?
   - Unit vs integration test split?
   - Mock strategy?

5. **Edge Cases**
   - What could go wrong?
   - How to handle failures?
   - Race conditions?

DO NOT write implementation code. Focus on architecture and design decisions.

Explain your reasoning for key decisions.
```

### What to Capture

Document the architect's key decisions:

- **Component architecture**: What did they plan?
- **State management**: Where will state live?
- **API strategy**: How to handle optimistic updates?
- **Testing approach**: What's the testing plan?
- **Tradeoffs**: What alternatives were considered and rejected?

### Handoff to Implementer

What you pass to Agent 2:

```
The Architect has designed the following architecture:

[Paste architecture plan]

Key decisions:
- [List 3-5 most important architectural decisions]

Please implement this design following the plan.
```

---

## Agent 2: The Implementer

### Role

Implement the code based on the Architect's plan.

### Example Prompt

```
The Architect has planned the following implementation:

[Paste architecture plan from Agent 1]

## Your Task: Implementation

Implement all three features following this architecture:

1. Priority sorting
2. Optimistic UI updates
3. Task deletion with confirmation

Follow the architectural decisions exactly as planned:
- [Summarize key architecture decisions]

Follow docs/coding-guidelines.md and docs/ui-guidelines.md for code style.

Implement both frontend and backend code.

Do NOT write tests yet - that's the next agent's job.
Focus on clean, working implementation.
```

### What to Observe

- **Architecture adherence**: Did the implementer follow the plan?
- **Deviations**: Where did they diverge from the architecture? Why?
- **Code quality**: Is the code clean and maintainable?
- **Completeness**: Did they implement all three features?

### Common Issues

**Implementer ignores architecture:**
- They might implement differently than planned
- Note these deviations - are they improvements or regressions?

**Implementer asks for clarification:**
- Architecture wasn't specific enough
- Document these gaps

**Implementer adds extra features:**
- Scope creep - did they add things not in the plan?

### Handoff to Tester

What you pass to Agent 3:

```
The Implementer has completed the code based on the Architect's plan.

Architecture plan: [Summary or link]
Implementation: [Point to code files]

## Features Implemented:
1. Priority sorting - [Location]
2. Optimistic UI updates - [Location]
3. Task deletion - [Location]

## Your Task:
Write comprehensive tests for these features.
```

---

## Agent 3: The Tester

### Role

Write comprehensive tests without modifying implementation code.

### Example Prompt

```
Code has been implemented for three features:

1. Priority sorting
2. Optimistic UI updates
3. Task deletion with confirmation

Implementation files:
- [List key files and what they do]

## Your Task: Write Tests

Following docs/testing-strategy.md:

1. Write unit tests for:
   - Sorting logic
   - Optimistic update logic
   - Deletion confirmation flow
   - Error handling/rollback

2. Write integration tests for:
   - Full user flows
   - API integration
   - Error scenarios

Use:
- Vitest for unit tests
- React Testing Library for component tests
- Arrange-Act-Assert pattern
- Descriptive test names

Cover edge cases:
- Empty arrays
- Network failures
- Race conditions
- User cancellation

DO NOT modify implementation code.
Only write tests.
```

### What to Observe

- **Coverage**: Do tests cover all features and edge cases?
- **Quality**: Are tests well-structured and meaningful?
- **Bugs found**: Do tests reveal implementation bugs?
- **Test design**: Are they testing behavior or implementation details?

### When Tests Fail

```
Tests revealed these issues:
[List failing tests]

What should we do?

Option A: Ask Tester to fix tests (if tests are wrong)
Option B: Ask Implementer to fix code (if implementation is wrong)
Option C: Ask Reviewer to assess (next agent)
```

Document which bugs were found by tests - this shows value of testing agent.

### Handoff to Reviewer

What you pass to Agent 4:

```
The code has been implemented and tested.

Architecture: [Summary]
Implementation: [File locations]
Tests: [Test file locations]

Test results: [Passing/failing status]

## Your Task:
Review the code, tests, and architecture.
Suggest improvements and refactorings.
```

---

## Agent 4: The Reviewer

### Role

Review all previous work and suggest improvements.

### Example Prompt

```
Three agents have worked on this code:

1. Architect - Designed the architecture
2. Implementer - Wrote the code
3. Tester - Created tests

Architecture plan: [Summary or link]
Implementation: [File locations]
Tests: [Test file locations]

## Your Task: Code Review

Review the complete implementation:

1. **Architecture Review**
   - Does implementation match the plan?
   - Are there architectural improvements?
   - Any technical debt introduced?

2. **Code Quality Review**
   - Does code follow docs/coding-guidelines.md?
   - Are there code smells or antipatterns?
   - Is error handling sufficient?
   - Performance concerns?

3. **Test Quality Review**
   - Are tests comprehensive?
   - Do they test the right things?
   - Missing edge cases?

4. **Refactoring Suggestions**
   - What could be simplified?
   - What could be extracted/reused?
   - What improves maintainability?

Provide specific, actionable feedback.
Suggest refactorings but keep all tests passing.
```

### What to Observe

- **Quality of review**: Does the reviewer catch real issues?
- **Alignment**: Does the reviewer understand the architecture?
- **Constructiveness**: Are suggestions helpful or nitpicky?
- **Balance**: Does the reviewer appreciate what worked well too?

### Acting on Review

You have options:

**Option 1**: Ask Reviewer to implement their own suggestions
```
Good suggestions. Please implement the refactorings you suggested, ensuring all tests still pass.
```

**Option 2**: Go back to Implementer with review feedback
```
The Reviewer suggested these improvements:
[List key suggestions]

Please implement these refactorings.
```

**Option 3**: Decide which suggestions to act on
```
I agree with suggestions 1, 2, and 4. Please implement those.
I'm going to skip suggestion 3 because [reason].
```

---

## Complete Sequential Flow Example

### Session 1: Architect (10 minutes)

```
You: [Architecture prompt]

Architect: "Here's my architectural plan:
- Component structure: [detailed plan]
- State management: [approach]
- Optimistic updates: [strategy]
- Testing: [approach]

Key decisions:
1. Client-side sorting (not API-based)
2. Optimistic state using temporary IDs
3. Confirmation modal as separate component
4. Rollback on 404 or 500 errors
..."

You: "Good plan. A few clarifications:
- Where exactly does optimistic state live?
- How do we handle race conditions?"

Architect: [Refines plan]

You: "Perfect. This architecture is approved."
[Save this architecture for next agent]
```

### Session 2: Implementer (30 minutes)

```
You: "Implement based on this architecture: [paste plan]

Key decisions to follow:
- Client-side sorting
- Optimistic updates with temporary IDs
- Confirmation modal component
..."

Implementer: [Implements code]

You: "Good implementation. I notice you deviated from the architecture by [example]. Why?"

Implementer: "I found that [reason]. This approach is better because [justification]."

You: "Makes sense. Proceed."

[Save implementation code]
```

### Session 3: Tester (20 minutes)

```
You: "Write tests for this implementation: [describe features and location]

Following testing-strategy.md, write:
- Unit tests for sorting logic
- Component tests for UI
- Integration tests for API calls
- Edge case tests for errors"

Tester: [Writes tests]

Tester: "Tests reveal a bug: deletion doesn't handle 404 correctly."

You: "Good catch. Let's fix that."
[Note: Tester found a bug!]

[Either ask Tester to fix or go back to Implementer]
```

### Session 4: Reviewer (15 minutes)

```
You: "Review this implementation: [summary of architecture, code, tests]

Architecture: [link]
Code: [files]
Tests: [files]
Known issues: [Bug found by Tester - fixed]"

Reviewer: "Overall solid. Suggestions:
1. Extract optimistic update logic into custom hook
2. Add loading states to deletion
3. Simplify sorting comparator
4. Add error boundary around deletion confirmation

Tests look good, though I'd add one for concurrent deletions."

You: "Agreed on 1, 2, and 4. Let's skip 3 - the comparator is readable as-is.

Please implement suggestions 1, 2, 4 and the new test."

Reviewer: [Implements refactorings, all tests pass]

You: "Excellent. Feature is complete."
```

---

## Key Coordination Points

### 1. Architecture → Implementation

**Critical handoff**: Is the architecture clear enough?

**Common issues**:
- Architecture too vague
- Implementer misunderstands plan
- Missing details (where does state live?)

**Solution**: Review architecture before implementing

### 2. Implementation → Testing

**Critical handoff**: Does Tester understand what to test?

**Common issues**:
- Tester doesn't know the features
- Tester tests wrong things
- Tests are too shallow

**Solution**: Explain features and critical paths explicitly

### 3. Testing → Review

**Critical handoff**: Are test failures bugs or bad tests?

**Common issues**:
- Reviewer assumes tests are correct
- Reviewer doesn't run tests
- Confusion about test intent

**Solution**: Share test results and interpretation

### 4. Review → Final

**Critical handoff**: Which suggestions to act on?

**Common issues**:
- Review suggestions conflict with architecture
- Too many nitpicky changes
- Perfectionism blocking completion

**Solution**: Prioritize suggestions, decide what's worth it

---

## Advantages of Sequential Workflow

✅ **Clear responsibility** - Each agent has one job
✅ **Specialization** - Agents can focus on their strength
✅ **Incremental progress** - Build piece by piece
✅ **Review built-in** - Later agents catch earlier mistakes
✅ **Logical flow** - Architecture → Code → Tests → Review makes sense

---

## Disadvantages of Sequential Workflow

⚠️ **Slower** - Can't parallelize
⚠️ **Context loss** - Later agents may not understand earlier decisions
⚠️ **Coordination overhead** - Managing handoffs takes time
⚠️ **Rework risk** - Later agent might undo earlier work
⚠️ **Bottlenecks** - One slow agent blocks everyone

---

## Metrics to Track

| Metric | Value |
|--------|-------|
| Total time (all agents) | ___ min |
| Agent 1 (Architect) time | ___ min |
| Agent 2 (Implementer) time | ___ min |
| Agent 3 (Tester) time | ___ min |
| Agent 4 (Reviewer) time | ___ min |
| Coordination time | ___ min |
| Number of handoffs | 3 (fixed) |
| Context loss incidents | ___ |
| Bugs found by Tester | ___ |
| Improvements from Reviewer | ___ |
| Final code quality (1-10) | ___ |

---

## After Completing Sequential Workflow

1. **Review all transcripts** - What did each agent contribute?
2. **Identify handoff issues** - Where was context lost?
3. **Measure quality** - Is the code better than single-agent?
4. **Calculate efficiency** - Time spent vs quality gained
5. **Document learnings** - What worked? What didn't?

---

## Reflection Questions

1. Was the architecture phase valuable, or could you skip to implementation?
2. Did the Implementer follow the architecture faithfully?
3. Did the Tester find real bugs?
4. Were the Reviewer's suggestions worth the time?
5. Where was context lost between agents?
6. Would you use this workflow for real work?
7. Which agent role was most valuable?
8. Which could have been skipped?

---

**Remember**: Sequential workflow is about **specialization and quality**. It takes longer but should produce better results through multiple perspectives and review stages.

Track whether the quality improvement justifies the coordination overhead!
