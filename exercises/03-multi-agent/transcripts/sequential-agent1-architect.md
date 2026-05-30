# Architecture Plan: Sequential Multi-Agent

## 1. Component Structure
- **TaskWidget.tsx**: Update to incorporate sorting controls and render the new components. It should compose smaller components rather than being monolithic.
- **TaskFilters.tsx / TaskSort.tsx**: A component to toggle sorting between `priority` and `createdAt`.
- **TaskItem.tsx**: Add a "Delete" button that triggers the confirmation modal.
- **DeleteConfirmationModal.tsx**: A new accessible modal component to confirm task deletion.

## 2. State Management
- Extract state logic into a `useTasks` custom hook.
- **`sortPreference`**: Local state within `useTasks` (or `TaskWidget`) that persists to `localStorage`. Values: `'priority' | 'createdAt'`.
- **Optimistic Updates**: 
  - For deletion: Store the task locally in a backup variable or ref before calling the API, immediately remove it from `tasks` state. If the API fails, restore the task from the backup and display an `ErrorBanner`.
  - The `useTasks` hook will expose functions like `deleteTaskOptimistically(id)`.

## 3. API Integration
- **Frontend (`api.ts`)**: Add `deleteTask(id: string): Promise<void>`.
- **Backend (`routes/tasks.ts` & `store/taskStore.ts`)**: 
  - Add `DELETE /tasks/:id` endpoint.
  - Implement deletion in the in-memory store.
  - Handle 404 if the task doesn't exist.

## 4. Testing Strategy
- **Unit Tests (Vitest)**:
  - Test sorting utility logic: `priority` (high -> medium -> low) with `createdAt` as a secondary sort.
  - Test the `useTasks` hook for optimistic deletion and rollback behavior upon mocked API failure.
- **Component Tests (React Testing Library)**:
  - `DeleteConfirmationModal`: ensure keyboard accessibility (Escape to close, focus trapping) and that `onConfirm` and `onCancel` are called correctly.

## 5. Edge Cases & Error Handling
- **Edge Case - Priority Ties**: When sorting by priority, fallback to `createdAt` descending if priorities are the same.
- **Edge Case - Deletion Failure**: Revert the local UI state and show a clear `ErrorBanner` ("Failed to delete task. Please try again.").
- **Race Conditions**: Disable the "Delete" button while a deletion request is in flight to prevent double-submissions. Wait, optimistic update means it disappears instantly, so double submission isn't possible from the UI unless the API is slow and we don't immediately remove it. We will immediately remove it from the UI, so the button will be gone.

## Key Architectural Decisions
1. **Client-side Sorting**: Sorting will be done on the frontend to allow instant toggling without extra API calls.
2. **Custom Hook Extraction**: The monolithic state in `TaskWidget` will be extracted into a `useTasks` hook to separate business logic from UI.
3. **Optimistic Rollback via Catch**: The `deleteTask` function in the custom hook will filter out the task, await the API call, and in the `.catch()` block, it will restore the previous state and set an error message.
4. **LocalStorage for Sort Preference**: To persist the sort preference, initialize the state from `localStorage` and update `localStorage` whenever it changes.
