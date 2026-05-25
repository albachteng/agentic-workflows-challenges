# Task Management Starter App

This is an intentionally imperfect starter application for the Agentic Workflows lab.

## Purpose

This app serves as a baseline for students to experiment with different agent-assisted development workflows. **It intentionally contains flaws** documented in `docs/architecture.md`.

## Quick Start

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Running Tests

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Features

### Implemented

- **Task List Display** - View all tasks
- **Filter by Status** - Filter tasks by todo/in-progress/done
- **Create Tasks** - Add new tasks
- **Edit Tasks** - Update task titles inline
- **Task Priority** - Display task priority levels
- **Loading States** - Show loading indicators
- **Error Handling** - Display error messages

### API Endpoints

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

See `docs/api-contracts.md` for complete API specification.

## Intentional Flaws

This app **intentionally** contains issues for students to practice fixing:

1. **Performance Issues** - Unnecessary re-renders, missing memoization
2. **Architecture Issues** - Business logic in components, poor separation
3. **Code Quality Issues** - Inconsistent patterns, duplicated code

See `docs/architecture.md` for a complete list of intentional flaws.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express, TypeScript, Node.js
- **Testing**: Vitest, React Testing Library, Supertest
- **Code Quality**: ESLint, Prettier

## Project Structure

```
starter-app/
├── backend/
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   ├── models/      # Type definitions
│   │   ├── store/       # In-memory data store
│   │   ├── server.ts    # Express app setup
│   │   └── index.ts     # Server entry point
│   └── tests/           # API tests
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── services/    # API client
    │   ├── App.tsx      # Root component
    │   └── main.tsx     # Entry point
    └── tests/           # Component tests
```

## Development Notes

- Backend uses in-memory storage (data resets on restart)
- No authentication (out of scope for this lab)
- CORS enabled for localhost:5173
- TypeScript strict mode enabled

## For Students

Don't try to "fix" the intentional flaws before starting the exercises. The lab is designed to practice different approaches to improving this codebase with agent assistance.

Refer to the main lab README and exercise instructions for how to use this starter app.
