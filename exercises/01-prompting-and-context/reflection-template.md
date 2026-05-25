# Exercise 1: Prompting and Context - Reflection

**Name**: _______________________
**Date**: _______________________
**Agent Used**: _______________________
**Model/Version**: _______________________

---

## Method A: Minimal Prompt

### Process Metrics

- **Total prompts used**: _______
- **Time to completion**: _______ minutes
- **Follow-up corrections needed**: _______

### Code Quality Assessment

**Working code?**: ☐ Yes ☐ No ☐ Partially

**Bugs found**:
-
-
-

**Guidelines followed** (from docs/coding-guidelines.md):
- ☐ Arrow functions for components
- ☐ Event handlers prefixed with `handle`
- ☐ Proper TypeScript types
- ☐ Semantic HTML
- ☐ Accessibility considerations
- ☐ Separation of concerns

**Edge cases handled**:
- ☐ Empty task list
- ☐ No matching tasks
- ☐ All tasks filtered out
- ☐ Loading states
- ☐ Error states

### Agent Behavior Observations

**What the agent did well**:


**Where the agent struggled**:


**Hallucinations or fabrications**:


**Unexpected decisions**:


### Overall Assessment

**Code quality (1-10)**: _______

**Would I use this in production?**: ☐ Yes ☐ No ☐ With modifications

**Notes**:


---

## Method B: Structured Prompt

### Process Metrics

- **Time crafting initial prompt**: _______ minutes
- **Total prompts used**: _______
- **Time to completion**: _______ minutes
- **Follow-up corrections needed**: _______

### Code Quality Assessment

**Working code?**: ☐ Yes ☐ No ☐ Partially

**Bugs found**:
-
-
-

**Guidelines followed**:
- ☐ Arrow functions for components
- ☐ Event handlers prefixed with `handle`
- ☐ Proper TypeScript types
- ☐ Semantic HTML
- ☐ Accessibility considerations
- ☐ Separation of concerns
- ☐ Used useMemo for filtering
- ☐ Proper ARIA labels
- ☐ Tests included

**Edge cases handled**:
- ☐ Empty task list
- ☐ No matching tasks
- ☐ All tasks filtered out
- ☐ Loading states
- ☐ Error states

### Context Effectiveness

**Documentation references the agent actually used**:
- ☐ docs/architecture.md
- ☐ docs/coding-guidelines.md
- ☐ docs/ui-guidelines.md
- ☐ docs/api-contracts.md

**Which parts of the structured prompt were most effective?**:


**Which parts did the agent ignore?**:


### Agent Behavior Observations

**What the agent did well**:


**Where the agent struggled**:


**Hallucinations or fabrications**:


**Improvements over Method A**:


**Regressions compared to Method A**:


### Overall Assessment

**Code quality (1-10)**: _______

**Was the structured prompt worth the extra effort?**: ☐ Yes ☐ No ☐ Unsure

**Would I use this in production?**: ☐ Yes ☐ No ☐ With modifications

**Notes**:


---

## Method C: Incremental Context

### Process Metrics

- **Total prompts used**: _______
- **Time to completion**: _______ minutes
- **Number of course corrections**: _______

**Time per phase**:
- Planning: _______ minutes
- Interface Design: _______ minutes
- State Management: _______ minutes
- Implementation: _______ minutes
- Testing: _______ minutes
- Review: _______ minutes

### Code Quality Assessment

**Working code?**: ☐ Yes ☐ No ☐ Partially

**Bugs found**:
-
-
-

**Guidelines followed**:
- ☐ Arrow functions for components
- ☐ Event handlers prefixed with `handle`
- ☐ Proper TypeScript types
- ☐ Semantic HTML
- ☐ Accessibility considerations
- ☐ Separation of concerns
- ☐ Used useMemo for filtering
- ☐ Proper ARIA labels
- ☐ Comprehensive tests
- ☐ Refactored based on review

**Edge cases handled**:
- ☐ Empty task list
- ☐ No matching tasks
- ☐ All tasks filtered out
- ☐ Loading states
- ☐ Error states

