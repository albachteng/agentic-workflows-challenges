# Workflow A: Prompt-Only Guidance

## Approach

Provide all context **inline** in your prompts. Do not reference external documentation files.

Copy relevant guidelines directly into your prompts when you need them.

The goal is to simulate working without linked documentation or rules files.

---

## Example Prompt

```
Implement inline task editing functionality.

## Feature Requirements

Users should be able to:
1. Click on a task title to enter edit mode
2. Edit the title inline
3. Save changes by pressing Enter or clicking outside
4. Cancel changes by pressing Escape
5. See validation errors for invalid input

## Implementation Guidelines

Follow these coding standards:

**Component Structure:**
- Use arrow function for components: `export const ComponentName = () => {}`
- Use TypeScript with explicit types for props and state
- Prefix event handlers with `handle`: `handleEdit`, `handleSave`, `handleCancel`

**State Management:**
- Use useState for edit mode and temporary title
- Use useCallback for event handlers to prevent unnecessary re-renders
- Keep state as local as possible

**TypeScript:**
- Use `interface` for object types
- Use `type` for unions like: `type TaskStatus = 'todo' | 'in-progress' | 'done'`
- Avoid `any` - use `unknown` if type is truly unknown
- Explicit return types on all functions

**Accessibility:**
- Use semantic HTML (`<input>`, `<button>`, not `<div onClick>`)
- Include ARIA labels: `aria-label="Edit task"` on edit button
- Make edit field keyboard accessible
- Handle Enter and Escape key events

**Error Handling:**
- Validate title is not empty (after trimming)
- Validate title is <= 200 characters
- Display error messages to users
- Don't silently fail

**API Integration:**
- PATCH request to /tasks/:id
- Send only changed fields: `{ title: newTitle }`
- Handle network errors gracefully
- Show loading state during save

**Edge Cases:**
- Handle empty title (show error, don't save)
- Handle network failure (show error, keep edit mode)
- Handle clicking outside while editing (save)
- Handle Escape key (cancel, restore original)

**Testing:**
- Write unit tests using Vitest
- Test edit mode activation
- Test save on Enter
- Test cancel on Escape
- Test validation errors
- Test API call with correct payload
- Use Arrange-Act-Assert pattern

Please implement this feature following all the guidelines above.
```

---

## Key Elements to Include Inline

### 1. Coding Conventions

Always include in your prompts:
- Component patterns (arrow functions)
- Naming conventions (handle*, use*, etc.)
- TypeScript preferences (interface vs type)

### 2. Technical Specifications

Include relevant specs:
- Task interface definition
- API endpoint details
- Validation rules
- Error handling requirements

### 3. Testing Requirements

Specify test expectations:
- What to test
- How to structure tests (AAA pattern)
- Edge cases to cover

### 4. Accessibility Requirements

Don't forget a11y:
- ARIA labels
- Keyboard navigation
- Semantic HTML

---

## Follow-Up Prompts

When the agent deviates from guidelines:

**If it uses the wrong pattern:**
```
This component uses a regular function instead of an arrow function. Per the coding standards I provided, components should use arrow functions: `export const ComponentName = () => {}`. Please update.
```

**If it skips tests:**
```
I don't see unit tests. Per the requirements, please write tests that cover:
- Edit mode activation
- Save on Enter
- Cancel on Escape
- Validation errors
Use the Arrange-Act-Assert pattern as specified.
```

**If it violates accessibility:**
```
The edit button doesn't have an ARIA label. Per the accessibility requirements, please add `aria-label="Edit task"` to the button.
```

---

## Advantages of Workflow A

✅ **Self-contained** - Everything in one place
✅ **Explicit** - Agent knows exactly what you want
✅ **Portable** - Works in any agent environment
✅ **Immediate** - No setup required

---

## Disadvantages of Workflow A

⚠️ **Repetitive** - Must include guidelines in every prompt
⚠️ **Verbose** - Prompts become very long
⚠️ **Inconsistent** - Easy to forget guidelines across sessions
⚠️ **Not scalable** - Harder to maintain as project grows
⚠️ **Context limits** - Long prompts use more context window

