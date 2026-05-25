# Method B: Structured Prompt

## Approach

Provide **comprehensive context** in a single, well-structured prompt.

Include:
- Architecture constraints
- Coding standards
- Expected behavior
- Interface requirements
- References to documentation

The goal is to see if rich upfront context produces better, more consistent results.

---

## Example Prompt

```
I need you to add task filtering functionality to the TaskWidget component.

## Requirements

Users should be able to filter tasks by status using a dropdown selector.

**Functional Requirements:**
- Display a dropdown with options: "All", "To Do", "In Progress", "Done"
- Default selection should be "All" (show all tasks)
- When a status is selected, only show tasks matching that status
- If no tasks match the filter, show an empty state message

**Non-Functional Requirements:**
- Follow the coding standards in docs/coding-guidelines.md
- Follow React patterns in docs/ui-guidelines.md
- Maintain consistency with existing component architecture
- Include proper TypeScript types
- Handle edge cases (empty list, no matches)

## Architecture Constraints

Based on docs/architecture.md:
- Keep filtering logic separate from UI rendering
- Don't put business logic in the component
- Use proper React hooks (useMemo for filtering)
- Follow the existing component structure

## Technical Details

**Task Interface** (from docs/api-contracts.md):
```typescript
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}
```

**Status Values:**
- 'todo'
- 'in-progress'
- 'done'

## Expected Behavior

1. Dropdown shows above the task list
2. Selecting a status filters the visible tasks
3. Filter state is managed locally (no API call needed)
4. Filtering should be performant (use useMemo)
5. Empty state: "No tasks match the selected filter"

## Code Style (from docs/coding-guidelines.md)

- Use arrow functions for components
- Prefix event handlers with `handle`
- Use `interface` for object types
- Use `type` for unions
- Explicit return types on functions
- Semantic HTML elements
- Proper ARIA labels for accessibility

## Accessibility Requirements

- Dropdown must have proper label
- Use semantic `<select>` element
- Keyboard navigable
- Screen reader friendly

## Testing

Include unit tests that verify:
- Filtering works for each status
- "All" option shows all tasks
- Empty state displays when no tasks match
- Filter resets properly

Please implement this following all the guidelines referenced above.
```

---

## Key Elements of a Structured Prompt

### 1. Clear Requirements Section

Separate functional and non-functional requirements:

```
## Requirements

**Functional Requirements:**
- [What the feature should do]

**Non-Functional Requirements:**
- [How it should be built]
```

### 2. Explicit References to Documentation

Point the agent to your docs:

```
- Follow coding standards in docs/coding-guidelines.md
- Reference API contracts in docs/api-contracts.md
- Use patterns from docs/ui-guidelines.md
```

### 3. Interface Definitions

Provide exact type definitions:

```typescript
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  // ...
}
```

### 4. Constraints and Guardrails

Be explicit about what NOT to do:

```
**Architecture Constraints:**
- Don't put business logic in components
- Don't use inline styles
- Don't skip error handling
```

### 5. Expected Behavior

Describe the user experience:

```
1. User sees dropdown above task list
2. Selecting "In Progress" shows only in-progress tasks
3. Selecting "All" shows all tasks
```

### 6. Code Style Requirements

Reference specific patterns:

```
**Code Style:**
- Use arrow functions
- Prefix handlers with `handle`
- Use useMemo for expensive operations
```

---

## What to Include

✅ **Functional requirements** - What should it do?
✅ **Architecture constraints** - How should it be structured?
✅ **Code style preferences** - What patterns to follow?
✅ **Interface definitions** - What types to use?
✅ **Edge cases** - What scenarios to handle?
✅ **Testing expectations** - What tests to write?
✅ **Documentation references** - Where to find more context?
✅ **Accessibility requirements** - What a11y standards to meet?

---

## What NOT to Include

❌ **Implementation details** - Let the agent decide how (within constraints)
❌ **Exact code snippets** - Don't write the code for the agent
❌ **Step-by-step instructions** - This isn't Method C (incremental)
❌ **Over-specification** - Leave some room for reasonable decisions

---

## Variations to Try

### Variation 1: Maximum Context

Include **everything**:
- Full type definitions
- Exact error messages
- Specific component structure
- Test cases spelled out

### Variation 2: Moderate Context

