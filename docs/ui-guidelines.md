# UI Guidelines

This document defines UI/UX patterns, React best practices, and accessibility requirements for the frontend.

When working with agents to build or modify UI components, reference this document to ensure consistency and quality.

---

## Core Principles

1. **Accessibility first** - All users should be able to use the application
2. **Progressive enhancement** - Basic functionality works, enhanced features add value
3. **User feedback** - Always show loading, success, and error states
4. **Simplicity** - Keep UI clean and uncluttered
5. **Consistency** - Use patterns consistently across the application

---

## React Component Patterns

### Component Composition

Favor composition over complex components with many props.

**Bad** - Monolithic component:
```typescript
<TaskWidget
  tasks={tasks}
  showFilters={true}
  showSearch={true}
  showPriority={true}
  filterOptions={['todo', 'done']}
  onTaskCreate={handleCreate}
  onTaskUpdate={handleUpdate}
  onTaskDelete={handleDelete}
/>
```

**Good** - Composed components:
```typescript
<TaskWidget tasks={tasks}>
  <TaskFilters />
  <TaskSearch />
  <TaskList onTaskClick={handleClick} />
  <TaskCreateButton onClick={handleCreate} />
</TaskWidget>
```

### Props Naming

- **Boolean props**: Prefix with `is`, `has`, `should`, or `can`
- **Event handlers**: Prefix with `on`
- **Render props**: Prefix with `render` or end with `Component`

**Examples**:
```typescript
interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  isEditing: boolean;
  canDelete: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  renderActions?: (task: Task) => React.ReactNode;
}
```

### Controlled vs Uncontrolled

**Prefer controlled components** for forms and inputs:

```typescript
const TaskForm = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Task title"
      />
      <button type="submit">Create</button>
    </form>
  );
};
```

---

## State Management

### Local State First

Start with local state (`useState`). Only lift state up when multiple components need it.

**Good progression**:
1. Start with local state in component
2. Lift to parent if siblings need it
3. Use context if many descendants need it
4. Add state management library only if context becomes complex

### When to Use Context

Use React Context for:
- Theme/appearance settings
- User preferences
- Authentication state
- Global app configuration

**Don't use Context for**:
- Frequently changing data (causes unnecessary re-renders)
- Data that's only needed by 1-2 components

### Custom Hooks for Complex State

Extract complex state logic into custom hooks:

```typescript
const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return { tasks, loading, error, reload: loadTasks };
};
```

---

## Loading States

### Always Show Loading State

Never leave users wondering if something is happening.

**Pattern**:
```typescript
const TaskList = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (tasks.length === 0) return <EmptyState />;

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
```

### Loading Indicators

**For initial load**: Full-screen or container-level spinner
**For actions**: Button spinner, disabled state
**For background updates**: Subtle indicator, don't block UI

**Example**:
```typescript
<button disabled={isCreating} onClick={handleCreate}>
  {isCreating ? 'Creating...' : 'Create Task'}
</button>
```

---

## Error Handling

### Display Errors to Users

Don't just log errors to console. Show users what went wrong.

**Pattern**:
```typescript
const TaskWidget = () => {
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (task: Omit<Task, 'id'>) => {
    setError(null);
    try {
      await createTask(task);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  return (
    <div>
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}
      {/* rest of component */}
    </div>
  );
};
```

### Error Message Guidelines

- **Be specific**: "Failed to load tasks" not "An error occurred"
- **Be helpful**: "Network error. Check your connection and try again."
- **Be actionable**: Include a retry button when appropriate
- **Be polite**: "We couldn't save your changes" not "Save failed"

---

## Accessibility

### ARIA Labels

All interactive elements must be keyboard accessible and have appropriate labels.

**Form inputs**:
```typescript
<input
  type="text"
  id="task-title"
  aria-label="Task title"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'title-error' : undefined}
/>
{hasError && <span id="title-error" role="alert">{errorMessage}</span>}
```

