# Method C: Incremental Context

## Approach

Break the task into **small, sequential steps**. Guide the agent through phases, building context incrementally.

Phases:
1. **Planning** - Have the agent propose an approach
2. **Interface Design** - Define types and component structure
3. **State Management** - Implement state logic
4. **Implementation** - Build the UI
5. **Testing** - Add tests
6. **Review** - Evaluate and refactor

The goal is to see if incremental, guided development produces higher quality results and better agent behavior.

---

## Phase 1: Planning

### Prompt:

```
I want to add task filtering functionality to the TaskWidget component.

Before implementing, please review the following:
- docs/architecture.md (understand the existing structure)
- docs/coding-guidelines.md (our code standards)
- docs/ui-guidelines.md (React patterns)

Based on these docs, propose an approach for adding a status filter (filter by todo, in-progress, or done).

Include:
1. Where the filtering logic should live
2. What state management approach to use
3. How to structure the UI component
4. What edge cases to consider
5. What tests would be needed

Don't implement yet - just propose the plan.
```

### What to Observe:

- Does the agent actually reference the docs?
- Is the proposed approach sound?
- Does it respect the architecture constraints?
- Does it identify relevant edge cases?
- Is the plan specific and actionable?

### Follow-Up:

Review the plan. If it's good:
```
This looks good. Let's proceed with this approach.
```

If it needs adjustment:
```
I have concerns about [specific issue]. The architecture doc suggests [alternative]. Can you revise the plan?
```

---

## Phase 2: Interface Design

### Prompt:

```
Great. Now let's define the TypeScript interfaces and types we'll need for this feature.

Based on the existing Task interface in docs/api-contracts.md, define:
1. The type for filter state (what values can it have?)
2. Any new props the component will need
3. The signature of the filtering function
4. Any new component props or interfaces

Follow the guidelines in docs/coding-guidelines.md for type definitions.

Just provide the type definitions - don't implement the logic yet.
```

### What to Observe:

- Are the types correct and complete?
- Do they follow the type naming conventions?
- Are they consistent with existing types?
- Does the agent use `type` vs `interface` appropriately?

### Follow-Up:

If types look good:
```
These types look correct. Let's move to implementation.
```

If there are issues:
```
The FilterState type should include an 'all' option for showing all tasks. Please revise.
```

---

## Phase 3: State Management

### Prompt:

```
Now implement the state management for the filter.

Create:
1. State for the current filter selection
2. A memoized function that filters tasks based on the current filter state
3. Event handler for when the filter changes

Use the types we defined in Phase 2.
Follow React best practices from docs/ui-guidelines.md (useMemo, useCallback where appropriate).

Just show the state management logic - we'll add the UI next.
```

### What to Observe:

- Does it use appropriate hooks?
- Is useMemo applied correctly?
- Is the filtering logic efficient?
- Are edge cases (empty array) handled?
- Does it follow naming conventions (handle* for handlers)?

### Follow-Up:

```
Good. Now let's verify this logic with some quick tests before building the UI.
```

---

## Phase 4: Implementation

### Prompt:

```
Now let's implement the UI for the filter.

Add a dropdown selector that:
1. Shows options for "All", "To Do", "In Progress", "Done"
2. Uses the state management we created
3. Calls the handler when selection changes
4. Has proper accessibility (label, semantic HTML)

Follow the UI guidelines in docs/ui-guidelines.md for:
- Semantic HTML
- ARIA labels
- Form patterns

Show me the complete component with the filter UI integrated.
```

### What to Observe:

- Is semantic HTML used (`<select>` not `<div>`)?
- Are ARIA labels present?
- Is the component structure clean?
- Does it integrate well with existing code?
- Is it keyboard accessible?

### Follow-Up:

If the UI looks good:
```
Great. Let's add tests to verify this works correctly.
```

If there are issues:
```
The dropdown needs a proper label for accessibility. Please add an aria-label or associated <label> element.
```

---

## Phase 5: Testing

### Prompt:

