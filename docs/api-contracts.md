# API Contracts

This document defines the REST API contract between the frontend and backend.

When working with agents, reference this document to ensure API implementations match the specification.

---

## Base URL

Development: `http://localhost:3000`

---

## Common Types

### Task Object

```typescript
interface Task {
  id: string;                               // UUID v4
  title: string;                            // 1-200 characters
  status: 'todo' | 'in-progress' | 'done';  // required
  priority: 'low' | 'medium' | 'high';      // required
  createdAt: string;                        // ISO 8601 timestamp
  updatedAt: string;                        // ISO 8601 timestamp
}
```

### Error Response

```typescript
interface ErrorResponse {
  error: string;        // Human-readable error message
  code?: string;        // Optional error code for client handling
  details?: unknown;    // Optional additional error details
}
```

---

## Endpoints

### GET /tasks

Retrieve all tasks.

#### Request

```
GET /tasks
```

**Query Parameters**: None (filtering can be added in exercises)

#### Response

**Status**: 200 OK

**Body**:
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Complete project documentation",
    "status": "in-progress",
    "priority": "high",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T14:20:00.000Z"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "title": "Review pull requests",
    "status": "todo",
    "priority": "medium",
    "createdAt": "2025-01-15T09:00:00.000Z",
    "updatedAt": "2025-01-15T09:00:00.000Z"
  }
]
```

**Note**: Empty array `[]` if no tasks exist.

#### Error Responses

**Status**: 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

---

### POST /tasks

Create a new task.

#### Request

```
POST /tasks
Content-Type: application/json
```

**Body**:
```json
{
  "title": "Write unit tests",
  "status": "todo",
  "priority": "high"
}
```

**Required Fields**:
- `title` (string, 1-200 characters)

**Optional Fields**:
- `status` (defaults to `"todo"`)
- `priority` (defaults to `"medium"`)

#### Response

**Status**: 201 Created

**Body**:
```json
{
  "id": "323e4567-e89b-12d3-a456-426614174002",
  "title": "Write unit tests",
  "status": "todo",
  "priority": "high",
  "createdAt": "2025-01-15T15:00:00.000Z",
  "updatedAt": "2025-01-15T15:00:00.000Z"
}
```

#### Error Responses

**Status**: 400 Bad Request

Missing or invalid title:
```json
{
  "error": "Title is required and must be between 1 and 200 characters"
}
```

Invalid status:
```json
{
  "error": "Status must be one of: todo, in-progress, done"
}
```

Invalid priority:
```json
{
  "error": "Priority must be one of: low, medium, high"
}
```

**Status**: 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

---

### PATCH /tasks/:id

Update an existing task (partial update).

#### Request

```
PATCH /tasks/323e4567-e89b-12d3-a456-426614174002
Content-Type: application/json
```

**Body**:
```json
{
  "status": "in-progress"
}
```

**Updatable Fields**:
- `title` (string, 1-200 characters)
- `status` ('todo' | 'in-progress' | 'done')
- `priority` ('low' | 'medium' | 'high')

**Note**: Only include fields you want to update. Fields not included will remain unchanged.

#### Response

**Status**: 200 OK

**Body**:
```json
{
  "id": "323e4567-e89b-12d3-a456-426614174002",
  "title": "Write unit tests",
  "status": "in-progress",
  "priority": "high",
  "createdAt": "2025-01-15T15:00:00.000Z",
  "updatedAt": "2025-01-15T15:30:00.000Z"
}
```

**Note**: `updatedAt` is automatically set to current timestamp.

#### Error Responses

**Status**: 400 Bad Request

Invalid title:
```json
{
  "error": "Title must be between 1 and 200 characters"
}
```

Invalid status:
```json
{
  "error": "Status must be one of: todo, in-progress, done"
}
```

Invalid priority:
```json
{
  "error": "Priority must be one of: low, medium, high"
}
```

No valid fields provided:
```json
{
  "error": "No valid fields to update"
}
```

**Status**: 404 Not Found

```json
{
  "error": "Task not found"
}
```

**Status**: 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

---

### DELETE /tasks/:id

Delete a task.

#### Request

```
DELETE /tasks/323e4567-e89b-12d3-a456-426614174002
```

#### Response

**Status**: 204 No Content

**Body**: Empty

#### Error Responses

**Status**: 404 Not Found

```json
{
  "error": "Task not found"
}
```

**Status**: 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

---

## Validation Rules

### Title Validation

- **Required**: Yes (for POST)
- **Type**: string
- **Min Length**: 1 character
- **Max Length**: 200 characters
- **Trimming**: Leading/trailing whitespace should be trimmed
- **Empty strings**: Reject empty strings (after trimming)

### Status Validation

- **Required**: No (defaults to 'todo')
- **Allowed Values**: Exactly `"todo"`, `"in-progress"`, or `"done"`
- **Case Sensitive**: Yes
- **Type**: string

### Priority Validation

- **Required**: No (defaults to 'medium')
- **Allowed Values**: Exactly `"low"`, `"medium"`, or `"high"`
- **Case Sensitive**: Yes
- **Type**: string

### ID Validation

- **Format**: UUID v4
- **Example**: `"123e4567-e89b-12d3-a456-426614174000"`

---

## HTTP Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET or PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation errors, malformed JSON |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Unexpected server error |

---

## Request Headers

### Required

```
Content-Type: application/json
```

Required for POST and PATCH requests.

### Optional

```
Accept: application/json
```

---

## Response Headers

### Always Included

```
Content-Type: application/json
```

Exception: DELETE returns no body, so no Content-Type header.

---

## CORS

For local development, the backend should allow requests from:

```
http://localhost:5173
```

CORS headers:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Future Endpoints (Not Implemented)

These endpoints may be added during exercises:

### GET /tasks?status=:status

Filter tasks by status.

### GET /tasks?priority=:priority

Filter tasks by priority.

### GET /tasks/search?q=:query

Search tasks by title.

### POST /tasks/:id/undo

Undo last deletion (Exercise 5 - TDD).

---

## Example Usage with cURL

### Get all tasks

```bash
curl http://localhost:3000/tasks
```

### Create a task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New task",
    "status": "todo",
    "priority": "high"
  }'
```

### Update a task

```bash
curl -X PATCH http://localhost:3000/tasks/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "done"
  }'
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/tasks/123e4567-e89b-12d3-a456-426614174000
```

---

## Testing API Contracts

When implementing or modifying the API, ensure:

1. **All validation rules are tested** - Test both valid and invalid inputs
2. **Error responses match specification** - Check error message format
3. **Status codes are correct** - Use the exact codes specified
4. **Response shapes match** - All required fields present, no extra fields
5. **Timestamps are ISO 8601** - Use `.toISOString()` in JavaScript

---

## Notes for LLM Agents

When prompting agents to implement or modify the API:

1. **Reference this document explicitly** - "Implement according to docs/api-contracts.md"
2. **Specify which endpoint** - Be clear about which endpoint to work on
3. **Request validation tests first** - Use TDD approach (see Exercise 5)
4. **Check error handling** - Ensure all error cases are handled per spec
5. **Verify response format** - Agent responses should match examples exactly

---

**Remember**: This is a contract. Both frontend and backend must adhere to it precisely. Changes to the contract should be documented and communicated.
