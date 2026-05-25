# Exercise 1: Prompting and Context Management

## Learning Objectives

By completing this exercise, you will:

- Understand how prompt quality affects agent output
- Compare minimal vs structured vs incremental prompting strategies
- Observe how context quality impacts code consistency
- Identify where agents succeed and fail based on prompt design
- Practice critical evaluation of agent-generated code

---

## The Challenge

**Goal**: Implement task filtering functionality in the frontend widget.

Users should be able to filter tasks by status (todo, in-progress, done) using a dropdown or button group.

---

## Git Workflow Setup

**Before you begin**, create a clean working environment:

```bash
# Ensure you're on main with no uncommitted changes
git status

# Create a branch for this exercise
git checkout -b exercise-01-prompting

# You'll create sub-branches for each method
```

**For each method (A, B, C)**:

```bash
# Create a new branch from exercise-01-prompting
git checkout exercise-01-prompting
git checkout -b exercise-01-method-a

# Work with your agent on Method A
# Commit regularly
git add .
git commit -m "feat: implement filtering with minimal prompt"

# When done, return to the exercise branch
git checkout exercise-01-prompting

# Create branch for Method B
git checkout -b exercise-01-method-b

# Repeat for Method C
```

**Why this matters**: Branching allows you to compare different approaches side-by-side without losing work. You can checkout different branches to see how each method performed.

---

## The Three Methods

You will attempt the same task **three times** using different prompting approaches.

### Method A: Minimal Prompt

Use the absolute minimum guidance. Let the agent make all decisions.

**See**: `prompts/method-a-minimal.md` for example approach

### Method B: Structured Prompt

Provide comprehensive context including:
- Architecture constraints
- Coding standards
- Expected behavior
- API contracts

**See**: `prompts/method-b-structured.md` for example approach

### Method C: Incremental Context

Break the implementation into phases:
1. Planning
2. Interface design
3. State management
4. Implementation
5. Testing

**See**: `prompts/method-c-incremental.md` for example approach

---

## Important Rules

1. **Start fresh for each method** - Use separate branches, don't carry over context
2. **Same task for all methods** - Implement the exact same filtering feature
3. **Preserve transcripts** - Save all prompts and agent responses
4. **Document observations** - Note what worked, what failed, what surprised you
5. **Commit often** - Commit after each significant change to track progress
6. **Test the output** - Actually run the code, don't just read it

---

## What to Look For

As you work through each method, observe:

### Code Quality
- Does the code follow the coding guidelines in `docs/coding-guidelines.md`?
- Is the code consistent with existing patterns?
- Are there obvious bugs or antipatterns?

### Architecture
- Where did the agent put the filtering logic?
- Did it maintain separation of concerns?
- Did it introduce unnecessary complexity?

### Testing
- Did the agent write tests without being asked?
- If you asked for tests, were they comprehensive?
- Did tests cover edge cases?

### Hallucinations
- Did the agent invent APIs that don't exist?
- Did it reference documentation or libraries not in the project?
- Did it make assumptions that weren't stated?

### Follow-Through
- Did the agent complete the task or get stuck?
- How many follow-up prompts were needed?
- Were corrections necessary?

---

## Evaluation Criteria

Compare the three methods across these dimensions:

| Dimension | Method A | Method B | Method C |
|-----------|----------|----------|----------|
| **Time to complete** | | | |
| **Number of prompts** | | | |
| **Code quality** | | | |
| **Followed guidelines** | | | |
| **Introduced bugs** | | | |
| **Tests included** | | | |
| **Required corrections** | | | |
| **Architecture consistency** | | | |
| **Overall satisfaction** | | | |

---

## Deliverables

For each method (A, B, C), capture:

1. **Transcript** - Save all prompts and responses
   - Create a file: `transcripts/method-a-transcript.md`
   - Include timestamps and complete conversation

2. **Final code** - Committed to the respective branch
   - `exercise-01-method-a`
   - `exercise-01-method-b`
   - `exercise-01-method-c`

3. **Observations** - Fill out `reflection-template.md`

4. **Comparison** - Fill out the evaluation table above

---

## Tips for Success

### Before Starting

- Read `docs/architecture.md` to understand the intentional flaws
- Review `docs/coding-guidelines.md` to know what "good" looks like
- Check `docs/api-contracts.md` for the Task interface
- Look at the existing starter app code (if available)

### During the Exercise

- **Don't help the agent too much** - Let it fail so you can observe failure modes
- **Take notes immediately** - Don't trust your memory
- **Test frequently** - Run the code after each change
- **Watch for drift** - Does the agent maintain consistency across responses?

### After Each Method

- **Stash or commit changes** before starting the next method
- **Review the diff** - What actually changed?
- **Run the app** - Does it work?
- **Check the guidelines** - Did it follow conventions?

---

## Common Pitfalls

### Pitfall: Switching Methods Mid-Stream

**Wrong**: Start with Method A, then add more context (becoming Method B)

**Right**: Complete Method A fully, then start fresh with Method B on a new branch

### Pitfall: Leading the Agent

**Wrong**: "You probably want to use useState for this, right?"

**Right**: Let the agent decide the approach based on the method's constraints

### Pitfall: Skipping Testing

**Wrong**: Assume the code works because it looks reasonable

**Right**: Actually run the code and test edge cases

### Pitfall: Cherry-Picking Successes

**Wrong**: Only document what worked well

**Right**: Document failures, hallucinations, and surprises too

---

## Reflection Questions

After completing all three methods, consider:

1. **Which approach produced the best code?** Why?

2. **Which approach had the fewest bugs or regressions?**

3. **Did more context always help?** When did it hurt?

4. **Where did the agent hallucinate or make up APIs?**

5. **Did smaller, incremental tasks improve quality?**

6. **Which method would you use for a real project?** Why?

7. **What surprised you most about the agent's behavior?**

8. **Did the agent follow the coding guidelines?** Which method followed them best?

9. **What would you do differently next time?**

10. **What engineering skills became more important when working with the agent?**

---

## Next Steps

After completing this exercise:

1. Fill out the `reflection-template.md`
2. Review your transcripts and code
3. Commit all changes and push your branches
4. Prepare to share insights with your cohort
5. Move on to Exercise 2: Linked Documents and Skills

---

## Additional Resources

- `docs/architecture.md` - Understand the system and intentional flaws
- `docs/coding-guidelines.md` - Standards the agent should follow
- `docs/ui-guidelines.md` - React and accessibility patterns
- `docs/testing-strategy.md` - Testing philosophy and practices

---

**Remember**: The goal is not to produce perfect code. The goal is to **learn** how different prompting strategies affect agent behavior and output quality.

Good luck!
