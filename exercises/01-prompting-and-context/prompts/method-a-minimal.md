# Method A: Minimal Prompt

## Approach

Give the agent **minimal guidance**. Let it make all architectural, implementation, and styling decisions on its own.

The goal is to observe the agent's default behavior with little to no context.

---

## Example Prompt

```
Add filtering to the task widget.
```

That's it. Nothing more.

---

## Variations You Might Try

If the agent asks clarifying questions, you can choose to:

**Option 1: Stay minimal**
```
Users should be able to filter tasks by status.
```

**Option 2: Provide only functional requirements**
```
Add a dropdown that lets users filter tasks by status (todo, in-progress, done).
Show all tasks by default.
```

---

## What NOT to Include

- ❌ Don't reference coding guidelines
- ❌ Don't mention architecture documents
- ❌ Don't specify implementation details
- ❌ Don't ask for tests
- ❌ Don't mention existing patterns
- ❌ Don't provide component structure

---

## What to Observe

### Decision-Making
- What implementation approach did the agent choose?
- Where did it put the filtering logic?
- What state management approach did it use?
- Did it create new components or modify existing ones?

### Code Quality
- Does the code have obvious bugs?
- Are there TypeScript errors?
- Is the code readable and maintainable?
- Are there performance issues?

### Assumptions
- What assumptions did the agent make about the UI?
- Did it assume anything about the data structure?
- Did it create a reasonable user experience?

### Completeness
- Did it handle edge cases (empty list, no matching tasks)?
- Did it include loading/error states?
- Did it write tests?

---

## Follow-Up Prompts

If the initial implementation has issues, try these minimal follow-ups:

**If there's a bug:**
```
This doesn't work when the task list is empty.
```

**If you want tests:**
```
Add tests.
```

**If you want it to reconsider:**
```
Is there a better way to do this?
```

Keep follow-ups brief and non-directive. Let the agent figure out the solutions.

---

## Tips for Method A

1. **Resist the urge to guide** - Even if you see the agent going down a suboptimal path, let it continue
2. **Document everything** - The agent's choices reveal its default patterns
3. **Note what it doesn't do** - Missing tests? Missing edge cases? That's valuable data
4. **Let it finish** - Don't interrupt with corrections until it says it's done

---

## Common Outcomes

Based on testing with various agents, you might see:

### Positive Outcomes
- ✅ Agent creates working basic filtering
- ✅ Agent uses reasonable React patterns
- ✅ Code is generally readable

### Common Issues
- ⚠️ Filtering logic mixed with UI component
- ⚠️ No tests unless explicitly requested
- ⚠️ Missing edge case handling
- ⚠️ Inconsistent with project conventions
- ⚠️ May not match existing component patterns

### Hallucinations to Watch For
- 🚨 Inventing utility functions that don't exist
- 🚨 Referencing libraries not in package.json
- 🚨 Assuming API endpoints that aren't documented
- 🚨 Creating TypeScript types that conflict with existing ones

---

## Recording Your Results

Create a file: `transcripts/method-a-transcript.md`

Include:

```markdown
# Method A: Minimal Prompt - Transcript

## Initial Prompt
[Timestamp: 2025-01-15 10:30]
[Your exact prompt]

## Agent Response 1
[Agent's complete response]

## Follow-up Prompt 1
[Timestamp: 2025-01-15 10:35]
[Your prompt]

## Agent Response 2
[Agent's response]

[Continue for all interactions...]

---

## Summary

**Total prompts**: X
**Time elapsed**: X minutes
**Working code?**: Yes/No
**Tests included?**: Yes/No
**Bugs found**: [List]
**Hallucinations**: [List]

## Key Observations

[Your notes on what worked, what didn't, what surprised you]
```

---

## After Completing Method A

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add task filtering (Method A - minimal prompt)"
   ```

2. **Test the implementation**
   - Run the app
   - Try filtering by each status
   - Test edge cases (empty list, all filtered out)

3. **Document issues** in the transcript

4. **Save the transcript** before moving to Method B

5. **Checkout the exercise branch** to start fresh with Method B
   ```bash
   git checkout exercise-01-prompting
   ```

---

**Remember**: The point of Method A is to establish a baseline. This shows you what the agent does with minimal guidance, which helps you appreciate the difference context makes in Methods B and C.