Include:
- Requirements
- Architecture constraints
- Doc references
- Let agent decide specifics

### Variation 3: Context + Constraints

Focus on:
- What NOT to do (antipatterns to avoid)
- Must-follow rules
- High-level requirements

Pick one variation and be consistent with it.

---

## Follow-Up Prompts

Even with structured prompts, you might need follow-ups:

**If the agent misses something:**
```
I don't see tests for the edge case where no tasks match the filter. Please add that test case.
```

**If it violates a guideline:**
```
This doesn't follow the coding guideline about using arrow functions for components. Please refactor to use arrow functions as specified in docs/coding-guidelines.md.
```

**If something is unclear:**
```
Can you explain why you put the filtering logic directly in the component instead of extracting it? The architecture document suggests keeping business logic separate.
```

Keep follow-ups specific and reference the original context.

---

## What to Observe

### Guideline Adherence
- Did the agent follow the coding guidelines?
- Did it reference the documentation you pointed to?
- Did it respect the architecture constraints?

### Completeness
- Are all requirements implemented?
- Are edge cases handled?
- Are tests included?
- Is accessibility considered?

### Quality
- Is the code well-structured?
- Are types correct and complete?
- Is error handling appropriate?
- Is it maintainable?

### Consistency
- Does it match existing patterns?
- Is naming consistent?
- Does it fit the overall architecture?

### Hallucinations
- Did it invent APIs or patterns not mentioned?
- Did it ignore specified constraints?
- Did it add features not requested?

---

## Common Outcomes

Based on testing with various agents:

### Positive Outcomes
- ✅ Higher quality code than Method A
- ✅ Better adherence to guidelines
- ✅ More complete edge case handling
- ✅ Often includes tests without being asked
- ✅ More consistent with existing patterns

### Potential Issues
- ⚠️ May still miss some guidelines (which ones?)
- ⚠️ Could add unnecessary complexity
- ⚠️ Might over-interpret requirements
- ⚠️ Could ignore some constraints in favor of others

### Questions to Answer
- Did more context reduce hallucinations?
- Was the code actually better than Method A?
- Which guidelines were followed? Which ignored?
- Did it save time overall, or did the upfront prompt take too long?

---

## Recording Your Results

Create: `transcripts/method-b-transcript.md`

```markdown
# Method B: Structured Prompt - Transcript

## Initial Structured Prompt
[Timestamp: 2025-01-15 11:00]

[Your complete structured prompt - paste the full thing]

## Agent Response 1
[Complete response]

## Follow-up Prompts
[Any follow-ups needed]

---

## Summary

**Initial prompt length**: X lines
**Time to craft prompt**: X minutes
**Total prompts needed**: X
**Time to completion**: X minutes
**Working code?**: Yes/No
**Tests included?**: Yes/No
**Guidelines followed**: X out of Y

## Comparison to Method A

**Better than Method A:**
- [List improvements]

**Worse than Method A:**
- [List regressions]

**Same as Method A:**
- [List similarities]

## Key Observations

[What worked, what didn't, what surprised you]
```

---

## After Completing Method B

1. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add task filtering (Method B - structured prompt)"
   ```

2. **Compare to Method A**
   ```bash
   git diff exercise-01-method-a exercise-01-method-b
   ```

3. **Test thoroughly**
   - Verify all requirements met
   - Check guideline adherence
   - Test edge cases

4. **Document observations**

5. **Prepare for Method C**
   ```bash
   git checkout exercise-01-prompting
   ```

---

## Tips for Success

1. **Craft the prompt carefully** - Spend time making it clear and complete
2. **Reference docs explicitly** - Don't assume the agent has read them
3. **Be specific about types** - Provide exact TypeScript interfaces
4. **Include examples** - Show what "good" looks like when possible
5. **List constraints** - Be clear about what NOT to do
6. **Request tests explicitly** - If you want them, say so upfront

---

## Reflection Questions for Method B

1. Did the structured context reduce the number of follow-up prompts needed?
2. Was the output quality noticeably better than Method A?
3. Which parts of the context did the agent use? Which did it ignore?
4. Did the agent hallucinate less with more context?
5. Was the time investment in crafting the prompt worth it?
6. Would you use this approach for real work? Why or why not?

---

**Remember**: The goal is to see if comprehensive upfront context produces better results than minimal prompting. Take notes on what worked and what didn't!
