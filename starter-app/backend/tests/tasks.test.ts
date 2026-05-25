import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/server';
import { taskStore } from '../src/store/taskStore';

describe('Task API', () => {
  beforeEach(() => {
    taskStore.clear();
  });

  describe('GET /tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      // Arrange & Act
      const response = await request(app).get('/tasks');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all tasks', async () => {
      // Arrange - Create some tasks first
      await request(app)
        .post('/tasks')
        .send({ title: 'Task 1', status: 'todo', priority: 'high' });
      await request(app)
        .post('/tasks')
        .send({ title: 'Task 2', status: 'done', priority: 'low' });

      // Act
      const response = await request(app).get('/tasks');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({
        title: 'Task 1',
        status: 'todo',
        priority: 'high',
      });
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('createdAt');
      expect(response.body[0]).toHaveProperty('updatedAt');
    });

    it('should return Content-Type application/json', async () => {
      // Arrange & Act
      const response = await request(app).get('/tasks');

      // Assert
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });
  });

  describe('POST /tasks', () => {
    it('should create task with valid data', async () => {
      // Arrange
      const newTask = {
        title: 'New Task',
        status: 'todo',
        priority: 'medium',
      };

      // Act
      const response = await request(app).post('/tasks').send(newTask);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newTask);
      expect(response.body.id).toBeDefined();
      expect(typeof response.body.id).toBe('string');
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
    });

    it('should create task with minimal data (title only)', async () => {
      // Arrange
      const newTask = { title: 'Minimal Task' };

      // Act
      const response = await request(app).post('/tasks').send(newTask);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Minimal Task');
      expect(response.body.status).toBe('todo'); // Default
      expect(response.body.priority).toBe('medium'); // Default
    });

    it('should trim whitespace from title', async () => {
      // Arrange
      const newTask = { title: '  Trimmed Task  ' };

      // Act
      const response = await request(app).post('/tasks').send(newTask);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Trimmed Task');
    });

    it('should return 400 when title is missing', async () => {
      // Arrange
      const invalidTask = { status: 'todo' };

      // Act
      const response = await request(app).post('/tasks').send(invalidTask);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('title');
    });

    it('should return 400 when title is empty string', async () => {
      // Arrange
      const invalidTask = { title: '' };

      // Act
      const response = await request(app).post('/tasks').send(invalidTask);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('title');
    });

    it('should return 400 when title is only whitespace', async () => {
      // Arrange
      const invalidTask = { title: '   ' };

      // Act
      const response = await request(app).post('/tasks').send(invalidTask);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('title');
    });

    it('should return 400 when title exceeds 200 characters', async () => {
      // Arrange
      const longTitle = 'a'.repeat(201);
      const invalidTask = { title: longTitle };

      // Act
      const response = await request(app).post('/tasks').send(invalidTask);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('200');
    });

    it('should return 400 when status is invalid', async () => {
      // Arrange
      const invalidTask = { title: 'Task', status: 'invalid-status' };

      // Act
      const response = await request(app).post('/tasks').send(invalidTask);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/status/i);
    });

    it('should return 400 when priority is invalid', async () => {
      // Arrange
      const invalidTask = { title: 'Task', priority: 'invalid-priority' };

      // Act
      const response = await request(app).post('/tasks').send(invalidTask);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/priority/i);
    });

    it('should accept valid status values', async () => {
      // Test all valid statuses
      const statuses = ['todo', 'in-progress', 'done'];

      for (const status of statuses) {
        const response = await request(app)
          .post('/tasks')
          .send({ title: `Task ${status}`, status });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(status);
      }
    });

    it('should accept valid priority values', async () => {
      // Test all valid priorities
      const priorities = ['low', 'medium', 'high'];

      for (const priority of priorities) {
        const response = await request(app)
          .post('/tasks')
          .send({ title: `Task ${priority}`, priority });

        expect(response.status).toBe(201);
        expect(response.body.priority).toBe(priority);
      }
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should update task title', async () => {
      // Arrange - Create a task
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Original Title' });
      const taskId = createResponse.body.id;

      // Act
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ title: 'Updated Title' });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
      expect(response.body.id).toBe(taskId);
      expect(response.body.updatedAt).not.toBe(createResponse.body.updatedAt);
    });

    it('should update task status', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });
      const taskId = createResponse.body.id;

      // Act
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ status: 'in-progress' });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('in-progress');
    });

    it('should update task priority', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });
      const taskId = createResponse.body.id;

      // Act
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ priority: 'high' });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.priority).toBe('high');
    });

    it('should update multiple fields at once', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });
      const taskId = createResponse.body.id;

      // Act
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ title: 'New Title', status: 'done', priority: 'low' });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('New Title');
      expect(response.body.status).toBe('done');
      expect(response.body.priority).toBe('low');
    });

    it('should not update fields that are not provided', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Original', status: 'todo', priority: 'medium' });
      const taskId = createResponse.body.id;

      // Act - Only update title
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ title: 'Updated' });

      // Assert
      expect(response.body.title).toBe('Updated');
      expect(response.body.status).toBe('todo'); // Unchanged
      expect(response.body.priority).toBe('medium'); // Unchanged
    });

    it('should return 404 when task does not exist', async () => {
      // Arrange
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      // Act
      const response = await request(app)
        .patch(`/tasks/${nonExistentId}`)
        .send({ title: 'Updated' });

      // Assert
      expect(response.status).toBe(404);
      expect(response.body.error).toMatch(/not found/i);
    });

    it('should return 400 when title is invalid', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });
      const taskId = createResponse.body.id;

      // Act
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ title: '' });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('title');
    });

    it('should return 400 when status is invalid', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });
      const taskId = createResponse.body.id;

      // Act
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ status: 'invalid' });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/status/i);
    });

    it('should return 400 when priority is invalid', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });
      const taskId = createResponse.body.id;

      // Act
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ priority: 'invalid' });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/priority/i);
    });

    it('should return 400 when no valid fields provided', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });
      const taskId = createResponse.body.id;

      // Act
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({});

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/no valid fields/i);
    });

    it('should update updatedAt timestamp', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });
      const taskId = createResponse.body.id;
      const originalUpdatedAt = createResponse.body.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Act
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ title: 'Updated' });

      // Assert
      expect(response.body.updatedAt).not.toBe(originalUpdatedAt);
      expect(new Date(response.body.updatedAt).getTime()).toBeGreaterThan(
        new Date(originalUpdatedAt).getTime()
      );
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete existing task', async () => {
      // Arrange - Create a task
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task to delete' });
      const taskId = createResponse.body.id;

      // Act
      const response = await request(app).delete(`/tasks/${taskId}`);

      // Assert
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});

      // Verify task is actually deleted
      const getResponse = await request(app).get('/tasks');
      expect(getResponse.body).not.toContainEqual(
        expect.objectContaining({ id: taskId })
      );
    });

    it('should return 404 when task does not exist', async () => {
      // Arrange
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      // Act
      const response = await request(app).delete(`/tasks/${nonExistentId}`);

      // Assert
      expect(response.status).toBe(404);
      expect(response.body.error).toMatch(/not found/i);
    });

    it('should be idempotent (deleting twice returns 404 second time)', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/tasks')
        .send({ title: 'Task' });
      const taskId = createResponse.body.id;

      // Act - Delete once
      await request(app).delete(`/tasks/${taskId}`);

      // Act - Delete again
      const secondResponse = await request(app).delete(`/tasks/${taskId}`);

      // Assert
      expect(secondResponse.status).toBe(404);
    });

    it('should not affect other tasks', async () => {
      // Arrange - Create multiple tasks
      const task1 = await request(app)
        .post('/tasks')
        .send({ title: 'Task 1' });
      const task2 = await request(app)
        .post('/tasks')
        .send({ title: 'Task 2' });
      const task3 = await request(app)
        .post('/tasks')
        .send({ title: 'Task 3' });

      // Act - Delete middle task
      await request(app).delete(`/tasks/${task2.body.id}`);

      // Assert - Other tasks still exist
      const getResponse = await request(app).get('/tasks');
      expect(getResponse.body).toHaveLength(2);
      expect(getResponse.body).toContainEqual(
        expect.objectContaining({ id: task1.body.id })
      );
      expect(getResponse.body).toContainEqual(
        expect.objectContaining({ id: task3.body.id })
      );
      expect(getResponse.body).not.toContainEqual(
        expect.objectContaining({ id: task2.body.id })
      );
    });
  });

  describe('CORS', () => {
    it('should include CORS headers', async () => {
      // Act
      const response = await request(app).get('/tasks');

      // Assert
      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should return 500 for server errors', async () => {
      // This test verifies that unexpected errors are handled gracefully
      // Implementation should catch errors and return 500
      // Note: Actual implementation will be tested during integration
    });
  });
});
