import { Router, Request, Response } from 'express';
import { taskStore } from '../store/taskStore.js';
import { CreateTaskInput, UpdateTaskInput } from '../models/task.js';

export const tasksRouter = Router();

// INTENTIONAL FLAW #9: Magic strings instead of constants
// INTENTIONAL FLAW #10: Duplicated validation logic
tasksRouter.get('/tasks', (_req: Request, res: Response) => {
  const tasks = taskStore.getAllTasks();
  res.json(tasks);
});

tasksRouter.post('/tasks', (req: Request, res: Response) => {
  const input = req.body as CreateTaskInput;

  // INTENTIONAL FLAW #10: Duplicated validation (should be in a shared validator)
  if (!input.title || input.title.trim().length === 0) {
    return res.status(400).json({ error: 'title is required' });
  }

  if (input.title.trim().length > 200) {
    return res.status(400).json({ error: 'title must be 200 characters or less' });
  }

  // INTENTIONAL FLAW #9: Magic strings - should use constants or enums
  if (input.status && !['todo', 'in-progress', 'done'].includes(input.status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  if (input.priority && !['low', 'medium', 'high'].includes(input.priority)) {
    return res.status(400).json({ error: 'Invalid priority' });
  }

  const task = taskStore.createTask(input);
  res.status(201).json(task);
});

tasksRouter.patch('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const input = req.body as UpdateTaskInput;

  // Check if any valid fields are provided
  const hasValidFields =
    input.title !== undefined || input.status !== undefined || input.priority !== undefined;

  if (!hasValidFields) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  // INTENTIONAL FLAW #10: Duplicated validation logic
  if (input.title !== undefined) {
    if (input.title.trim().length === 0) {
      return res.status(400).json({ error: 'title cannot be empty' });
    }
    if (input.title.trim().length > 200) {
      return res.status(400).json({ error: 'title must be 200 characters or less' });
    }
  }

  // INTENTIONAL FLAW #9: Magic strings again
  if (input.status && !['todo', 'in-progress', 'done'].includes(input.status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  if (input.priority && !['low', 'medium', 'high'].includes(input.priority)) {
    return res.status(400).json({ error: 'Invalid priority' });
  }

  const updatedTask = taskStore.updateTask(id, input);

  // INTENTIONAL FLAW #8: Inconsistent error handling (should use a common error handler)
  if (!updatedTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(updatedTask);
});

tasksRouter.delete('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = taskStore.deleteTask(id);

  // INTENTIONAL FLAW #8: Different error response format than PATCH
  if (!deleted) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(204).send();
});