**Buttons**:
```typescript
<button aria-label="Delete task">
  <TrashIcon />
</button>
```

**Status regions**:
```typescript
<div role="status" aria-live="polite">
  {loading ? 'Loading tasks...' : `${tasks.length} tasks loaded`}
</div>
```

### Semantic HTML

Use semantic HTML elements instead of divs with onClick.

**Bad**:
```typescript
<div onClick={handleClick}>Click me</div>
```

**Good**:
```typescript
<button onClick={handleClick}>Click me</button>
```

**Semantic elements to use**:
- `<button>` for actions
- `<a>` for navigation
- `<nav>` for navigation sections
- `<main>` for main content
- `<article>` for self-contained content
- `<section>` for thematic groupings
- `<header>` and `<footer>` for page sections

### Keyboard Navigation

All interactive UI must be keyboard accessible.

**Requirements**:
- Tab to navigate between elements
- Enter/Space to activate buttons
- Arrow keys for lists and menus (when appropriate)
- Escape to close modals and dropdowns

**Example**:
```typescript
const TaskItem = ({ task, onDelete }: TaskItemProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      onDelete(task.id);
    }
  };

  return (
    <div
      tabIndex={0}
      role="article"
      onKeyDown={handleKeyDown}
      aria-label={`Task: ${task.title}`}
    >
      {task.title}
    </div>
  );
};
```

### Focus Management

Manage focus for better keyboard navigation and accessibility.

**After creating a task**:
```typescript
const inputRef = useRef<HTMLInputElement>(null);

const handleCreate = async (task: Omit<Task, 'id'>) => {
  await createTask(task);
  inputRef.current?.focus(); // Return focus to input
};
```

**When opening a modal**:
```typescript
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);
```

### Color Contrast

Ensure sufficient color contrast for readability:
- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text** (18pt+): 3:1 contrast ratio minimum
- **Interactive elements**: Clearly distinguishable from non-interactive

---

## Forms

### Form Validation

Validate on blur and on submit, not on every keystroke (unless explicitly needed).

**Pattern**:
```typescript
const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const validateTitle = (value: string) => {
    if (!value.trim()) return 'Title is required';
    if (value.length > 200) return 'Title must be 200 characters or less';
    return '';
  };

  const handleBlur = () => {
    setError(validateTitle(title));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">Task Title</label>
      <input
        id="task-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
        aria-invalid={!!error}
        aria-describedby={error ? 'title-error' : undefined}
      />
      {error && <span id="title-error" role="alert">{error}</span>}
      <button type="submit">Create Task</button>
    </form>
  );
};
```

### Form Labels

Every input must have an associated label.

**Preferred** (explicit association):
```typescript
<label htmlFor="task-priority">Priority</label>
<select id="task-priority">
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
```

**Acceptable** (implicit association):
```typescript
<label>
  Priority
  <select>
    <option value="low">Low</option>
  </select>
</label>
```

---

## Lists and Keys

### Always Use Stable Keys

Use unique, stable identifiers for keys. Never use array index.

**Bad**:
```typescript
{tasks.map((task, index) => (
  <TaskItem key={index} task={task} />
))}
```

**Good**:
```typescript
{tasks.map((task) => (
  <TaskItem key={task.id} task={task} />
))}
```

### Empty States

Always handle empty lists gracefully.

```typescript
const TaskList = ({ tasks }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Create one to get started!</p>
        <CreateTaskButton />
      </div>
    );
  }

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
```

---

## Performance

### Memoization

Use `useMemo` for expensive computations:

```typescript
const filteredTasks = useMemo(() => {
  return tasks.filter(task => {
    if (statusFilter && task.status !== statusFilter) return false;
    if (priorityFilter && task.priority !== priorityFilter) return false;
    return true;
  });
}, [tasks, statusFilter, priorityFilter]);
```

Use `useCallback` for functions passed as props:

```typescript
const handleTaskUpdate = useCallback((id: string, updates: Partial<Task>) => {
  updateTask(id, updates);
}, [updateTask]);
```

