# Exercise 3: Multi-Agent Workflow

## Learning Objectives

By completing this exercise, you will:

- Explore agent specialization and coordination patterns
- Compare sequential vs parallel multi-agent workflows
- Identify coordination failures and conflicting assumptions
- Understand context handoff challenges between agents
- Evaluate when multi-agent orchestration is worth the overhead
- Practice managing multiple concurrent workstreams

---

## The Challenge

**Goal**: Add task priority sorting, optimistic UI updates, and task deletion functionality.

This is a **larger feature set** designed to benefit from agent specialization.

### Features to Implement

1. **Priority Sorting**
   - Sort tasks by priority (high → medium → low)
   - Toggle between priority sort and creation date sort
   - Persist sort preference

2. **Optimistic UI Updates**
   - Show changes immediately when user acts
   - Revert if API call fails
   - Show visual feedback during server sync

3. **Task Deletion**
   - Delete button on each task
   - Confirmation dialog before deletion
   - Remove from UI optimistically
   - Handle deletion failures

---

## Git Workflow Setup

**Before you begin**:

```bash
# Create a branch for this exercise
git checkout main
git checkout -b exercise-03-multi-agent

# You'll create sub-branches for each workflow
```

**For each workflow**:

```bash
# Sequential workflow
git checkout exercise-03-multi-agent
git checkout -b exercise-03-sequential

# Work through the workflow
git commit -m "feat: implement features (sequential multi-agent)"

# Parallel workflow
git checkout exercise-03-multi-agent
git checkout -b exercise-03-parallel

# Work through the workflow
git commit -m "feat: implement features (parallel multi-agent)"
```

---

## The Two Workflows

You will implement the same features **twice** using different multi-agent coordination strategies.

### Option A: Sequential Workflow

Agents work **one after another**, each building on the previous agent's work.

**See**: `prompts/sequential-workflow.md`

**Typical flow**:
1. **Agent 1 (Architect)** - Plans the architecture
2. **Agent 2 (Implementer)** - Writes the code
3. **Agent 3 (Tester)** - Writes comprehensive tests
4. **Agent 4 (Reviewer)** - Reviews and refactors

### Option B: Parallel Workflow

Multiple agents work **simultaneously** on different aspects.

**See**: `prompts/parallel-workflow.md`

**Typical flow**:
- **Agent A (Frontend)** - Implements UI components
- **Agent B (Backend)** - Implements API endpoints
- **Agent C (Testing)** - Writes tests for both
- **Agent D (Documentation)** - Updates docs and comments

Then **you** integrate their work.

---

## Important Rules

1. **Actually use multiple agents** - Different chat sessions, different tools, or different models
2. **Document handoffs** - Save what you tell each agent
3. **Track conflicts** - Note where agents disagree or duplicate work
4. **Preserve evidence** - Save all transcripts from all agents
5. **Integrate carefully** - When combining parallel work, note integration challenges
6. **Test the result** - Ensure everything works together

---

## What to Look For

### Coordination Challenges

- Did agents make conflicting assumptions?
- Was there duplicated effort?
- Did later agents undo earlier agents' work?
- How much manual integration was required?

### Context Handoff

- Did the second agent understand the first agent's work?
- Was context lost between agents?
- Did you need to re-explain requirements to each agent?
- How did agents handle incomplete information from previous agents?

### Specialization Benefits

- Did specialized agents produce higher quality work?
- Were there clear expertise differences?
- Did specialization save time or add overhead?
- Which specializations were most valuable?

### Conflict Resolution

- Where did agents disagree on architecture?
- Which agent's approach was better?
- How did you resolve conflicts?
- Could conflicts have been prevented?

---

## Evaluation Criteria

| Dimension | Sequential | Parallel |
|-----------|------------|----------|
| **Total time** | | |
| **Quality of final code** | | |
| **Number of conflicts** | | |
| **Manual integration effort** | | |
| **Context preservation** | | |
| **Duplicated work** | | |
| **Bugs introduced** | | |
| **Would use again?** | Y/N | Y/N |

---

## Deliverables

For each workflow:

1. **Transcripts from ALL agents**
   - `transcripts/sequential-agent1-architect.md`
   - `transcripts/sequential-agent2-implementer.md`
   - `transcripts/sequential-agent3-tester.md`
   - `transcripts/sequential-agent4-reviewer.md`
   - (Or parallel equivalents)

2. **Handoff documentation**
   - What you told each agent
   - What context you passed between agents
   - What was lost or gained in translation

3. **Conflict log**
   - Where agents disagreed
   - How conflicts were resolved
   - What you learned

4. **Final working code** - Committed to respective branches

5. **Observations** - Fill out `reflection-template.md`

---

## Tips for Success

### Before Starting

- **Define clear boundaries** - What is each agent responsible for?
- **Plan handoffs** - What does the next agent need to know?
- **Establish contracts** - What interface/API will agents agree on?

### During Sequential Workflow

- **Give each agent context** - Don't assume they know what came before
- **Review before handoff** - Verify work before passing to next agent
- **Document decisions** - Future agents need to know "why"
- **Allow course corrections** - Later agents can suggest improvements