```
Now write comprehensive tests for the filtering functionality.

Following docs/testing-strategy.md, write unit tests that cover:

1. Filtering by each status (todo, in-progress, done)
2. "All" filter shows all tasks
3. Empty state when no tasks match filter
4. Filter state updates correctly when selection changes
5. Edge case: filtering an empty task array

Use the Arrange-Act-Assert pattern and descriptive test names.

Show me the complete test file.
```

### What to Observe:

- Are tests comprehensive?
- Do they cover edge cases?
- Are test names descriptive?
- Do they follow AAA pattern?
- Are assertions specific (not just "toBeDefined")?
- Do tests actually test behavior, not implementation details?

### Follow-Up:

```
Run the tests. Do they all pass?
```

If tests fail:
```
The test for "empty array" is failing. Can you fix the implementation to handle that case?
```

---

## Phase 6: Review and Refactor

### Prompt:

```
Now that everything is working and tested, let's review the code.

Looking at the complete implementation:
1. Does it follow all guidelines in docs/coding-guidelines.md?
2. Are there any performance improvements we could make?
3. Is the code as simple as it could be?
4. Are there any code smells or antipatterns?

Suggest any refactorings that would improve code quality, but maintain all tests passing.
```

### What to Observe:

- Does the agent critically evaluate its own work?
- Does it suggest reasonable improvements?
- Are suggested refactorings actually beneficial?
- Does it maintain test coverage during refactoring?

### Follow-Up:

If refactoring suggestions are good:
```
Go ahead and implement those refactorings. Ensure all tests still pass.
```

If not needed:
```
I think the code is clean as-is. Let's commit this.
```

---

## Complete Example Flow

Here's what a complete Method C conversation might look like:

```
You: [Phase 1 - Planning prompt]
Agent: [Proposes approach]
You: "Good plan. One adjustment: put filtering logic in a custom hook. Proceed."
Agent: [Revises plan]

You: [Phase 2 - Interface design prompt]
Agent: [Provides types]
You: "Types look good. Continue."

You: [Phase 3 - State management prompt]
Agent: [Implements state logic]
You: "I see you're using useState but not useMemo. Based on ui-guidelines.md, the filtered list should be memoized. Please add that."
Agent: [Adds useMemo]

You: [Phase 4 - Implementation prompt]
Agent: [Implements UI]
You: "Perfect. Looks accessible and semantic."

You: [Phase 5 - Testing prompt]
Agent: [Writes tests]
You: "Tests look comprehensive. Run them."
Agent: [Reports results]
You: "All passing. Great."

You: [Phase 6 - Review prompt]
Agent: [Suggests refactorings]
You: "Good suggestions. Implement them and verify tests still pass."
Agent: [Refactors, runs tests]
You: "Excellent. This is complete."
```

---

## Key Principles of Method C

### 1. Build Context Gradually

Each phase builds on previous phases. The agent has full context of prior decisions.

### 2. Verify at Each Step

Don't let the agent run ahead. Verify each phase before proceeding.

### 3. Guide, Don't Dictate

Provide constraints and requirements, but let the agent make decisions within those bounds.

### 4. Course-Correct Early

If the agent starts down the wrong path in planning, correct it before implementation.

### 5. Demand Quality

Ask for refactoring and improvements. Don't accept "good enough" initially.

---

## Advantages of Method C

✅ **Catches issues early** - Review plan before implementation
✅ **Builds shared context** - Agent and human have common understanding
✅ **Allows course correction** - Easier to adjust early than late
✅ **Encourages best practices** - Explicitly asks for testing, review
✅ **Creates learning opportunity** - Each phase reinforces concepts
✅ **Maintains quality** - Multiple check-ins prevent drift

---

## Disadvantages of Method C

⚠️ **More time intensive** - Many more prompts and interactions
⚠️ **Requires expertise** - You need to know what "good" looks like to guide effectively
⚠️ **Potential over-engineering** - Might add unnecessary formality for simple tasks
⚠️ **Context window usage** - Long conversations use more context
⚠️ **Not asynchronous** - Requires interactive back-and-forth

---

## What to Observe

### Process Observations

