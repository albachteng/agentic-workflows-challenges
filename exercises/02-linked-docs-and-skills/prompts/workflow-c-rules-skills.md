# Workflow C: Rules and Skills Integration

## Approach

Use your agent's **persistent context features** (rules files, skills, instructions) to provide ongoing guidance.

Set up the rules once, then use minimal prompts for each task.

The goal is to evaluate whether persistent context maintains consistency across multiple interactions.

---

## Setup by Agent Type

### Cursor

Create `.cursorrules` file in project root:

```
# Project Coding Standards

## TypeScript Conventions
- Always use arrow functions for React components
- Prefix event handlers with 'handle': handleEdit, handleSave
- Use `interface` for object types, `type` for unions
- No `any` types - use `unknown` if type is truly unknown
- Explicit return types on all functions

## React Patterns
- Keep components small and focused
- Extract complex logic into custom hooks
- Use useMemo for expensive computations
- Use useCallback for functions passed as props
- Early returns for loading/error states

## Accessibility
- Use semantic HTML elements
- Include ARIA labels on all interactive elements
- Ensure keyboard navigation (Enter, Escape, Tab)
- Form inputs must have associated labels

## Testing
- Write tests using Vitest and React Testing Library
- Follow Arrange-Act-Assert pattern
- Use descriptive test names: "should [behavior] when [condition]"
- Test edge cases: empty arrays, null values, errors
- Prefer unit tests over integration tests

## API Integration
- Follow API contracts in docs/api-contracts.md
- Handle errors gracefully with user-friendly messages
- Show loading states during async operations
- Use proper HTTP methods and status codes

## Documentation References
For complete details, refer to:
- docs/coding-guidelines.md
- docs/ui-guidelines.md
- docs/testing-strategy.md
- docs/api-contracts.md
```

### Claude Code / Claude API

Create `.claude/skills/` directory with individual skill files:

**`.claude/skills/coding-standards.md`:**
```markdown
# Coding Standards Skill

When writing TypeScript code for this project:

## Component Structure
- Use arrow functions: `export const Component = () => {}`
- Prefix handlers with 'handle'
- Keep components focused and single-purpose

## TypeScript
- `interface` for objects
- `type` for unions
- Explicit return types
- No `any` types

## Testing
- Vitest + React Testing Library
- AAA pattern (Arrange-Act-Assert)
- Descriptive names
- Edge case coverage

Always reference docs/ folder for complete guidelines.
```

### GitHub Copilot

Create `.github/copilot-instructions.md`:

```markdown
# Copilot Instructions for This Project

## Code Style
- Arrow functions for components
- handle* prefix for event handlers
- Interface for objects, type for unions
- Explicit types, no any

## React Best Practices
- useMemo for expensive computations
- useCallback for passed functions
- Custom hooks for complex logic
- Semantic HTML + ARIA labels

## Testing Requirements
- Write Vitest tests for all features
- AAA pattern
- Cover edge cases
- Descriptive test names

See docs/ folder for detailed guidelines.
```

### Aider

Create `.aider.conf.yml`:

```yaml
# Aider configuration

conventions:
  - "Use arrow functions for React components"
  - "Prefix event handlers with 'handle'"
  - "Use interface for objects, type for unions"
  - "Include ARIA labels for accessibility"
  - "Write Vitest tests using AAA pattern"
  - "Follow docs/coding-guidelines.md"

read-docs:
  - "docs/coding-guidelines.md"
  - "docs/ui-guidelines.md"
  - "docs/testing-strategy.md"
```

---

## Example Minimal Prompt (After Rules Setup)

With rules/skills configured, your prompt can be very simple:

```
Implement inline task editing.

Users should be able to:
- Click task title to edit
- Save with Enter or clicking outside
- Cancel with Escape
- See validation errors

API: PATCH /tasks/:id with { title: string }
Validation: Title required, max 200 chars
```

That's it! The rules should provide all the coding standards, accessibility requirements, testing expectations, etc.

---

## What Makes Good Rules/Skills?

### ✅ Good Rules

**Concise but complete:**
```
- Use arrow functions for components
- Prefix handlers with 'handle'
- Include ARIA labels on interactive elements
```

**Principle-based:**
```
- Favor composition over complexity
- Test behavior, not implementation
- Fail fast with clear error messages
```

**Actionable:**
```
- Use useMemo for filtering/sorting arrays
- Use useCallback for functions passed as props
- Extract logic >10 lines into custom hooks
```

### ❌ Poor Rules

**Too vague:**
```
- Write good code
- Follow best practices
- Make it accessible
```

