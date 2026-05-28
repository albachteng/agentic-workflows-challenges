# Exercise 4: MCP Integration

## Learning Objectives

By completing this exercise, you will:

- Understand how agents interact with external tools via MCP (Model Context Protocol)
- Integrate at least one MCP server with your agent environment
- Evaluate agent behavior when given access to external systems
- Identify security concerns and permission boundaries
- (Stretch goal) Build a simple custom MCP server
- Assess which workflows improve most with tool access

---

## What is MCP?

**Model Context Protocol (MCP)** is a standard for connecting AI agents to external tools and data sources.

MCP servers provide tools that agents can invoke:
- **Filesystem** - Read, write, search files
- **GitHub** - Create issues, PRs, review code
- **Browser** - Fetch web pages, screenshots
- **Database** - Query Postgres, SQLite
- **Shell** - Execute terminal commands
- **Custom** - Build your own tools

**This exercise**: Integrate MCP to give your agent new capabilities.

---

## The Challenge

**Goal**: Use MCP to enhance your workflow for a specific task.

### Required: Basic MCP Usage

Choose **ONE** MCP server to integrate and use it to accomplish a task:

**Option 1: Filesystem MCP**
- Task: Have agent analyze and document test coverage gaps
- Agent should: Read test files, identify untested code, create report

**Option 2: GitHub MCP**
- Task: Have agent review recent commits and create improvement issues
- Agent should: Fetch commits, analyze changes, create GitHub issues

**Option 3: Shell/Terminal MCP**
- Task: Have agent run tests, analyze failures, suggest fixes
- Agent should: Execute test commands, parse output, propose solutions

**Option 4: Browser MCP**
- Task: Have agent research best practices for a feature
- Agent should: Fetch documentation, summarize findings, apply to code

**Option 5: Database MCP** (if you add persistence)
- Task: Have agent analyze task patterns and generate insights
- Agent should: Query database, aggregate data, create report

### Stretch Goal: Custom MCP Server

Build a simple custom MCP server that exposes task statistics:

**Example tools to implement**:
- `getTaskStats` - Returns task counts by status/priority
- `getCompletionRate` - Calculates completion percentage
- `getAverageAge` - Average age of incomplete tasks
- `generateSummary` - Creates task summary report

Then have your agent use these custom tools.

---

## Git Workflow Setup

```bash
# Create branch for this exercise
git checkout main
git checkout -b exercise-04-mcp-integration

# Make commits as you integrate and test MCP
git commit -m "feat: integrate [MCP server name]"
git commit -m "feat: use MCP to [accomplish task]"
```

---

## Safety Considerations

### Before Giving Agents Tool Access

1. **Understand what the tool can do**
   - Read the MCP server documentation
   - Test tools manually first
   - Know what permissions are granted

2. **Start with read-only tools**
   - Filesystem: Read-only first, write later
   - GitHub: Read issues/PRs before creating them
   - Database: SELECT queries before UPDATE/DELETE

3. **Limit scope**
   - Filesystem: Limit to project directory, not entire system
   - GitHub: Limit to a test repository first
   - Shell: Consider which commands are safe

4. **Monitor usage**
   - Review what tools the agent calls
   - Check parameters passed to tools
   - Verify results before trusting them

### Red Flags

Watch for concerning agent behavior:

🚩 Agent tries to access files outside project directory
🚩 Agent attempts to delete or modify files without asking
🚩 Agent makes API calls to external services without permission
🚩 Agent tries to execute potentially dangerous shell commands
🚩 Agent doesn't validate inputs before using tools
🚩 Agent ignores error responses from tools

**If you see these**: Stop, analyze why, and adjust permissions or prompting.

---

## Setup Instructions

### For Claude Code

Claude Code has built-in MCP support.

**Example: Filesystem MCP**

1. Create `.claude/mcp_servers.json`:

**macOS/Linux:**
```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
  }
}
```

**Windows (PowerShell):**
```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:/Users/YourName/projects/my-project"]
  }
}
```

Note: On Windows, you can use either:
- Forward slashes: `C:/Users/YourName/projects/my-project`
- Backslashes (escaped): `C:\\Users\\YourName\\projects\\my-project`
- The `${workspaceFolder}` variable (recommended - works on all platforms)

2. Restart Claude Code

3. Agent now has filesystem tools available

### For Cursor

Cursor supports MCP via extensions.

**Check Cursor documentation** for latest MCP setup instructions.

### For Other Tools

See `prompts/basic-mcp-usage.md` for setup guides for various agent environments.

---

## What to Look For

### Agent Tool Usage

- **Discovery**: Does the agent know what tools are available?
- **Appropriateness**: Does it use tools correctly for the task?
- **Errors**: How does it handle tool failures?
- **Efficiency**: Does it minimize unnecessary tool calls?

### Security and Permissions

- **Scope**: Does the agent stay within allowed operations?
- **Validation**: Does it validate inputs before using tools?
- **Sensitive data**: How does it handle credentials, secrets?
- **Destructive actions**: Would you trust it with write/delete permissions?

### Workflow Improvements

- **Value added**: What can agent do with tools that it couldn't before?
- **Accuracy**: Are tool-based answers more accurate?
- **Autonomy**: Can agent complete tasks without human intervention?
- **Bottlenecks**: Where does tool access reveal limitations?

