# Architecture Documentation

## Overview

This starter application is a simple task management system with a React frontend and Express backend.

**This application is intentionally imperfect.** The flaws documented here are designed to give you concrete targets for improvement when working with LLM agents.

## System Architecture

```
┌─────────────────┐
│  React Frontend │
│   (Port 5173)   │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│ Express Backend │
│   (Port 3000)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   In-Memory     │
│   Data Store    │
└─────────────────┘
```

## Frontend Architecture

### Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── TaskWidget.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Component Structure

- **App.tsx** - Root component, renders TaskWidget
- **TaskWidget.tsx** - Main task management UI
- **api.ts** - API client for backend communication

## Backend Architecture

### Directory Structure

```
backend/
├── src/
│   ├── routes/
│   │   └── tasks.ts
│   ├── models/
│   │   └── task.ts
│   ├── store/
│   │   └── taskStore.ts
│   ├── server.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### Layer Separation

- **Routes** - HTTP endpoint handlers
- **Models** - Data type definitions
- **Store** - In-memory data persistence
- **Server** - Express app configuration

## Data Model

```typescript
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}
```

## API Communication

Frontend communicates with backend via REST API over HTTP.

No authentication is implemented (out of scope for this lab).

---

## Intentional Flaws

The following issues are **deliberately included** to provide learning opportunities. When working with agents on the exercises, you can direct them to address these specific problems.

### Performance Issues

#### 1. Unnecessary Re-renders
**Location**: `frontend/src/components/TaskWidget.tsx`

**Problem**: The component doesn't use React.memo, useMemo, or useCallback where appropriate. Every parent re-render causes unnecessary recalculation of filtered tasks and recreation of handler functions.

**Impact**: Performance degrades with larger task lists.

**Exercise opportunity**: Exercise 1 or 3 - Have agents optimize rendering performance

---

#### 2. Missing Memoization
**Location**: `frontend/src/components/TaskWidget.tsx`

**Problem**: Task filtering logic runs on every render, even when the task list and filter haven't changed.

**Impact**: Wasted CPU cycles on every render.

**Exercise opportunity**: Exercise 1 - Compare how different prompting strategies handle optimization

---

#### 3. No Request Debouncing
**Location**: `frontend/src/services/api.ts` and task editing flows

**Problem**: If task editing is implemented without debouncing, every keystroke could trigger an API request.

**Impact**: Excessive network traffic and server load.

**Exercise opportunity**: Exercise 2 or 5 - TDD approach to adding debounced updates

---

### Architecture Issues

#### 4. Business Logic in Components
**Location**: `frontend/src/components/TaskWidget.tsx`

**Problem**: Filtering logic, state management, and UI rendering are all mixed in the same component. No separation between presentation and business logic.

**Impact**: Hard to test, hard to reuse logic, hard to maintain.

**Exercise opportunity**: Exercise 2 - Test linked docs effectiveness for refactoring guidance

---

#### 5. No Error Boundary
**Location**: `frontend/src/App.tsx`

**Problem**: No React Error Boundary to catch and handle component errors gracefully.

**Impact**: Entire app crashes on component errors instead of showing user-friendly error UI.

**Exercise opportunity**: Exercise 3 - Multi-agent workflow for error handling

---

#### 6. Coupling to API Implementation
**Location**: `frontend/src/components/TaskWidget.tsx`

**Problem**: Component directly imports and uses API client. No abstraction layer or dependency injection.

**Impact**: Hard to test, hard to swap implementations, hard to mock.

**Exercise opportunity**: Exercise 5 - TDD to introduce testable abstractions

---

#### 7. No Request Cancellation
**Location**: `frontend/src/services/api.ts`

**Problem**: If a component unmounts while a request is in-flight, no cleanup happens. This can cause "Can't perform a React state update on an unmounted component" warnings.

**Impact**: Memory leaks, console warnings, potential bugs.

**Exercise opportunity**: Exercise 1 or 2 - Incremental context to add cleanup

---

### Code Quality Issues

#### 8. Inconsistent Error Handling
**Location**: Throughout codebase

**Problem**: Some functions throw errors, some return error objects, some just log and continue. No consistent error handling strategy.

**Impact**: Hard to predict behavior, hard to debug, poor user experience.

**Exercise opportunity**: Exercise 2 - Test if linked docs improve consistency

---

#### 9. Magic Numbers and Strings
**Location**: `frontend/src/components/TaskWidget.tsx`, `backend/src/routes/tasks.ts`

**Problem**: Status values ("todo", "in-progress", "done"), priority values, and other constants are hardcoded as strings throughout the code.

**Impact**: Easy to introduce typos, hard to refactor, no single source of truth.

**Exercise opportunity**: Exercise 1 - See if structured prompts catch this

---

#### 10. Duplicated Validation Logic
**Location**: `backend/src/routes/tasks.ts`

**Problem**: Validation logic is duplicated across different route handlers instead of being extracted into reusable validators.

**Impact**: Inconsistent validation, more code to maintain, higher bug risk.

**Exercise opportunity**: Exercise 5 - TDD to extract and test validators

---

#### 11. No Input Sanitization
**Location**: `backend/src/routes/tasks.ts`

**Problem**: User input is not sanitized. While not a security risk for this demo (no XSS vectors in JSON API), it's a bad practice students should recognize.

**Impact**: Establishes poor security habits.

**Exercise opportunity**: Exercise 2 or 5 - Test if agents suggest security improvements

---

#### 12. Poor Type Safety
**Location**: Various locations

**Problem**: Some types use `any`, optional chaining is overused where types could be stricter, and type guards are missing.

**Impact**: Reduced TypeScript benefits, runtime errors that could be caught at compile time.

**Exercise opportunity**: Exercise 1 - Compare agent responses to vague vs specific type requirements

---

### Testing Gaps

#### 13. Missing Edge Case Tests
**Location**: Test files (when created)

**Problem**: Tests exist for happy paths but not for edge cases like empty lists, missing data, network failures, race conditions.

**Impact**: Bugs slip through that could have been caught.

**Exercise opportunity**: Exercise 5 - Core TDD exercise to identify missing tests

---

#### 14. Integration Tests Instead of Unit Tests
**Location**: Test files (when created)

**Problem**: Some tests test too much at once, making failures hard to diagnose.

**Impact**: Slow test suite, unclear failure messages.

**Exercise opportunity**: Exercise 5 - Demonstrate value of unit testing with agents

---

## Design Decisions

### Why In-Memory Storage?

For this lab, persistence isn't the focus. An in-memory store keeps the starter app simple and lets students focus on workflow patterns rather than database setup.

### Why No Authentication?

Authentication adds complexity that distracts from the learning goals. Students working with agents should focus on code quality, testing, and workflow patterns.

### Why TypeScript Everywhere?

TypeScript provides better agent assistance (better autocomplete context) and catches errors earlier. It's also industry-standard for modern web development.

## Extensibility Points

When working through exercises, you might extend the application with:

- Task filtering by priority
- Task search functionality
- Task deletion with undo
- Optimistic UI updates
- Request retry logic
- WebSocket real-time updates (for MCP exercise)
- Persistence layer (SQLite, Postgres)
- Authentication (for advanced students)

## Notes for LLM Agents

When prompting an agent to work on this codebase:

1. **Reference this document** to ensure agents understand the intentional flaws
2. **Be specific about which flaw to address** rather than asking for general improvements
3. **Request explanations** for why the current code is problematic
4. **Compare approaches** by having different agents fix the same flaw differently

## Architecture Principles to Follow

Even though the starter app violates some of these, these are the principles students should guide agents toward:

- **Separation of Concerns** - UI, business logic, and data access should be separate
- **Single Responsibility** - Each module should do one thing well
- **Dependency Injection** - Components should receive dependencies rather than importing them directly
- **Fail Fast** - Validate early, handle errors explicitly
- **Test-Driven** - Write tests first, then implementation
- **Type Safety** - Leverage TypeScript's type system fully
- **Immutability** - Prefer immutable data structures where practical

---

**Remember**: These flaws are intentional teaching tools. The goal is not to shame bad code, but to practice directing agents to improve it systematically.
