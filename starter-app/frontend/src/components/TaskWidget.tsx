import { useState, useEffect } from 'react';
import * as api from '../services/api';
import type { Task } from '../services/api';

// INTENTIONAL FLAW #4: Business logic directly in component (no separation of concerns)
// INTENTIONAL FLAW #7: Magic strings scattered throughout
export const TaskWidget = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // INTENTIONAL FLAW #1: Unnecessary re-renders - no memoization
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === 'all') return true;
    return task.status === statusFilter;
  });

  // INTENTIONAL FLAW #4: Business logic in component instead of custom hook or service
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (err) {
      // INTENTIONAL FLAW #8: Inconsistent error handling
      setError('Error loading tasks');
    } finally {
      setLoading(false);
    }
  };

  // INTENTIONAL FLAW #3: No debouncing for form submission
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    // INTENTIONAL FLAW #9: Duplicated validation (also exists in backend)
    if (!newTaskTitle.trim()) {
      setValidationError('Title is required');
      return;
    }

    setValidationError(null);
    setLoading(true);
    setError(null);
    try {
      const newTask = await api.createTask({ title: newTaskTitle });
      // INTENTIONAL FLAW #1: Causes unnecessary re-render of entire list
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    } catch (err) {
      // INTENTIONAL FLAW #8: Different error message format
      setError('Error creating task');
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTitle('');
  };

  const handleSaveEdit = async (taskId: string) => {
    // INTENTIONAL FLAW #9: Duplicated validation
    if (!editingTitle.trim()) {
      handleCancelEdit();
      return;
    }

    try {
      const updatedTask = await api.updateTask(taskId, { title: editingTitle });
      // INTENTIONAL FLAW #1: Updates entire tasks array causing re-render
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
      setEditingTaskId(null);
      setEditingTitle('');
    } catch (err) {
      setError('Error updating task');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(taskId);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleRetry = () => {
    loadTasks();
  };

  // INTENTIONAL FLAW #7: Magic strings for status values
  return (
    <div className="task-widget">
      <h1>Task Manager</h1>

      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}

      {validationError && (
        <div className="validation-error" role="alert">
          {validationError}
        </div>
      )}

      {/* INTENTIONAL FLAW #4: Form logic mixed with display logic */}
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
          aria-label="New task title"
          disabled={loading}
        />
        <button type="submit" disabled={loading} aria-label="Create task">
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {/* INTENTIONAL FLAW #7: Magic strings for filter values */}
      <div className="filters">
        <label htmlFor="status-filter">Filter by status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter tasks by status"
        >
          <option value="all">All Tasks</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {loading && <div role="status" aria-live="polite">Loading...</div>}

      {/* INTENTIONAL FLAW #2: No memoization - TaskList re-renders unnecessarily */}
      <ul className="task-list" role="list">
        {filteredTasks.length === 0 && !loading && (
          <li className="empty-state">
            {statusFilter === 'all' ? 'No tasks yet' : `No ${statusFilter} tasks`}
          </li>
        )}
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onBlur={() => handleSaveEdit(task.id)}
                onKeyDown={(e) => handleKeyDown(e, task.id)}
                aria-label={`Edit task: ${task.title}`}
                autoFocus
              />
            ) : (
              <div onClick={() => handleStartEdit(task)}>
                <span className="task-title">{task.title}</span>
                <span className="task-status" data-status={task.status}>
                  Status: {task.status}
                </span>
                <span className="task-priority" data-priority={task.priority}>
                  Priority: {task.priority}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskWidget;
