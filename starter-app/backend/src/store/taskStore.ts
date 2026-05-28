import { Task, CreateTaskInput, UpdateTaskInput } from '../models/task.js';
import { v4 as uuidv4 } from 'uuid';

class TaskStore {
  private tasks: Map<string, Task> = new Map();

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  createTask(input: CreateTaskInput): Task {
    const now = new Date().toISOString();
    const task: Task = {
      id: uuidv4(),
      title: input.title.trim(),
      status: input.status || 'todo',
      priority: input.priority || 'medium',
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.set(task.id, task);
    return task;
  }

  updateTask(id: string, input: UpdateTaskInput): Task | undefined {
    const task = this.tasks.get(id);
    if (!task) {
      return undefined;
    }

    const updatedTask: Task = {
      ...task,
      ...(input.title !== undefined && { title: input.title }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.priority !== undefined && { priority: input.priority }),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  deleteTask(id: string): boolean {
    return this.tasks.delete(id);
  }

  clear(): void {
    this.tasks.clear();
  }
}

export const taskStore = new TaskStore();
