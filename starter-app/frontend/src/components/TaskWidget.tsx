import { useState } from 'react';
import { useTasks, SortPreference } from '../hooks/useTasks';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import type { Task } from '../services/api';

export const TaskWidget = () => {
  const {
    tasks,
    loading,
    error,
    sortPreference,
    setSortPreference,
    loadTasks,
    createTaskOptimistically,
    updateTaskOptimistically,
    deleteTaskOptimistically,
    setError
  } = useTasks();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === 'all') return true;
    return task.status === statusFilter;
  });

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTaskTitle.trim()) {
      setValidationError('Title is required');
      return;
    }

    setValidationError(null);
    try {
      await createTaskOptimistically(newTaskTitle);
      setNewTaskTitle('');
    } catch (err) {
      // Error is handled by hook
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
    if (!editingTitle.trim()) {
      handleCancelEdit();
      return;
    }

    try {
      await updateTaskOptimistically(taskId, editingTitle);
      setEditingTaskId(null);
      setEditingTitle('');
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(taskId);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      const id = taskToDelete.id;
      setTaskToDelete(null);
      try {
        await deleteTaskOptimistically(id);
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  return (
    <div className="task-widget">
      <h1>Task Manager</h1>

      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={() => { setError(null); loadTasks(); }}>Retry</button>
        </div>
      )}

      {validationError && (
        <div className="validation-error" role="alert">
          {validationError}
        </div>
      )}

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

      <div className="filters">
        <button
          onClick={() => setStatusFilter('all')}
          aria-label="Filter tasks: all"
          aria-pressed={statusFilter === 'all'}
        >
          All Tasks
        </button>
        <button
          onClick={() => setStatusFilter('todo')}
          aria-label="Filter tasks: todo"
          aria-pressed={statusFilter === 'todo'}
        >
          Todo Tasks
        </button>
        <button
          onClick={() => setStatusFilter('in-progress')}
          aria-label="Filter tasks: in-progress"
          aria-pressed={statusFilter === 'in-progress'}
        >
          In Progress Tasks
        </button>
        <button
          onClick={() => setStatusFilter('done')}
          aria-label="Filter tasks: done"
          aria-pressed={statusFilter === 'done'}
        >
          Done Tasks
        </button>
      </div>

      <div className="sorting-controls" style={{ margin: '1rem 0' }}>
        <label htmlFor="sort-preference" style={{ marginRight: '0.5rem' }}>Sort by:</label>
        <select 
          id="sort-preference"
          value={sortPreference} 
          onChange={(e) => setSortPreference(e.target.value as SortPreference)}
        >
          <option value="createdAt">Date Created</option>
          <option value="priority">Priority (High to Low)</option>
        </select>
      </div>

      {loading && <div role="status" aria-live="polite">Loading...</div>}

      <ul className="task-list" role="list">
        {filteredTasks.length === 0 && !loading && (
          <li className="empty-state">
            {statusFilter === 'all' ? 'No tasks yet' : `No ${statusFilter} tasks`}
          </li>
        )}
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              <div onClick={() => handleStartEdit(task)} style={{ flex: 1, cursor: 'pointer' }}>
                <span className="task-title">{task.title}</span>
                <span className="task-status" data-status={task.status} style={{ margin: '0 1rem' }}>
                  Status: {task.status}
                </span>
                <span className="task-priority" data-priority={task.priority}>
                  Priority: {task.priority}
                </span>
              </div>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); setTaskToDelete(task); }}
              aria-label={`Delete task: ${task.title}`}
              style={{ marginLeft: '1rem', padding: '0.2rem 0.5rem', backgroundColor: '#ffcccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <DeleteConfirmationModal 
        isOpen={!!taskToDelete}
        taskTitle={taskToDelete?.title || ''}
        onConfirm={confirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
};

export default TaskWidget;