**Too prescriptive:**
```
- The TaskEdit component must have exactly these props: task, onSave, onCancel, isLoading...
- Always put state at line 10...
```

**Too long:**
```
[Copies entire coding-guidelines.md into rules file - thousands of lines]
```

---

## What to Observe

### Persistence Across Prompts

Do rules persist across the conversation?

**Test this:**

1. **First prompt**: Implement feature A
   - Does agent follow rules?

2. **Second prompt** (later in conversation): Implement feature B
   - Does agent still follow rules without re-stating them?

3. **Third prompt** (even later): Refactor feature A
   - Are rules still being applied?

### Rule Compliance

Which rules get followed consistently?

Track compliance for each rule:

| Rule | Prompt 1 | Prompt 2 | Prompt 3 | Avg |
|------|----------|----------|----------|-----|
| Arrow functions | ✓ | ✓ | ✓ | 100% |
| handle* prefix | ✓ | ✓ | ✗ | 67% |
| ARIA labels | ✗ | ✓ | ✓ | 67% |
| Tests included | ✓ | ✗ | ✗ | 33% |

### Rule Effectiveness

Which types of rules work best?

- **Syntax rules** (arrow functions, naming) - Usually high compliance
- **Testing rules** (write tests) - Often ignored unless reinforced
- **Architecture rules** (separation of concerns) - Mixed results
- **Accessibility rules** (ARIA labels) - Frequently forgotten

---

## Follow-Up Prompts

Even with rules, you may need to reinforce:

**Gentle reminder:**
```
Remember to include tests per our testing conventions.
```

**Reference the rule:**
```
This should use arrow function syntax per our conventions.
```

**Check understanding:**
```
What do our conventions say about event handler naming?
```

---

## Advantages of Workflow C

✅ **Very short prompts** - Shortest of all three workflows
✅ **Persistent context** - Rules apply across entire session/project
✅ **Consistent** - Same standards applied everywhere automatically
✅ **Scalable** - Set once, benefit everywhere
✅ **Team-friendly** - Entire team shares same rules
✅ **Low prompt overhead** - Don't repeat guidelines each time

---

## Disadvantages of Workflow C

⚠️ **Setup required** - Must create and maintain rules file
⚠️ **Agent-specific** - Different syntax for different tools
⚠️ **May be forgotten** - Agent might drift and forget rules
⚠️ **Hard to debug** - Unclear which rules are actually being applied
⚠️ **Can conflict** - Rules might contradict each other or be ambiguous
⚠️ **Rules file maintenance** - Need to keep rules updated and relevant

---

## Testing Rule Effectiveness

### Experiment 1: Minimal Prompts

After setting up rules, try increasingly minimal prompts:

**Prompt 1** (explicit):
```
Implement task editing following our conventions, including tests and accessibility.
```

**Prompt 2** (implicit):
```
Implement task editing.
```

**Prompt 3** (bare minimum):
```
Add task editing.
```

Which level of explicitness is needed for the agent to apply the rules?

### Experiment 2: Multiple Features

Implement 2-3 small features in sequence without re-stating rules:

1. Task editing
2. Task deletion
3. Task sorting

Do the rules persist across all three? Does quality degrade over time?

### Experiment 3: Rule Modification

Start with initial rules, then add a new rule mid-session:

```
Add to rules: "Always include loading spinners for async operations"
```

Does the agent pick up the new rule? Or only use original rules?

---

## Common Outcomes

### Best Case Scenario
✅ Rules are followed consistently
✅ Very short prompts work perfectly
✅ Quality stays high across multiple interactions
✅ No need to repeat guidelines
✅ Massive time savings

### Typical Scenario
⚠️ Most rules followed most of the time
⚠️ Some rules need occasional reinforcement
⚠️ Syntax/style rules: high compliance
⚠️ Testing/doc rules: need reminders
⚠️ Overall improvement over no rules

### Worst Case Scenario
❌ Rules are ignored or forgotten
❌ No better than Workflow A or B
❌ Setup time wasted
❌ Creates false sense of security
❌ Still need to be very explicit in prompts

---

## Recording Results

In `transcripts/workflow-c-transcript.md`:

```markdown
# Workflow C: Rules and Skills - Transcript

## Rules File Setup
[Timestamp of setup]

**Rules file location:** `.cursorrules` (or equivalent)

**Rules included:**
1. Arrow functions for components
2. handle* prefix for handlers
3. interface vs type conventions
4. ARIA labels required
5. Tests required (AAA pattern)
6. [etc - list all rules]

Total rules: 15

---

## Prompt 1: Task Editing Feature
[Timestamp]

**Prompt:**
```
Implement inline task editing.

