# Exercise 2: Linked Documents and Skills

## Learning Objectives

By completing this exercise, you will:

- Evaluate the effectiveness of linked documentation vs inline prompts
- Compare rules/skills files with explicit prompt guidance
- Understand when persistent context (rules/skills) improves consistency
- Identify which types of guidance agents follow vs ignore
- Assess scalability of different documentation approaches

---

## The Challenge

**Goal**: Implement task editing support in the task widget.

Users should be able to:
- Click on a task title to edit it inline
- Save changes with Enter or clicking outside the field
- Cancel changes with Escape
- See validation errors if the title is invalid

---

## Git Workflow Setup

**Before you begin**:

```bash
# Create a branch for this exercise
git checkout main
git checkout -b exercise-02-linked-docs

# You'll create sub-branches for each workflow
```

**For each workflow (A, B, C)**:

```bash
# Create a new branch from exercise-02-linked-docs
git checkout exercise-02-linked-docs
git checkout -b exercise-02-workflow-a

# Work with your agent
git commit -m "feat: implement task editing (workflow A - prompt only)"

# Return to exercise branch for next workflow
git checkout exercise-02-linked-docs
git checkout -b exercise-02-workflow-b

# Repeat for Workflow C
```

---

## The Three Workflows

You will implement the same feature **three times** using different context delivery mechanisms.

### Workflow A: Prompt-Only Guidance

Provide all context inline in your prompts. Don't reference external documentation files.

**See**: `prompts/workflow-a-prompt-only.md`

### Workflow B: Linked Documentation

Reference the documentation files explicitly. Direct the agent to read specific docs before implementing.

**See**: `prompts/workflow-b-linked-docs.md`

### Workflow C: Rules and Skills Integration

Use your agent's rules/skills features (Cursor rules, Claude skills, Copilot instructions, etc.) to provide persistent context.

**See**: `prompts/workflow-c-rules-skills.md`

---

## Important Rules

1. **Separate branches** - Use clean branches for each workflow
2. **Same feature** - Implement identical editing functionality in all three
3. **Track compliance** - Document whether the agent followed guidance
4. **Preserve evidence** - Save transcripts and note which docs were referenced
5. **Test thoroughly** - Verify functionality actually works
6. **Compare critically** - Which workflow produced the most consistent results?

---

## What to Look For

### Documentation Adherence

**Coding Guidelines** (docs/coding-guidelines.md):
- Did the agent follow naming conventions?
- Did it use the specified patterns?
- Did it respect type preferences (interface vs type)?

**Testing Strategy** (docs/testing-strategy.md):
- Did it write tests first (TDD)?
- Were tests comprehensive?
- Did it use the Arrange-Act-Assert pattern?

**UI Guidelines** (docs/ui-guidelines.md):
- Is the editing UI accessible?
- Does it use semantic HTML?
- Are ARIA labels present?
- Does it handle keyboard events (Enter, Escape)?

**API Contracts** (docs/api-contracts.md):
- Does the PATCH request match the spec?
- Is validation consistent with the contract?
- Are error responses formatted correctly?

### Consistency

- Was the code consistent across multiple interactions?
- Did the agent maintain adherence over time?
- Did later prompts cause the agent to deviate from earlier guidelines?

### Deviations

- Which guidelines were most often ignored?
- Did the agent explain why it deviated?
- Were deviations reasonable or arbitrary?

---

## Evaluation Criteria

| Dimension | Workflow A | Workflow B | Workflow C |
|-----------|------------|------------|------------|
| **Guidelines followed** | /10 | /10 | /10 |
| **Consistency over time** | | | |
| **Bugs introduced** | | | |
| **Tests included** | | | |
| **Accessibility** | | | |
| **Required corrections** | | | |
| **Setup time** | | | |
| **Long-term maintainability** | | | |

---

## Deliverables

For each workflow (A, B, C):

1. **Transcript** - All prompts and responses
   - `transcripts/workflow-a-transcript.md`
   - `transcripts/workflow-b-transcript.md`
   - `transcripts/workflow-c-transcript.md`

