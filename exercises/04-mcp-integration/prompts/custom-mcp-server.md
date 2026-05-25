# Building a Custom MCP Server (Stretch Goal)

## Simple Task Stats MCP Server

Build an MCP server that provides task statistics tools.

### Setup

```bash
mkdir task-stats-mcp
cd task-stats-mcp
npm init -y
npm install @modelcontextprotocol/sdk
```

### Basic Server Structure

**`index.js`**:

```javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Your task data (could read from file, database, etc.)
let tasks = [];

const server = new Server(
  {
    name: 'task-stats-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool: Get task statistics
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'get_task_stats',
        description: 'Get statistics about tasks (counts by status/priority)',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_completion_rate',
        description: 'Calculate task completion percentage',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_task_stats') {
    // Calculate stats from tasks
    const stats = {
      total: tasks.length,
      byStatus: {
        todo: tasks.filter(t => t.status === 'todo').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        done: tasks.filter(t => t.status === 'done').length,
      },
      byPriority: {
        high: tasks.filter(t => t.priority === 'high').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        low: tasks.filter(t => t.priority === 'low').length,
      },
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(stats, null, 2),
        },
      ],
    };
  }

  if (name === 'get_completion_rate') {
    const completed = tasks.filter(t => t.status === 'done').length;
    const rate = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

    return {
      content: [
        {
          type: 'text',
          text: `Completion rate: ${rate.toFixed(1)}%`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Configure Claude Code to Use It

`.claude/mcp_servers.json`:

```json
{
  "task-stats": {
    "command": "node",
    "args": ["path/to/task-stats-mcp/index.js"]
  }
}
```

### Test with Agent

```
Using the task-stats tools:

1. Get current task statistics
2. Calculate completion rate
3. Generate a summary report of task health

Format the report in markdown.
```

---

## Extending the Server

Add more useful tools:

**`get_overdue_tasks`** - Find tasks older than X days
**`get_priority_distribution`** - Chart priority breakdown
**`generate_summary`** - Natural language task summary
**`get_trends`** - Compare stats over time (if you track history)

---

## Reflection

**Was it worth building?**:
- Did the custom tools provide value?
- Could you accomplish the same without them?
- Was the development time justified?

**Tool design lessons**:
- What made tools easy/hard for agent to use?
- How important was good documentation?
- What would you improve about the tool API?
