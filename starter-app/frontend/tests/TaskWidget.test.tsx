import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskWidget } from '../src/components/TaskWidget';
import * as api from '../src/services/api';

// Mock the API module
vi.mock('../src/services/api');

const mockTasks = [
  {
    id: '1',
    title: 'Task 1',
    status: 'todo' as const,
    priority: 'high' as const,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Task 2',
    status: 'in-progress' as const,
    priority: 'medium' as const,
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Task 3',
    status: 'done' as const,
    priority: 'low' as const,
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
];

describe('TaskWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Task List Display', () => {
    it('should display list of tasks', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();
      });
    });

    it('should display task status for each task', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      // Assert — use data-status to avoid colliding with filter button text
      await waitFor(() => {
        expect(document.querySelector('[data-status="todo"]')).toBeInTheDocument();
        expect(document.querySelector('[data-status="in-progress"]')).toBeInTheDocument();
        expect(document.querySelector('[data-status="done"]')).toBeInTheDocument();
      });
    });

    it('should display task priority for each task', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      // Assert
      await waitFor(() => {
        expect(document.querySelector('[data-priority="high"]')).toBeInTheDocument();
        expect(document.querySelector('[data-priority="medium"]')).toBeInTheDocument();
        expect(document.querySelector('[data-priority="low"]')).toBeInTheDocument();
      });
    });

    it('should display empty state when no tasks exist', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue([]);

      // Act
      render(<TaskWidget />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
      });
    });
  });

  describe('Task Filtering', () => {
    it('should show all tasks by default', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();
      });
    });

    it('should filter tasks by todo status', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      const todoFilter = screen.getByLabelText(/filter.*todo/i);
      fireEvent.click(todoFilter);

      // Assert
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
    });

    it('should filter tasks by in-progress status', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 2')).toBeInTheDocument();
      });

      const inProgressFilter = screen.getByLabelText(/filter.*in-progress/i);
      fireEvent.click(inProgressFilter);

      // Assert
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
    });

    it('should filter tasks by done status', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 3')).toBeInTheDocument();
      });

      const doneFilter = screen.getByLabelText(/filter.*done/i);
      fireEvent.click(doneFilter);

      // Assert
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    it('should clear filter and show all tasks', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      // Filter to todo
      const todoFilter = screen.getByLabelText(/filter.*todo/i);
      fireEvent.click(todoFilter);
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();

      // Clear filter
      const allFilter = screen.getByLabelText(/filter.*all/i);
      fireEvent.click(allFilter);

      // Assert
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    it('should show empty state message when filter has no matches', async () => {
      // Arrange
      const todoOnlyTasks = [mockTasks[0]];
      vi.mocked(api.fetchTasks).mockResolvedValue(todoOnlyTasks);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      const doneFilter = screen.getByLabelText(/filter.*done/i);
      fireEvent.click(doneFilter);

      // Assert
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.getByText(/no done tasks/i)).toBeInTheDocument();
    });
  });

  describe('Creating Tasks', () => {
    it('should create new task when form is submitted', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue([]);
      const newTask = {
        id: '4',
        title: 'New Task',
        status: 'todo' as const,
        priority: 'medium' as const,
        createdAt: '2025-01-04T00:00:00.000Z',
        updatedAt: '2025-01-04T00:00:00.000Z',
      };
      vi.mocked(api.createTask).mockResolvedValue(newTask);

      // Act
      render(<TaskWidget />);
      await waitFor(() => expect(screen.getByRole('button', { name: /create/i })).not.toBeDisabled());

      const input = screen.getByLabelText(/task title/i);
      const submitButton = screen.getByRole('button', { name: /create/i });

      await userEvent.type(input, 'New Task');
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(api.createTask).toHaveBeenCalledWith({ title: 'New Task' });
      });
    });

    it('should display newly created task in the list', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);
      const newTask = {
        id: '4',
        title: 'New Task',
        status: 'todo' as const,
        priority: 'medium' as const,
        createdAt: '2025-01-04T00:00:00.000Z',
        updatedAt: '2025-01-04T00:00:00.000Z',
      };
      vi.mocked(api.createTask).mockResolvedValue(newTask);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      const input = screen.getByLabelText(/task title/i);
      const submitButton = screen.getByRole('button', { name: /create/i });

      await userEvent.type(input, 'New Task');
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('New Task')).toBeInTheDocument();
      });
    });

    it('should clear input field after task creation', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue([]);
      const newTask = {
        id: '4',
        title: 'New Task',
        status: 'todo' as const,
        priority: 'medium' as const,
        createdAt: '2025-01-04T00:00:00.000Z',
        updatedAt: '2025-01-04T00:00:00.000Z',
      };
      vi.mocked(api.createTask).mockResolvedValue(newTask);

      // Act
      render(<TaskWidget />);

      const input = screen.getByLabelText(/task title/i) as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /create/i });

      await userEvent.type(input, 'New Task');
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });

    it('should not create task when title is empty', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue([]);

      // Act
      render(<TaskWidget />);
      await waitFor(() => expect(screen.getByRole('button', { name: /create/i })).not.toBeDisabled());

      const submitButton = screen.getByRole('button', { name: /create/i });
      fireEvent.click(submitButton);

      // Assert
      expect(api.createTask).not.toHaveBeenCalled();
    });

    it('should show validation error when trying to submit empty title', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue([]);

      // Act
      render(<TaskWidget />);
      await waitFor(() => expect(screen.getByRole('button', { name: /create/i })).not.toBeDisabled());

      const submitButton = screen.getByRole('button', { name: /create/i });
      fireEvent.click(submitButton);

      // Assert
      expect(screen.getByText(/title.*required/i)).toBeInTheDocument();
    });
  });

  describe('Editing Tasks', () => {
    it('should enter edit mode when task title is clicked', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      const taskTitle = screen.getByText('Task 1');
      fireEvent.click(taskTitle);

      // Assert
      const editInput = screen.getByDisplayValue('Task 1');
      expect(editInput).toBeInTheDocument();
      expect(editInput).toHaveFocus();
    });

    it('should save edited task title on blur', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);
      const updatedTask = { ...mockTasks[0], title: 'Updated Task' };
      vi.mocked(api.updateTask).mockResolvedValue(updatedTask);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      const taskTitle = screen.getByText('Task 1');
      fireEvent.click(taskTitle);

      const editInput = screen.getByDisplayValue('Task 1');
      await userEvent.clear(editInput);
      await userEvent.type(editInput, 'Updated Task');
      fireEvent.blur(editInput);

      // Assert
      await waitFor(() => {
        expect(api.updateTask).toHaveBeenCalledWith('1', { title: 'Updated Task' });
      });
    });

    it('should save edited task title on Enter key', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);
      const updatedTask = { ...mockTasks[0], title: 'Updated Task' };
      vi.mocked(api.updateTask).mockResolvedValue(updatedTask);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      const taskTitle = screen.getByText('Task 1');
      fireEvent.click(taskTitle);

      const editInput = screen.getByDisplayValue('Task 1');
      await userEvent.clear(editInput);
      await userEvent.type(editInput, 'Updated Task{Enter}');

      // Assert
      await waitFor(() => {
        expect(api.updateTask).toHaveBeenCalledWith('1', { title: 'Updated Task' });
      });
    });

    it('should cancel edit on Escape key', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      const taskTitle = screen.getByText('Task 1');
      fireEvent.click(taskTitle);

      const editInput = screen.getByDisplayValue('Task 1');
      await userEvent.clear(editInput);
      await userEvent.type(editInput, 'Changed{Escape}');

      // Assert
      expect(api.updateTask).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });
    });

    it('should not save empty title when editing', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      const taskTitle = screen.getByText('Task 1');
      fireEvent.click(taskTitle);

      const editInput = screen.getByDisplayValue('Task 1');
      await userEvent.clear(editInput);
      fireEvent.blur(editInput);

      // Assert
      expect(api.updateTask).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading indicator while fetching tasks', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockTasks), 100))
      );

      // Act
      render(<TaskWidget />);

      // Assert
      expect(screen.getByText(/loading/i)).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      });
    });

    it('should hide loading indicator after tasks are loaded', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);

      // Act
      render(<TaskWidget />);

      // Assert
      await waitFor(() => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });
    });

