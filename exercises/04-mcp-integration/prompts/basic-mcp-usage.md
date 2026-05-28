# Basic MCP Usage Guide

## Setup by Environment

### Claude Code

**1. Create MCP config**: `.claude/mcp_servers.json`

**macOS/Linux:**
```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"]
  }
}
```

**Windows (PowerShell):**
```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"]
  }
}
```

Note: On Windows, you can use either:
- Forward slashes: `C:/Users/YourName/projects/my-project`
- Backslashes (escaped): `C:\\Users\\YourName\\projects\\my-project`
- The `${workspaceFolder}` variable (recommended - works on all platforms)

**2. Restart Claude Code**

**3. Verify tools available**: Ask agent "What tools do you have access to?"

### Cursor (if MCP support available)

Check Cursor documentation for latest MCP integration steps.

### Using Filesystem MCP

**Example task**: Analyze test coverage

```
Using the filesystem tools you have access to:

1. Read all test files in the project
2. Read all source files
3. Identify which source files lack corresponding tests
4. Create a report of test coverage gaps

Save the report to test-coverage-report.md
```

### Using GitHub MCP

**Setup**: `.claude/mcp_servers.json`

**macOS/Linux:**
```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_TOKEN": "your_token_here"
    }
  }
}
```

**Windows (PowerShell):**
```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_TOKEN": "your_token_here"
    }
  }
}
```

Note: To install MCP servers on Windows:
1. Open PowerShell or Command Prompt
2. Ensure Node.js and npm are installed: `node --version`
3. The MCP servers will be installed automatically via `npx` when Claude Code starts
4. For manual installation: `npm install -g @modelcontextprotocol/server-github`

**Example task**: Create issues from TODOs

```
Using GitHub tools:

1. Use filesystem tools to find all TODO comments in the code
2. For each TODO, create a GitHub issue with:
   - Title: The TODO text
   - Body: File location and surrounding context
   - Label: "technical-debt"

Report what issues you created.
```

---

## Observing Tool Usage

**In transcripts**, tool usage appears as:

```
Agent: I'll use the read_file tool to examine that file.

[Tool Call: read_file]
Parameters: { "path": "src/components/TaskWidget.tsx" }

[Tool Result]
[File contents...]

Agent: Based on the file contents, I can see...
```

**Track**:
- Which tools were called
- What parameters were used
- Whether usage was appropriate
- How errors were handled

---

## Security Checklist

Before enabling an MCP server:

- ☐ Understand what operations it can perform
- ☐ Limit scope (filesystem: project folder only)
- ☐ Start read-only when possible
- ☐ Test tools manually first
- ☐ Monitor agent's tool usage
- ☐ Revoke access if misused

---

## Common Issues

**Tools not appearing**: Restart agent environment after config changes

**Permission errors**: Check MCP server has access to specified paths

**Tool failures**: Agent should handle errors gracefully - if it doesn't, that's a learning point

---

See `custom-mcp-server.md` for building your own MCP server (stretch goal).