### Tool Design (for Custom MCP)

- **API design**: Are tool interfaces clear and usable?
- **Error handling**: How are errors communicated?
- **Documentation**: Can agent understand tool docs?
- **Usefulness**: Do tools solve real problems?

---

## Deliverables

### Required

1. **MCP Integration Documentation**
   - Which MCP server you integrated
   - Setup steps you followed
   - Configuration files
   - Any challenges encountered

2. **Task Transcript**
   - Full conversation where agent uses MCP tools
   - Highlight where tools were invoked
   - Note any tool errors or misuse

3. **Analysis**
   - What tools did the agent use?
   - How effectively were tools used?
   - What improved with tool access?
   - Security concerns identified

4. **Reflection** - Fill out `reflection-template.md`

### Stretch Goal

5. **Custom MCP Server Code**
   - Source code for your custom MCP server
   - README explaining what tools it provides
   - Example usage with agent

---

## Example Tasks by MCP Type

### Filesystem MCP

**Tasks**:
- Analyze codebase structure and create architecture diagram
- Find all TODOs/FIXMEs and create GitHub issues
- Identify files missing tests
- Generate documentation from code comments
- Search for potential security issues (hardcoded secrets, SQL injection)

### GitHub MCP

**Tasks**:
- Create issues for each TODO in code
- Review recent PRs and summarize changes
- Analyze issue velocity and create report
- Auto-label issues based on content
- Generate release notes from commits

### Shell/Terminal MCP

**Tasks**:
- Run tests and analyze failures
- Check code coverage and identify gaps
- Run linter and auto-fix issues
- Build project and diagnose errors
- Run performance benchmarks

### Browser MCP

**Tasks**:
- Research API documentation for a library
- Find examples of a pattern/technique
- Check if an NPM package is actively maintained
- Fetch changelog for dependency update
- Look up error messages and find solutions

---

## Reflection Questions

After completing this exercise:

1. **How did tool access change agent capabilities?**

2. **What tasks became possible with MCP that weren't before?**

3. **How accurately did the agent use tools?**

4. **Where did the agent misuse or misunderstand tools?**

5. **What security concerns arose?**

6. **Would you trust this agent with write/delete permissions?**

7. **Which workflows improved most with tool access?**

8. **Which workflows didn't benefit from tools?**

9. **If you built a custom MCP server, was it worth the effort?**

10. **What tools would you want next?**

---

## Common Pitfalls

### Pitfall: Over-Trusting Tool Output

**Wrong**: Accept all tool results as truth

**Right**: Verify tool output, especially for critical operations

### Pitfall: Too Many Permissions

**Wrong**: Give agent full filesystem and shell access immediately

**Right**: Start restrictive, expand permissions gradually

### Pitfall: Not Handling Tool Errors

**Wrong**: Ignore when tools fail or return errors

**Right**: Prompt agent to handle errors gracefully

### Pitfall: Unclear Tool Boundaries

**Wrong**: Let agent decide what tools to use without guidance

**Right**: Explicitly direct agent to use specific tools for specific tasks

---

## Advanced Experiments

### Experiment 1: Tool Discovery

Don't tell the agent what tools are available. Can it discover and use them appropriately?

### Experiment 2: Tool Misuse

Give the agent a tool and see if it uses it inappropriately. Does it respect boundaries?

### Experiment 3: Tool Combination

Give agent multiple tools (filesystem + GitHub). Can it combine them effectively?

### Experiment 4: Error Recovery

Introduce tool failures. How does the agent handle errors and retry?

---

## Next Steps

After completing this exercise:

1. Fill out `reflection-template.md`
2. Document security concerns and boundaries
3. Share insights on tool effectiveness
4. Move on to Exercise 5: Agentic TDD

---

## Resources

### MCP Server Registry

Find existing MCP servers:
- https://github.com/modelcontextprotocol/servers

Popular servers:
- **@modelcontextprotocol/server-filesystem** - File operations
- **@modelcontextprotocol/server-github** - GitHub API
- **@modelcontextprotocol/server-postgres** - PostgreSQL queries
- **@modelcontextprotocol/server-brave-search** - Web search
- **@modelcontextprotocol/server-puppeteer** - Browser automation

### Building Custom MCP Servers

Documentation:
- MCP specification: https://modelcontextprotocol.io
- SDK: `@modelcontextprotocol/sdk`
- Examples in `prompts/custom-mcp-server.md`

---

## Tips for Success

### Before Starting

1. **Read MCP documentation** - Understand the protocol
2. **Test tools manually** - Know what they do
3. **Start simple** - One tool, one task
4. **Plan safety boundaries** - What's allowed, what's not

### During Integration

1. **Follow setup docs carefully** - MCP config can be finicky
2. **Verify tools are available** - Test before complex tasks
3. **Monitor tool calls** - Watch what the agent does
4. **Document issues** - Setup problems, tool errors, agent misuse

### After Integration

1. **Review tool usage** - Was it appropriate?
2. **Test edge cases** - What happens when tools fail?
3. **Consider security** - Would you expand permissions?
4. **Identify improvements** - What tools are missing?

---

**Remember**: MCP gives agents powerful capabilities. The goal is to understand when tool access helps, what boundaries are needed, and whether agents can use tools responsibly.

Be honest about security concerns - they're valuable learning points!

Good luck!
