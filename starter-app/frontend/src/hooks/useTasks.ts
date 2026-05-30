import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import type { Task } from '../services/api';

export type SortPreference = 'priority' | 'createdAt';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [sortPreference, setSortPreference] = useState<SortPreference>(() => {
    const saved = localStorage.getItem('taskSortPreference');
    return (saved as SortPreference) || 'createdAt';
  });

  useEffect(() => {
    localStorage.setItem('taskSortPreference', sortPreference);
  }, [sortPreference]);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError('Error loading tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTaskOptimistically = async (title: string) => {
    setError(null);
    try {
      const newTask = await api.createTask({ title });
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Error creating task');
      throw err;
    }
  };

  const updateTaskOptimistically = async (id: string, title: string) => {
    setError(null);
    const previousTasks = [...tasks];
    
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title } : t));
    
    try {
      const updatedTask = await api.updateTask(id, { title });
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      // Rollback
      setTasks(previousTasks);
      setError('Error updating task');
      throw err;
    }
  };

  const deleteTaskOptimistically = async (id: string) => {
    setError(null);
    const previousTasks = [...tasks];
    
    // Optimistic delete
    setTasks(prev => prev.filter(t => t.id !== id));
    
    try {
      await api.deleteTask(id);
    } catch (err) {
      // Rollback
      setTasks(previousTasks);
      setError('Error deleting task');
      throw err;
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortPreference === 'priority') {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const weightA = priorityWeight[a.priority] || 0;
      const weightB = priorityWeight[b.priority] || 0;
      if (weightA !== weightB) {
        return weightB - weightA;
      }
    }
    // Fallback to createdAt descending
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return {
    tasks: sortedTasks,
    loading,
    error,
    sortPreference,
    setSortPreference,
    loadTasks,
    createTaskOptimistically,
    updateTaskOptimistically,
    deleteTaskOptimistically,
    setError
  };
};
