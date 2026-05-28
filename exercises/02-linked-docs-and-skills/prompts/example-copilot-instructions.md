# Example GitHub Copilot Instructions

GitHub Copilot can read instructions from `.github/copilot-instructions.md` in your repository.

## File: `.github/copilot-instructions.md`

```markdown
# GitHub Copilot Instructions for Task Management App

## Project Context

This is a learning project for the Agentic Workflows Challenge. The starter app intentionally contains flaws that students will improve.

## Coding Standards

### TypeScript
- Use TypeScript strict mode
- Prefer `const` and arrow functions
- Always include explicit return types
- Use `interface` for objects, `type` for unions

### React Components
- Functional components only with hooks
- Export as: `export const ComponentName = () => {}`
- Event handlers: `handle` prefix (e.g., `handleClick`)
- Props: Explicit typing with interfaces

### File Naming
- Components: PascalCase (e.g., `TaskList.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Tests: Match source file + `.test.ts(x)`

## Project Documentation

Before generating code, reference these files:
- `docs/coding-guidelines.md` - Complete coding standards
- `docs/api-contracts.md` - API endpoint specifications
- `docs/testing-strategy.md` - Testing patterns
- `docs/ui-guidelines.md` - React and accessibility patterns
- `docs/architecture.md` - System design and intentional flaws

## Testing

Use Vitest and React Testing Library:
- Follow AAA pattern (Arrange, Act, Assert)
- Test user behavior, not implementation
- Use descriptive test names
- Mock external dependencies

Example:
```typescript
it('should create task when form is submitted', async () => {
  // Arrange
  const user = userEvent.setup();
  render(<TaskWidget />);

  // Act
  await user.type(screen.getByLabelText(/task title/i), 'New Task');
  await user.click(screen.getByRole('button', { name: /create/i }));

  // Assert
  await waitFor(() => {
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });
});
```

## API Patterns

All API functions follow this pattern:
```typescript
export const apiFunction = async (): Promise<ReturnType> => {
  const response = await fetch(`${API_BASE_URL}/endpoint`);
  if (!response.ok) {
    throw new Error('Error message');
  }
  return response.json();
};
```

## Do NOT Fix These Intentional Flaws

The app contains teaching flaws documented in `docs/architecture.md`:
- No memoization (unnecessary re-renders)
- Business logic in components
- No request debouncing
- Magic strings
- Duplicated validation
- Inconsistent error handling

Students will address these in exercises.

## Accessibility Requirements

All interactive elements need:
- Semantic HTML (`<button>`, not `<div onclick>`)
- ARIA labels: `aria-label="Action description"`
- Proper roles: `role="list"`, `role="alert"`
- Keyboard support

## API Contract

Follow these exact specifications:

**GET /tasks**
- Response: 200, `Task[]`

**POST /tasks**
- Request: `{ title: string, status?: TaskStatus, priority?: TaskPriority }`
- Response: 201, `Task`
- Errors: 400

**PATCH /tasks/:id**
- Request: Partial `Task` fields
- Response: 200, `Task`
- Errors: 400, 404

**DELETE /tasks/:id**
- Response: 204
- Errors: 404

## Style Preferences

- Single quotes for strings
- 2-space indentation
- Trailing commas in multi-line
- Arrow functions over function declarations
- Semicolons required

## Import Organization

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party libraries
import axios from 'axios';

// 3. Local components
import { TaskList } from './components/TaskList';

// 4. Utilities and types
import { formatDate } from './utils/formatDate';
import type { Task } from './types';
```

## Error Handling

```typescript
try {
  const result = await apiCall();
  // Success path
} catch (error) {
  // User-friendly error message
  setError('Unable to complete action. Please try again.');
  // Log for debugging
  console.error('API Error:', error);
}
```
```