Users should be able to click title to edit, save with Enter, cancel with Escape.
API: PATCH /tasks/:id
Validation: required, max 200 chars
```

**Agent Response:**
[Implementation]

**Rule Compliance:**
- Arrow functions: ✓
- handle* prefix: ✓
- ARIA labels: ✗ (missing)
- Tests included: ✓
- AAA pattern: ✓
...

Rules followed: 12/15 (80%)

---

## Prompt 2: Fix Missing ARIA Labels
[Timestamp]

**Prompt:**
```
Add proper ARIA labels to the edit functionality.
```

**Agent Response:**
[Updated code]

**Observation:**
Agent should have included ARIA labels from the start per rules.
Needed explicit reminder.

---

## Prompt 3: Task Deletion Feature
[Later in conversation]

**Prompt:**
```
Add task deletion with confirmation.
```

**Agent Response:**
[Implementation]

**Rule Compliance:**
Rules followed: 13/15 (87%)

**Observation:**
Compliance improved. Testing still needs reinforcement.

---

## Rules Persistence Analysis

| Session Point | Rules Followed | Notes |
|---------------|----------------|-------|
| Initial setup | 12/15 (80%) | Missed ARIA, edge case tests |
| After reminder | 14/15 (93%) | Much better |
| New feature (30 min later) | 13/15 (87%) | Still good, minor drift |
| Refactoring (1 hr later) | 11/15 (73%) | Some degradation |

**Conclusion:**
Rules provide good baseline but need occasional reinforcement.
Quality degrades slightly over long conversations.

---

## Comparison to Workflows A & B

**Prompt efficiency:**
- Workflow A: 50 lines average per prompt
- Workflow B: 15 lines average per prompt
- Workflow C: 5 lines average per prompt ✓ Winner

**Compliance:**
- Workflow A: 80% (12/15 guidelines)
- Workflow B: 83% (25/30 guidelines)
- Workflow C: 80% (12/15 rules) - Similar to A

**Setup time:**
- Workflow A: 0 minutes (but high per-prompt time)
- Workflow B: 0 minutes (docs already exist)
- Workflow C: 20 minutes to create rules file

**Sustainability:**
- Workflow A: Low - too repetitive
- Workflow B: High - if agent uses docs
- Workflow C: High - if rules persist

---

## Key Observations

**What worked well:**
- Very short prompts
- Syntax and style rules highly effective
- Good baseline consistency

**What didn't work:**
- Testing rules often ignored
- Accessibility rules need reinforcement
- Quality degrades in very long sessions

**Surprising findings:**
- [Your observations]

**Would I use this in production?**
[Yes/No - detailed reasoning]

**Best use case for rules/skills:**
[When would this workflow be ideal?]
```

---

## Tips for Workflow C

1. **Start with core rules** - Don't overload rules file initially
2. **Test early** - Verify rules are being applied before building features
3. **Iterate** - Add/remove rules based on what works
4. **Be specific** - Vague rules won't help
5. **Reference docs** - Point rules to detailed docs for more context
6. **Track compliance** - Keep metrics on which rules work
7. **Refresh when needed** - Remind agent of rules if drift occurs

---

## Rule File Evolution

You might start with:

**Version 1** (minimal):
```
- Arrow functions
- handle* naming
- Include tests
```

Then expand based on what's missing:

**Version 2** (after issues found):
```
- Arrow functions for components
- handle* prefix for event handlers
- Include Vitest tests using AAA pattern
- Add ARIA labels to interactive elements
- Use useMemo for filtering arrays
```

**Version 3** (refined):
```
[Same as V2, plus:]
- Show loading states during async operations
- Validate input at component boundaries
- Extract components >50 lines into smaller pieces
```

Track which additions improve compliance.

---

## After Completing Workflow C

1. **Calculate ROI** - Was setup time worth the benefit?
2. **Measure persistence** - Did rules last the whole session?
3. **Compare compliance** - Better/worse than A and B?
4. **Identify optimal rules** - Which rules had highest compliance?
5. **Complete reflection** - Which workflow wins overall?

---

## Reflection Questions for Workflow C

1. Did rules persist across the entire session?
2. Which rules were followed most consistently?
3. Which rules were ignored most often?
4. Was setup time worth the saved prompt time?
5. Did short prompts work as well as you hoped?
6. Would you use this for a real project?
7. How would you improve your rules file?
8. What's the ideal level of detail for rules?

---

**Remember**: Rules and skills are about **persistent, automatic** context. The key question is whether they actually work consistently, or if you still need to be explicit in every prompt.

Be honest about what works and what's just theoretical benefit!

Good luck!