Use `React.memo` for components that re-render unnecessarily:

```typescript
export const TaskItem = React.memo(({ task, onUpdate }: TaskItemProps) => {
  return (
    <div>
      {task.title} - {task.status}
    </div>
  );
});
```

### When NOT to Optimize

Don't prematurely optimize. Use these tools only when:
- Profiling shows actual performance issues
- Components re-render frequently with same props
- Computations are measurably expensive

---

## Styling Guidelines

### CSS Modules (Recommended)

Use CSS Modules for component-scoped styles:

```typescript
import styles from './TaskWidget.module.css';

export const TaskWidget = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tasks</h2>
    </div>
  );
};
```

### Conditional Classes

Use a helper for conditional classes:

```typescript
const classNames = (...classes: (string | false | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

<div className={classNames(
  styles.task,
  isCompleted && styles.completed,
  isPriority && styles.priority
)}>
```

Or use the `clsx` library:
```typescript
import clsx from 'clsx';

<div className={clsx(styles.task, {
  [styles.completed]: isCompleted,
  [styles.priority]: isPriority,
})}>
```

---

## Common Patterns

### Modal/Dialog

```typescript
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Trap focus in modal
      // Add escape key listener
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
```

### Dropdown/Select

```typescript
const TaskFilter = ({ onFilterChange }: TaskFilterProps) => {
  const [filter, setFilter] = useState<TaskStatus | ''>('');

  return (
    <label>
      Filter by status
      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value as TaskStatus);
          onFilterChange(e.target.value as TaskStatus);
        }}
      >
        <option value="">All</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </label>
  );
};
```

### Confirmation Dialog

```typescript
const DeleteConfirmation = ({ task, onConfirm, onCancel }: Props) => {
  return (
    <div role="alertdialog" aria-labelledby="dialog-title">
      <h2 id="dialog-title">Delete Task?</h2>
      <p>Are you sure you want to delete "{task.title}"?</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm} className="danger">
        Delete
      </button>
    </div>
  );
};
```

---

## Testing UI Components

See `testing-strategy.md` for comprehensive testing guidelines.

### Quick Reference

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskWidget } from './TaskWidget';

describe('TaskWidget', () => {
  it('should render task list', () => {
    const tasks = [{ id: '1', title: 'Test task', status: 'todo' }];
    render(<TaskWidget tasks={tasks} />);

    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('should call onTaskCreate when form is submitted', () => {
    const handleCreate = vi.fn();
    render(<TaskWidget onTaskCreate={handleCreate} />);

    const input = screen.getByLabelText('Task title');
    const button = screen.getByRole('button', { name: /create/i });

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(button);

    expect(handleCreate).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'New task' })
    );
  });
});
```

---

## Responsive Design

### Mobile-First Approach

Design for mobile first, then enhance for larger screens.

```css
/* Mobile first */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 768px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
```

### Touch Targets

Ensure interactive elements are large enough for touch:
- Minimum touch target: 44x44 pixels
- Add padding around small icons to increase hit area

---

## Notes for LLM Agents

When prompting agents to build UI:

1. **Reference this document** - "Follow UI guidelines in docs/ui-guidelines.md"
2. **Specify accessibility requirements** - "Ensure keyboard navigation and ARIA labels"
3. **Request loading states** - "Include loading, error, and empty states"
4. **Emphasize semantic HTML** - "Use semantic HTML elements"
5. **Test recommendations** - "Write tests following React Testing Library best practices"

---

## Quick Checklist

Before considering a component complete:

- [ ] Semantic HTML used
- [ ] Keyboard accessible
- [ ] ARIA labels where needed
- [ ] Loading state shown
- [ ] Error state shown
- [ ] Empty state handled
- [ ] Form validation works
- [ ] Color contrast sufficient
- [ ] Works on mobile
- [ ] Tests written and passing

---

**Remember**: Accessible, well-structured UI benefits all users, not just those using assistive technologies.