### Phase Effectiveness

**Which phase was most valuable?**:


**Which phase could have been skipped?**:


**Where did course corrections happen?**:


**Did the agent maintain context across phases?**: ☐ Yes ☐ No ☐ Mostly

### Agent Behavior Observations

**What the agent did well**:


**Where the agent struggled**:


**Hallucinations or fabrications**:


**Quality of planning phase**:


**Quality of review/refactoring suggestions**:


**Improvements over Methods A & B**:


**Disadvantages compared to Methods A & B**:


### Overall Assessment

**Code quality (1-10)**: _______

**Was the incremental approach worth the extra time?**: ☐ Yes ☐ No ☐ Unsure

**Would I use this in production?**: ☐ Yes ☐ No ☐ With modifications

**Notes**:


---

## Cross-Method Comparison

### Quantitative Comparison

| Metric | Method A | Method B | Method C |
|--------|----------|----------|----------|
| Total time (minutes) | | | |
| Number of prompts | | | |
| Code quality (1-10) | | | |
| Bugs found | | | |
| Guidelines followed | /6 | /9 | /10 |
| Tests included? | Y/N | Y/N | Y/N |
| Production ready? | Y/N | Y/N | Y/N |

### Qualitative Comparison

**Which method produced the best code?**:


**Why?**:


**Which method was most efficient (quality/time)?**:


**Why?**:


**Which method had the fewest regressions or bugs?**:


**Which method would you use for a real project?**:


**Why?**:


---

## Key Insights

### What Worked

**Across all methods, what consistently worked well?**:


**What strategies improved agent output quality?**:


**What reduced hallucinations?**:


### What Didn't Work

**What approaches failed or backfired?**:


**Where did all three methods struggle?**:


**What agent limitations did you discover?**:


### Surprises

**What surprised you most about agent behavior?**:


**What capabilities exceeded your expectations?**:


**What limitations were more severe than expected?**:


---

## Lessons Learned

### About Prompting

**What makes a good prompt?**:


**When is more context helpful? When is it harmful?**:


**How much guidance is too much?**:


### About Agents

**What are agents good at?**:


**What are agents bad at?**:


**Where do they need the most human oversight?**:


### About Your Workflow

**How would you change your approach next time?**:


**What would you do differently in a real project?**:


**What skills became more important when working with an agent?**:


---

## Reflection Questions

### 1. Did more context always help?

When did additional context improve results?


When did it seem to hurt or confuse the agent?


### 2. How did the agent handle edge cases?

Which edge cases were handled well?


Which were missed?


Did you have to explicitly request edge case handling?


### 3. Code quality and consistency

Did the agent maintain consistency with existing code?


Which coding guidelines were most often violated?


Did any method produce inconsistent code within itself?


### 4. Hallucinations and fabrications

What did the agent make up or invent?


Method A hallucinations:


Method B hallucinations:


Method C hallucinations:


Did more context reduce hallucinations?


### 5. Testing

Did any method include tests without being asked?


How comprehensive were the tests?


Did tests actually catch bugs?


Were tests valuable or just checking boxes?


### 6. Time and effort

Was the fastest method actually the best value?


Where did you spend the most time reviewing/correcting?


If you had to do this feature for real, which method would you use?


### 7. Agent capabilities

What surprised you about what the agent could do?


What couldn't the agent do that you expected it to?


Where was human expertise still essential?


### 8. Engineering discipline

Did working with an agent make you more or less disciplined?


What engineering skills became more important?
- Architecture?
- Testing?
- Code review?
- Requirement clarity?
- Other:


### 9. Future application

How will you prompt differently in future projects?


What did you learn about effective collaboration with agents?


What workflow changes will you make based on this exercise?


---

## Action Items

**Things to research or try next**:
-
-
-

**Skills to develop**:
-
-
-

**Workflow improvements to implement**:
-
-
-

---

## Additional Notes




---

**Completed**: _______________________
**Ready to share with cohort**: ☐ Yes ☐ No
