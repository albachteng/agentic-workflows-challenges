# Workflow B: Linked Documentation

## Approach

**Reference external documentation explicitly** instead of copying guidelines inline.

Direct the agent to read specific documentation files before implementing.

The goal is to evaluate whether agents effectively use linked documentation to maintain consistency.

---

## Example Prompt

```
I need you to implement inline task editing functionality.

## Before implementing, please read these documentation files:

1. **docs/coding-guidelines.md** - For coding standards and conventions
2. **docs/ui-guidelines.md** - For React patterns and accessibility requirements
3. **docs/api-contracts.md** - For the PATCH /tasks/:id endpoint specification
4. **docs/testing-strategy.md** - For testing philosophy and practices

## Feature Requirements

Users should be able to:
- Click on a task title to enter edit mode
- Edit the title inline
- Save changes by pressing Enter or clicking outside the edit field
- Cancel changes by pressing Escape
- See validation errors for invalid input (empty or > 200 characters)

## Implementation Expectations

- Follow all coding standards from docs/coding-guidelines.md
- Implement accessibility per docs/ui-guidelines.md (ARIA labels, keyboard navigation, semantic HTML)
- Match the API contract exactly as specified in docs/api-contracts.md
- Write comprehensive tests following docs/testing-strategy.md (TDD approach, AAA pattern, edge cases)

## Edge Cases to Handle

- Empty title after trimming
- Title > 200 characters
- Network errors during save
- User clicks outside while editing (should save)
- User presses Escape (should cancel)

Please review the documentation files first, then implement this feature following all the guidelines they contain.
```

---

## Key Differences from Workflow A

### Workflow A (Inline)
```
Use arrow functions: `export const Component = () => {}`
Prefix handlers with `handle`: `handleEdit`, `handleSave`
Use interface for objects, type for unions
[...15 more guidelines...]
```

### Workflow B (Linked)
```
Follow all coding standards from docs/coding-guidelines.md
```

**Much more concise!** But does it work?

---

## What to Observe

### Critical Question: Do Agents Actually Read the Docs?

Test this by checking if the agent:

- ✅ References specific sections from the docs in responses
- ✅ Follows conventions it could only know from reading the docs
- ✅ Quotes or paraphrases doc content
- ❌ Ignores the docs and uses default patterns
- ❌ Acknowledges the docs but doesn't apply them
- ❌ Makes up guidelines not in the docs

---

## Verification Strategies

### Strategy 1: Ask the Agent to Confirm

```
Before implementing, please summarize the key coding conventions from docs/coding-guidelines.md that will apply to this feature.
```

This forces the agent to actually read and process the doc.

### Strategy 2: Check for Doc-Specific Patterns

Look for patterns that are only in the docs:
- Specific naming conventions (handle* prefix)
- Specific TypeScript patterns (interface vs type rules)
- Specific test structures (AAA pattern with descriptive names)

If these appear, the agent likely read the docs.

### Strategy 3: Ask About Specific Guidelines

```
I notice you used a regular function instead of an arrow function. What does docs/coding-guidelines.md say about component functions?
```

Can the agent cite the specific guideline?

---

## Follow-Up Prompts

When the agent misses something from the docs:

**Gentle reminder:**
```
I don't see ARIA labels on the interactive elements. Please review the accessibility section of docs/ui-guidelines.md and update accordingly.
```

**Specific reference:**
```
Per docs/testing-strategy.md, tests should use the Arrange-Act-Assert pattern. Please restructure the tests to follow this pattern.
```

**Direct question:**
```
Does this implementation follow the event handler naming convention from docs/coding-guidelines.md?
```

---

## Advantages of Workflow B

✅ **Concise prompts** - Much shorter than Workflow A
✅ **Single source of truth** - Docs are the canonical reference
✅ **Maintainable** - Update docs once, applies to all future work
✅ **Scalable** - Easy to add new guidelines to docs
✅ **Team-friendly** - Entire team can reference same docs

---

## Disadvantages of Workflow B

⚠️ **Agent may not actually read docs** - Just acknowledges them
⚠️ **Requires verification** - Must check that docs were applied
⚠️ **May need reinforcement** - Agent might drift and need reminders
⚠️ **Doc quality matters** - Poorly written docs won't help
⚠️ **Context window** - Agent must load and process doc content

---

## Advanced Techniques

### Technique 1: Pre-Prompt Documentation Review

```
Please read and summarize the following documentation files:
- docs/coding-guidelines.md
- docs/ui-guidelines.md
- docs/testing-strategy.md

After summarizing each, I'll give you the implementation task.
```

Then in next prompt:
```
Good summaries. Now implement inline task editing following all the guidelines you just reviewed.
```

### Technique 2: Specific Section References

Instead of:
```
Follow docs/coding-guidelines.md
```

Try:
```
Follow the React component patterns in docs/coding-guidelines.md, specifically:
- Component structure (lines 45-67)
- Hooks usage (lines 89-112)
- Event handler naming (lines 125-135)
```

### Technique 3: Test Comprehension First

```
What TypeScript conventions does docs/coding-guidelines.md recommend for this task?
```

Wait for agent to answer, verify comprehension, then:
```
Good. Now implement using those conventions.
```

---

## What to Track

### Documentation Reference Metrics

For each doc file:

| Document | Explicitly Referenced? | Guidelines Applied | Guidelines Missed |
|----------|----------------------|-------------------|------------------|
| coding-guidelines.md | Yes/No | /10 | List |
| ui-guidelines.md | Yes/No | /8 | List |
| api-contracts.md | Yes/No | /5 | List |
| testing-strategy.md | Yes/No | /7 | List |

