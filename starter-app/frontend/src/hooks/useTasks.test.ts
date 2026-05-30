import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks } from './useTasks';
import * as api from '../services/api';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../services/api', () => ({
  fetchTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const mockTasks = [
    { id: '1', title: 'Task 1', status: 'todo', priority: 'medium', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
    { id: '2', title: 'Task 2', status: 'done', priority: 'high', createdAt: '2023-01-02', updatedAt: '2023-01-02' },
  ];

  it('should load tasks on mount', async () => {
    vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks as any);
    
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    // sortPreference is 'createdAt' by default, so Task 2 (newer) comes first
    expect(result.current.tasks[0].id).toBe('2');
    expect(result.current.tasks[1].id).toBe('1');
  });

  it('should sort tasks by priority', async () => {
    vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks as any);
    
    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    act(() => {
      result.current.setSortPreference('priority');
    });
    
    // High priority first
    expect(result.current.tasks[0].id).toBe('2'); // High
    expect(result.current.tasks[1].id).toBe('1'); // Medium
  });

  it('should optimistically delete task and rollback on failure', async () => {
    vi.mocked(api.fetchTasks).mockResolvedValue(mockTasks as any);
    vi.mocked(api.deleteTask).mockRejectedValue(new Error('API failed'));
    
    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    expect(result.current.tasks).toHaveLength(2);
    
    act(() => {
      result.current.deleteTaskOptimistically('1').catch(() => {});
    });
    
    // Optimistically removed
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].id).toBe('2');
    
    // Wait for rollback
    await waitFor(() => expect(result.current.error).toBe('Error deleting task'));
    expect(result.current.tasks).toHaveLength(2);
  });
});
