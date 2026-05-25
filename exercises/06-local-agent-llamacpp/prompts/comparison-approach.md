# Comparing Local vs Frontier Models

## The Experiment

Implement the **exact same feature** with both:
1. Local model (Qwen, DeepSeek, etc.)
2. Frontier model (Claude, GPT-4, etc.)

Then compare objectively.

---

## Task Selection

Choose a task that's:
- ✅ **Well-defined** - Clear requirements
- ✅ **Measurable** - Can compare quality objectively
- ✅ **Completable in 30-60 min** - Not too large
- ✅ **Representative** - Typical of real work

**Good tasks**:
- Add task filtering by priority
- Extract duplicate code into utility functions
- Write tests for existing feature
- Fix a specific bug
- Add form validation

**Avoid**:
- Vague requirements ("make it better")
- Highly creative tasks (harder to compare)
- Trivial tasks (won't show differences)

---

## Comparison Methodology

### Step 1: Local Model First

**Why first**: Don't let frontier model bias your approach

**Setup**:
```bash
git checkout main
git checkout -b exercise-06-local-model
```

**Track**:
- Start time
- Initial prompt
- Number of follow-ups
- Time to working code
- Bugs encountered
- Final quality

### Step 2: Frontier Model Second

**Fresh start**:
```bash
git checkout main
git checkout -b exercise-06-frontier-model
```

**Use identical initial prompt** - fair comparison

**Track same metrics**

### Step 3: Compare

```bash
git diff exercise-06-local-model exercise-06-frontier-model
```

**Analyze differences objectively**

---

## Metrics to Track

### Quantitative Metrics

| Metric | Local | Frontier | Notes |
|--------|-------|----------|-------|
| Latency (avg response) | ___s | ___s | |
| Total time to complete | ___m | ___m | |
| Prompts needed | ___ | ___ | |
| Bugs introduced | ___ | ___ | |
| Lines of code | ___ | ___ | |
| Test coverage | ___% | ___% | |
| Cost | $0 | $___ | |

### Qualitative Assessment

**Code Quality (1-10)**:
- Local: ___
- Frontier: ___

**Instruction Following (1-10)**:
- Local: ___
- Frontier: ___

**Edge Case Handling (1-10)**:
- Local: ___
- Frontier: ___

**Maintainability (1-10)**:
- Local: ___
- Frontier: ___

---

## Evaluation Framework

### Code Correctness

**Does it work?**
- ☐ Works perfectly
- ☐ Works with minor bugs
- ☐ Partially works
- ☐ Doesn't work

**Edge cases handled?**
- ☐ All edge cases
- ☐ Most edge cases
- ☐ Some edge cases
- ☐ No edge cases

### Code Quality

**Follows conventions?**
- ☐ Perfectly
- ☐ Mostly
- ☐ Partially
- ☐ Not at all

**Maintainable?**
- ☐ Very clean and clear
- ☐ Reasonably maintainable
- ☐ Could be better
- ☐ Hard to maintain

### Productivity

**Time to working code**:
- Local: ___ minutes
- Frontier: ___ minutes

**Iteration cycles**:
- Local: ___ rounds of corrections
- Frontier: ___ rounds of corrections

---

## Side-by-Side Example

### Task: Add Task Filtering by Priority

**Local Model (Qwen 7B)**:

Prompt: "Add filtering by priority to the task list"

Response time: 3.2s

```typescript
// Generated code
function filterByPriority(tasks, priority) {
  return tasks.filter(task => task.priority === priority);
}
```

Issues:
- No TypeScript types
- Missing edge case (null priority)
- No UI component

Follow-up needed: 3 prompts to add types, UI, edge cases

Total time: 25 minutes

---

**Frontier Model (Claude Sonnet)**:

Prompt: "Add filtering by priority to the task list"

Response time: 1.8s

```typescript
// Generated code
export const filterTasksByPriority = (
  tasks: Task[],
  priority: TaskPriority | null
): Task[] => {
  if (priority === null) return tasks;
  return tasks.filter(task => task.priority === priority);
};

// Also generated UI component, tests, and documentation
```

Issues:
- None significant

Follow-up needed: 0

Total time: 8 minutes

---

## Common Patterns

### What You'll Likely Find

**Local models often**:
- Need more guidance
- Miss edge cases
- Require more iterations
- Generate correct but simple code
- Struggle with complex context

**Frontier models often**:
- Understand context better
- Include edge cases proactively
- Generate more complete solutions
- Follow conventions better
- Handle complexity better

**But**:
- Local is FREE and PRIVATE
- Local is instant (no API latency)
- Local can be good enough for many tasks

---

## Fair Comparison Principles

### Do

✅ Use same initial prompt for both
✅ Track actual time spent (including waiting for responses)
✅ Allow same number of iterations (or note if one needs more)
✅ Compare final working code, not perfect first attempt
✅ Consider context: cost, privacy, speed all matter

### Don't

❌ Give frontier model better prompts
❌ Ignore local model's speed advantage
❌ Ignore frontier model's cost
❌ Compare different tasks
❌ Cherry-pick best/worst examples

---

## Decision Framework

After comparison, use this framework:

### When to Use Local Model

**Use local if**:
- Privacy is critical
- Cost is a constraint
- Task is well-defined and simple
- Speed (latency) matters
- You need many quick iterations

**Examples**:
- Code completion
- Simple refactoring
- Documentation generation
- Quick prototypes
- Sensitive code

### When to Use Frontier Model

**Use frontier if**:
- Quality is critical
- Task is complex
- Architecture decisions needed
- Production code
- Cost is acceptable

**Examples**:
- Complex features
- Critical systems
- Architecture planning
- Bug fixing in large codebase
- Code review

### Hybrid Approach

**Best of both worlds**:
1. Use local for initial draft/exploration
2. Use frontier for refinement/complex parts
3. Use local for iteration/tweaks
4. Use frontier for final review

---

## Recording Your Comparison

Create a comparison table:

```markdown
## Task: [Feature Name]

| Aspect | Local (Qwen 7B) | Frontier (Claude) | Winner |
|--------|----------------|------------------|--------|
| Initial response time | 3.2s | 1.8s | Frontier |
| Time to working code | 25min | 8min | Frontier |
| Prompts needed | 4 | 1 | Frontier |
| Code quality (1-10) | 6 | 9 | Frontier |
| Handles edge cases | Some | All | Frontier |
| Cost | $0 | $0.12 | Local |
| Privacy | Full | Limited | Local |
| Would ship to prod? | After review | Yes | Frontier |

## Verdict

Frontier model produced better code faster.

But for non-critical tasks, local model was acceptable and FREE.

For this type of task, I'd use: [Your choice and reasoning]
```

---

## Reflection Questions

After comparison:

1. **Was quality difference worth the cost?**

2. **For what percentage of your work would local be good enough?**

3. **What's your hybrid workflow?**

4. **Would you pay for frontier OR invest in better local hardware?**

5. **How important is privacy in your context?**

---

**Remember**: The goal isn't "which is better?" (frontier models are objectively more capable). The goal is "which is better **for this task** given **these constraints**?"

Be honest about trade-offs!