---

## What to Observe

### Guideline Adherence

Track which inline guidelines the agent follows:

**Coding Conventions:**
- ☐ Arrow functions
- ☐ Handle* naming
- ☐ TypeScript types
- ☐ Explicit return types

**Accessibility:**
- ☐ Semantic HTML
- ☐ ARIA labels
- ☐ Keyboard navigation

**Testing:**
- ☐ Tests included
- ☐ AAA pattern
- ☐ Edge cases

**Error Handling:**
- ☐ Validation
- ☐ Network errors
- ☐ User feedback

### Compliance Over Time

- Does the agent maintain adherence in follow-up prompts?
- Do you need to repeat guidelines later in the conversation?
- Does the agent drift from the original requirements?

### Effort Required

- How long does it take to craft comprehensive prompts?
- How much copy-pasting is involved?
- Is it sustainable for a larger project?

---

## Template for Inline Prompts

Use this structure for each inline prompt:

```
[Feature description]

## Requirements
[What it should do]

## Implementation Guidelines
[How to build it - coding standards]

## Technical Specifications
[Types, API endpoints, validation rules]

## Accessibility Requirements
[ARIA, keyboard, semantic HTML]

## Testing Requirements
[What tests to write, how to structure them]

## Edge Cases
[Scenarios to handle]
```

---

## Tips for Workflow A

1. **Create a template** - Save a prompt template with common guidelines
2. **Copy-paste efficiently** - Keep frequently-used guidelines in a scratch file
3. **Be specific** - Don't assume the agent remembers earlier context
4. **Verify each time** - Check that guidelines are followed in each response
5. **Reinforce when needed** - Restate guidelines if the agent drifts

---

## Example Follow-Up Conversation

```
You: [Initial comprehensive prompt with all guidelines]

Agent: [Implements feature]

You: "Good start. I see a few issues:
1. Component uses regular function, not arrow function
2. Missing ARIA label on edit button
3. No tests for validation errors

Please fix these per the guidelines in my original prompt."

Agent: [Updates implementation]

You: "Better. Now add loading state during save as specified in the API Integration section of my original requirements."

Agent: [Adds loading state]

You: "Perfect. This looks complete."
```

Notice: You must keep referencing "the guidelines I provided" or "per my requirements" since there's no persistent documentation.

---

## Recording Results

In `transcripts/workflow-a-transcript.md`:

```markdown
# Workflow A: Prompt-Only - Transcript

## Initial Comprehensive Prompt
[Timestamp]
[Full prompt with all inline guidelines]

## Agent Response
[Implementation]

## Compliance Check
Guidelines provided: 15
Guidelines followed: 12
Guidelines missed: 3

**Missed:**
- Missing tests for network errors
- No loading state during API call
- Edit button lacks ARIA label

## Follow-Up 1: Corrections
[Prompt pointing out missed guidelines]

## Agent Response 2
[Updated implementation]

[Continue...]

---

## Summary

**Total guidelines provided inline**: 15
**Average compliance per response**: 80%
**Prompts needed**: 4
**Time spent crafting prompts**: 15 minutes
**Time to completion**: 40 minutes

## Observations

**What worked:**
- Explicit guidelines prevented common mistakes
- Agent followed most conventions when clearly stated

**What didn't work:**
- Had to repeat guidelines in follow-ups
- Easy to forget to include all guidelines
- Very long prompts
- Still missed some edge cases despite explicit list

**Effort assessment:**
High upfront effort to craft comprehensive prompts
Medium ongoing effort to reinforce guidelines
```

---

## After Completing Workflow A

1. **Count compliance** - How many guidelines were followed?
2. **Identify patterns** - Which types of guidelines were most often missed?
3. **Assess effort** - Was it worth the verbosity?
4. **Prepare for Workflow B** - Which guidelines would be better in external docs?

---

**Remember**: Workflow A establishes the baseline for inline context. This shows you the effort required when you can't rely on external documentation or persistent rules.

Take detailed notes on what works and what doesn't - you'll compare this to Workflows B and C!