### During Parallel Workflow

- **Define clear interfaces** - Frontend/backend contract must be agreed upfront
- **Share type definitions** - All agents should use same types
- **Coordinate early** - Don't let agents drift too far apart
- **Plan integration** - Know how you'll combine the work

### After Each Workflow

- **Run the app** - Does everything actually work together?
- **Review the diffs** - What did each agent contribute?
- **Identify waste** - Where was effort duplicated?
- **Note surprises** - What went differently than expected?

---

## Common Pitfalls

### Pitfall: Insufficient Context Handoff

**Wrong**: "Here's the code from Agent 1. Continue."

**Right**: "Agent 1 created this architecture for priority sorting. Key decisions:
- Used a `sortPreference` state for user's choice
- Created `useSortedTasks` custom hook
- Decided on client-side sorting (not API-based)

Please implement the UI based on this architecture."

### Pitfall: No Clear Boundaries

**Wrong**: Let agents overlap in responsibilities

**Right**: "Agent A: UI components only, no API calls. Agent B: API endpoints only, no UI."

### Pitfall: Not Documenting Conflicts

**Wrong**: Silently pick one agent's approach

**Right**: "Agent A suggested client-side sorting. Agent B suggested server-side sorting. I chose client-side because [reason]. This is a learning point for coordination."

### Pitfall: Treating Agents as Infallible

**Wrong**: Blindly integrate all agent output

**Right**: Review each agent's work, test it, and verify it matches the overall plan

---

## Reflection Questions

After completing both workflows:

1. **Which workflow was more efficient?** Time to completion vs quality of result

2. **Where did coordination fail?** Specific examples of conflicts or misunderstandings

3. **Did specialization help?** Or could one agent have done it all better?

4. **What orchestration overhead was required?** How much time spent managing agents vs doing work?

5. **How did context transfer work?** What was lost between agents?

6. **Which tasks parallelized well?** Which required tight coordination?

7. **Would you use multi-agent in production?** For what types of tasks?

8. **What surprised you about agent coordination?**

9. **How would you improve the workflow?** What would you change?

10. **Human role in multi-agent?** What did you do that agents couldn't?

---

## Multi-Agent Tools and Techniques

### Using Different Agent Tools

**Example Setup**:
- **Agent 1**: Claude Code (good at architecture)
- **Agent 2**: Cursor (good at implementation)
- **Agent 3**: GitHub Copilot (good at tests)
- **Agent 4**: Aider (good at refactoring)

### Using Same Tool, Different Sessions

- Open 4 separate chat windows
- Name each session: "Architect", "Implementer", "Tester", "Reviewer"
- Keep transcripts separate

### Using Different Models

- Agent 1: Claude Opus (complex planning)
- Agent 2: Claude Sonnet (balanced implementation)
- Agent 3: GPT-4 (alternative perspective)
- Agent 4: Claude Sonnet (review)

Compare: Do different models produce different quality?

---

## Advanced Experiments

### Experiment 1: Agent Disagreement

Deliberately ask two agents for architectural opinions on the same problem. Compare their approaches. Which is better? Why did they disagree?

### Experiment 2: Context Degradation

Sequential workflow with 4 agents. How much context is lost by Agent 4? Can Agent 4 still understand Agent 1's decisions?

### Experiment 3: Redundancy

Have two agents implement the same feature independently (without knowing about each other). Compare results. Which is better? How do they differ?

### Experiment 4: Consensus

Ask 3 agents to review the same code. Where do they agree on issues? Where do they disagree? How do you decide what to fix?

---

## Next Steps

After completing this exercise:

1. Fill out `reflection-template.md`
2. Compare the two workflow approaches
3. Share insights on coordination challenges
4. Move on to Exercise 4: MCP Integration

---

## Additional Resources

- `docs/architecture.md` - System architecture (all agents should understand this)
- `docs/coding-guidelines.md` - Standards (all agents should follow)
- `docs/ui-guidelines.md` - Frontend patterns
- `docs/api-contracts.md` - API specifications
- `docs/testing-strategy.md` - Testing approach

---

## Pro Tips

### For Sequential Workflow

1. **Start with architecture** - Don't let first agent write code, just plan
2. **Review at each step** - Verify before moving to next agent
3. **Pass context explicitly** - Don't assume agents read previous transcripts
4. **Allow iteration** - Later agents can suggest improvements to earlier work

### For Parallel Workflow

1. **Design interfaces first** - All agents must agree on contracts
2. **Use shared types** - Create TypeScript types that all agents use
3. **Synchronize periodically** - Check in on all agents, ensure alignment
4. **Plan integration time** - Budget time to combine and test all work

### For Both

1. **Document everything** - Transcripts, handoffs, conflicts, decisions
2. **Test incrementally** - Don't wait until the end to verify anything works
3. **Stay objective** - Note what worked AND what failed
4. **Learn from conflicts** - Agent disagreements reveal assumptions

---

**Remember**: The goal isn't to perfectly orchestrate multiple agents (that's hard even for experienced engineers). The goal is to **learn** where multi-agent coordination helps, where it hurts, and what skills become critical when orchestrating multiple AI collaborators.

Good luck!