2. **Code** - Committed to respective branches
   - `exercise-02-workflow-a`
   - `exercise-02-workflow-b`
   - `exercise-02-workflow-c`

3. **Rules file** (for Workflow C only)
   - `.cursorrules`, `.claude/skills`, or equivalent
   - Include this file in your submission

4. **Observations** - Fill out `reflection-template.md`

---

## Documentation Files to Reference

You should explicitly work with these documentation files:

- **docs/coding-guidelines.md** - Coding standards and conventions
- **docs/testing-strategy.md** - Testing philosophy and TDD practices
- **docs/ui-guidelines.md** - React patterns and accessibility requirements
- **docs/api-contracts.md** - API specification for PATCH /tasks/:id
- **docs/architecture.md** - System architecture and known issues

---

## Tips for Success

### Before Starting

- **Read all docs thoroughly** - Understand what the agent should follow
- **Note specific rules** - Identify 3-5 key rules to track compliance
- **Prepare your environment** - For Workflow C, have your rules file ready

### During Each Workflow

**Workflow A**: Copy relevant guidelines into prompts manually
**Workflow B**: Explicitly tell the agent which docs to read
**Workflow C**: Set up rules once, then use minimal prompts

### After Each Workflow

- **Audit guideline adherence** - Check how many rules were followed
- **Compare code quality** - Which workflow produced better code?
- **Note effort required** - Which was easiest? Which scaled best?

---

## Common Pitfalls

### Pitfall: Incomplete Documentation References

**Wrong**: "Follow the coding guidelines"
**Right**: "Follow the coding guidelines in docs/coding-guidelines.md, specifically: arrow functions, handle* naming, and useMemo for filtering"

### Pitfall: Rules File Overload

**Wrong**: Copy entire documentation files into rules
**Right**: Extract key principles and patterns into concise rules

### Pitfall: Not Testing Compliance

**Wrong**: Assume the agent followed the docs
**Right**: Explicitly verify guideline adherence in the code

### Pitfall: Mixing Workflows

**Wrong**: Start with Workflow B, then switch to Workflow C mid-task
**Right**: Complete each workflow fully before starting the next

---

## Reflection Questions

After completing all three workflows:

1. **Which workflow produced the most consistent code?** Why?

2. **Did linked docs actually improve adherence?** Or did the agent ignore them?

3. **Which guidelines were most often violated?** Why?

4. **Did rules/skills persist across the conversation?** Or did the agent forget?

5. **Which workflow was easiest to maintain?** If you had to make changes later, which would be best?

6. **What types of guidance work best in rules files?** Principles? Specific patterns? Examples?

7. **Did any workflow reduce hallucinations?**

8. **Which workflow would you use for a real team project?** Why?

9. **What surprised you about agent behavior with different context mechanisms?**

10. **What's the right balance between inline context and persistent context?**

---

## Next Steps

After completing this exercise:

1. Fill out `reflection-template.md`
2. Compare the three code implementations side-by-side
3. Share insights with your cohort
4. Move on to Exercise 3: Multi-Agent Workflow

---

## Additional Resources

All documentation files referenced in this exercise are in the `docs/` folder:

- `docs/coding-guidelines.md`
- `docs/testing-strategy.md`
- `docs/ui-guidelines.md`
- `docs/api-contracts.md`
- `docs/architecture.md`

---

## Pro Tips

### For Workflow A (Prompt-Only)

Create a "cheat sheet" document where you copy-paste common guidelines into prompts. This simulates real-world usage where you don't have rules files.

### For Workflow B (Linked Docs)

Test whether agents actually *read* the linked docs or just acknowledge them. Ask the agent to quote specific sections to verify.

### For Workflow C (Rules/Skills)

Start with minimal rules and add more as needed. Track which rules get followed without reinforcement.

---

**Remember**: This exercise tests whether documentation *actually* helps agents maintain consistency, or if it's just security theater. Be honest about what works and what doesn't!

Good luck!