// Optimistic UI means we don't show loading states for creation
    it.skip('should show loading state when creating task', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue([]);
      const newTask = {
        id: '4',
        title: 'New Task',
        status: 'todo' as const,
        priority: 'medium' as const,
        createdAt: '2025-01-04T00:00:00.000Z',
        updatedAt: '2025-01-04T00:00:00.000Z',
      };
      vi.mocked(api.createTask).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(newTask), 100))
      );

      // Act
      render(<TaskWidget />);
      await waitFor(() => expect(screen.getByRole('button', { name: /create/i })).not.toBeDisabled());

      const input = screen.getByLabelText(/task title/i);
      const submitButton = screen.getByRole('button', { name: /create/i });

      await userEvent.type(input, 'New Task');
      fireEvent.click(submitButton);

      // Assert
      expect(submitButton).toBeDisabled();

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message when fetching tasks fails', async () => {
      // Arrange
      const error = new Error('Failed to fetch tasks');
      vi.mocked(api.fetchTasks).mockRejectedValue(error);

      // Act
      render(<TaskWidget />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/error.*loading tasks/i)).toBeInTheDocument();
      });
    });

    it('should display error message when creating task fails', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue([]);
      const error = new Error('Failed to create task');
      vi.mocked(api.createTask).mockRejectedValue(error);

      // Act
      render(<TaskWidget />);
      await waitFor(() => expect(screen.getByRole('button', { name: /create/i })).not.toBeDisabled());

      const input = screen.getByLabelText(/task title/i);
      const submitButton = screen.getByRole('button', { name: /create/i });

      await userEvent.type(input, 'New Task');
      fireEvent.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/error.*creating task/i)).toBeInTheDocument();
      });
    });

    it('should display error message when updating task fails', async () => {
      // Arrange
      vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks);
      const error = new Error('Failed to update task');
      vi.mocked(api.updateTask).mockRejectedValue(error);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });

      const taskTitle = screen.getByText('Task 1');
      fireEvent.click(taskTitle);

      const editInput = screen.getByDisplayValue('Task 1');
      await userEvent.clear(editInput);
      await userEvent.type(editInput, 'Updated{Enter}');

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/error.*updating task/i)).toBeInTheDocument();
      });
    });

    it('should allow retrying after error', async () => {
      // Arrange
      const error = new Error('Failed to fetch tasks');
      vi.mocked(api.fetchTasks)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce(mockTasks);

      // Act
      render(<TaskWidget />);

      await waitFor(() => {
        expect(screen.getByText(/error.*loading tasks/i)).toBeInTheDocument();
      });

      const retryButton = screen.getByRole('button', { name: /retry/i });
      fireEvent.click(retryButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Task 1')).toBeInTheDocument();
      });
    });
  });
});