- How many total prompts were needed?
- How much time did the entire process take?
- At which phase did issues arise?
- How many course corrections were needed?

### Quality Observations

- Is the final code better than Method A and B?
- Are tests more comprehensive?
- Did incremental review prevent bugs?
- Is the code more maintainable?

### Agent Behavior

- Did the agent maintain context across phases?
- Did it reference earlier decisions appropriately?
- Did it suggest good improvements in the review phase?
- Where did it need the most guidance?

---

## Common Outcomes

### Positive Outcomes
- ✅ Highest quality code of the three methods
- ✅ Most comprehensive tests
- ✅ Fewest bugs in final implementation
- ✅ Best adherence to guidelines
- ✅ Agent "learns" patterns through the process

### Potential Issues
- ⚠️ Takes significantly longer than other methods
- ⚠️ May feel like hand-holding the agent
- ⚠️ Could lose sight of the big picture in small steps
- ⚠️ Might be overkill for simple features

### Surprises You Might Encounter
- 🎯 Agent makes connections between phases you didn't expect
- 🎯 Review phase catches issues you missed
- 🎯 Agent suggests creative improvements
- 🚨 Agent forgets context from early phases (context drift)
- 🚨 Agent wants to skip ahead instead of following phases

---

## Recording Your Results

Create: `transcripts/method-c-transcript.md`

```markdown
# Method C: Incremental Context - Transcript

## Phase 1: Planning
[Timestamp: 2025-01-15 13:00]

**Prompt:**
[Your planning prompt]

**Agent Response:**
[Proposed plan]

**Your Feedback:**
[Your review and any corrections]

---

## Phase 2: Interface Design
[Timestamp: 2025-01-15 13:10]

**Prompt:**
[Your interface design prompt]

**Agent Response:**
[Type definitions]

**Your Feedback:**
[Approval or corrections]

---

[Continue for all phases...]

---

## Summary

**Total phases**: 6
**Total prompts**: X
**Time to completion**: X minutes
**Course corrections needed**: X
**Final code quality**: [Your assessment]

## Comparison to Methods A & B

**Advantages over A & B:**
- [List]

**Disadvantages compared to A & B:**
- [List]

## Key Observations

[Detailed notes on the process and outcomes]
```

---

## After Completing Method C

1. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add task filtering (Method C - incremental context)"
   ```

2. **Compare to Methods A and B**
   ```bash
   # Compare code quality
   git diff exercise-01-method-a exercise-01-method-c

   # Compare to Method B
   git diff exercise-01-method-b exercise-01-method-c
   ```

3. **Run all tests** from all three methods

4. **Compare transcripts** - Which method required more interaction?

5. **Fill out reflection template** comparing all three

---

## Reflection Questions for Method C

1. Was the incremental approach worth the extra time?
2. At which phase did the most value come from the interaction?
3. Did early planning prevent later issues?
4. How did the final code compare to Methods A and B?
5. Would you use this method for production work?
6. What would you change about the phase structure?
7. Did the agent maintain context well across phases?
8. Were there diminishing returns at some point?

---

## Tips for Success

1. **Be patient** - This method takes time, that's the point
2. **Verify each phase** - Don't rush ahead
3. **Ask for explanations** - Understanding the agent's reasoning helps
4. **Reference docs frequently** - Keep pointing back to guidelines
5. **Allow creativity** - Don't dictate exact implementation
6. **Demand quality** - Use the review phase to push for improvements
7. **Take detailed notes** - The process is as valuable as the result

---

## Variations to Try

### Variation 1: Add More Phases

- Add explicit "research" phase (review existing code first)
- Add "documentation" phase at the end
- Add "accessibility audit" phase

### Variation 2: Fewer Phases

- Combine planning and interface design
- Combine implementation and testing
- Skip review phase

### Variation 3: Different Order

- Start with tests (strict TDD - hint: see Exercise 5!)
- Do review after planning, not at the end
- Interleave testing throughout instead of one phase

---

**Remember**: Method C is about deliberate, guided development. The goal is to see if careful, incremental collaboration produces the best results, even if it takes more time.

Good luck!