### Agent Behavior Patterns

- Did the agent quote specific sections?
- Did it reference doc names in its explanation?
- Did it apply obscure guidelines that prove it read the docs?
- Did it ask clarifying questions about the docs?

---

## Common Outcomes

### Best Case
✅ Agent reads docs
✅ Applies guidelines correctly
✅ References docs in responses
✅ Asks clarifying questions when docs are ambiguous
✅ Results in high-quality, consistent code

### Typical Case
⚠️ Agent acknowledges docs
⚠️ Applies some guidelines
⚠️ Misses others (which ones? patterns?)
⚠️ Needs reminders to re-check docs
⚠️ Better than Workflow A but not perfect

### Worst Case
❌ Agent ignores docs
❌ Uses default patterns instead
❌ Only superficially acknowledges doc references
❌ No better than not mentioning docs at all
❌ Effectively the same as minimal prompting

---

## Example Conversation

### High-Quality Agent Behavior

```
You: "Implement inline task editing. Follow all guidelines in docs/coding-guidelines.md, docs/ui-guidelines.md, and docs/api-contracts.md."

Agent: "I've reviewed the documentation. Based on:
- docs/coding-guidelines.md: I'll use arrow functions, prefix handlers with 'handle', and use interface for the EditState type
- docs/ui-guidelines.md: I'll ensure proper ARIA labels and keyboard navigation
- docs/api-contracts.md: I'll send PATCH requests matching the specified format

Here's the implementation:
[Code that actually follows the guidelines...]"

You: "Great! Now add tests per docs/testing-strategy.md"

Agent: "Following the TDD approach and AAA pattern from testing-strategy.md:
[Comprehensive tests...]"
```

### Poor Agent Behavior

```
You: "Implement inline task editing. Follow all guidelines in docs/coding-guidelines.md, docs/ui-guidelines.md, and docs/api-contracts.md."

Agent: "Sure! I'll implement inline task editing.
[Code that doesn't follow the guidelines...]"

You: "This doesn't follow the coding guidelines. Did you read docs/coding-guidelines.md?"

Agent: "You're right, let me update it.
[Code still doesn't fully follow guidelines...]"

You: "Specifically, event handlers should be prefixed with 'handle' per docs/coding-guidelines.md"

Agent: "Ah, I see. Let me fix that.
[Finally uses handle* prefix but still missing other patterns...]"
```

---

## Recording Results

In `transcripts/workflow-b-transcript.md`:

```markdown
# Workflow B: Linked Documentation - Transcript

## Initial Prompt with Doc References
[Timestamp]
[Full prompt referencing specific docs]

## Agent Response
[Implementation + any explicit doc references in response]

## Documentation Compliance Audit

**docs/coding-guidelines.md:**
- Referenced by agent? Yes/No
- Guidelines applied: 8/10
- Missed: [List]

**docs/ui-guidelines.md:**
- Referenced by agent? Yes/No
- Guidelines applied: 7/8
- Missed: [List]

**docs/api-contracts.md:**
- Referenced by agent? Yes/No
- Guidelines applied: 5/5
- Missed: None

**docs/testing-strategy.md:**
- Referenced by agent? Yes/No
- Guidelines applied: 5/7
- Missed: [List]

## Evidence Agent Read Docs

**Explicit references:**
- "Following the AAA pattern from testing-strategy.md..."
- "Per coding-guidelines.md, using arrow functions..."

**Implicit evidence:**
- Used handle* prefix (only in coding-guidelines)
- Included specific ARIA labels mentioned in ui-guidelines
- Matched exact API format from api-contracts

**Lack of evidence:**
- Didn't mention docs in response
- Used patterns not in docs
- Missed guidelines that were clearly stated

---

## Comparison to Workflow A

**Prompt length:**
- Workflow A: 50 lines
- Workflow B: 15 lines

**Compliance:**
- Workflow A: 12/15 guidelines (80%)
- Workflow B: 25/30 guidelines (83%)

**Effort:**
- Workflow A: High prompt crafting effort
- Workflow B: Low prompt effort, but verification needed

**Sustainability:**
- Workflow A: Not scalable
- Workflow B: Scalable if agent uses docs

---

## Key Observations

**Did linked docs work?**
[Yes/No/Partially - explain]

**Which docs were most effective?**
[List and explain why]

**Which docs were ignored?**
[List and hypothesize why]

**Would you use this workflow in production?**
[Yes/No - reasoning]
```

---

## Tips for Workflow B

1. **Be explicit about which docs** - Don't just say "read the docs"
2. **Verify comprehension** - Ask agent to summarize before implementing
3. **Reference docs in follow-ups** - "Per docs/X, this should be Y"
4. **Track what gets applied** - Take notes on compliance patterns
5. **Update docs based on gaps** - If something is missed repeatedly, improve the doc

---

## After Completing Workflow B

1. **Calculate compliance rate** - Did the agent follow the docs?
2. **Compare to Workflow A** - Was it better? Easier? More consistent?
3. **Identify doc effectiveness** - Which docs worked best?
4. **Prepare for Workflow C** - Which guidelines might work better as persistent rules?

---

**Remember**: The key question is whether **explicitly linking to documentation** actually improves agent behavior compared to inline guidelines. Be honest about whether the agent read and applied the docs, or just acknowledged them!

Document what you observe - this is valuable learning regardless of the outcome.
