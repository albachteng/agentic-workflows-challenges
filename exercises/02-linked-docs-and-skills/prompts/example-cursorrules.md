# Example .cursorrules File

Place this file in your project root as `.cursorrules` to provide persistent instructions to Cursor.

```
# Project: Task Management App
# Purpose: Coding guidelines for Agentic Workflows Challenge

## General Principles
- Follow the coding guidelines in docs/coding-guidelines.md
- Adhere to the testing strategy in docs/testing-strategy.md
- Reference the API contracts in docs/api-contracts.md
- Follow the UI guidelines in docs/ui-guidelines.md

## TypeScript Rules
- Use strict mode
- Prefer `const` over `let`, never use `var`
- Use arrow functions for all function expressions
- Prefer `interface` for object types, `type` for unions/intersections
- Always include explicit return types for functions
- Use optional chaining (`?.`) and nullish coalescing (`??`)

## React/Component Rules
- Use functional components with hooks exclusively
- Export components as `export const ComponentName = () => {}`
- Name event handlers with `handle` prefix: `handleClick`, `handleSubmit`
- Use `React.FC` or explicit typing for component props
- Implement proper accessibility with ARIA labels
- Use semantic HTML elements

## Naming Conventions
- Files: PascalCase for components (`TaskList.tsx`), camelCase for utilities (`formatDate.ts`)
- Components: PascalCase (`TaskWidget`)
- Functions: camelCase (`createTask`, `handleTaskUpdate`)
- Constants: SCREAMING_SNAKE_CASE (`API_BASE_URL`, `MAX_TITLE_LENGTH`)
- Interfaces: PascalCase with descriptive names (`Task`, `CreateTaskInput`)

## Code Organization
- One component per file
- Group related types/interfaces at the top of the file
- Order imports: React, third-party, local components, utilities, types
- Keep functions small (prefer < 20 lines)
- Extract complex logic into custom hooks

## Testing Requirements
- Write tests using Vitest and React Testing Library
- Use AAA pattern (Arrange, Act, Assert)
- Name tests descriptively: `should return 404 when task not found`
- Test user behavior, not implementation details
- Mock external dependencies (API calls, etc.)

## Error Handling
- Use try/catch for async operations
- Display user-friendly error messages
- Log errors for debugging
- Never expose stack traces to users

## API Integration
- Use async/await for all API calls
- Handle loading states
- Handle error states
- Show appropriate user feedback
- Follow RESTful patterns defined in docs/api-contracts.md

## Performance
- Use React.memo for expensive components
- Use useMemo for expensive computations
- Use useCallback for event handlers passed to child components
- Avoid inline object/array creation in render

## Accessibility
- Include aria-label on interactive elements without text
- Use semantic HTML (button, form, input types)
- Support keyboard navigation
- Test with screen readers
- Provide focus indicators

## Git Workflow
- Write descriptive commit messages
- One logical change per commit
- Reference exercise numbers in branch names
- Keep commits atomic and focused

## Documentation
- Add JSDoc comments for exported functions
- Document complex algorithms
- Keep README up to date
- Document API changes
