import { http, HttpResponse } from 'msw';
import type { Task } from '@/types';

const tasks: Task[] = [
  {
    id: 1,
    title: 'Design dashboard layout',
    description: 'Create a clear, responsive dashboard layout that highlights task progress and key team metrics.',
    status: 'Completed',
    priority: 'High',
    category: 'Design',
    dueDate: '2026-10-20',
    createdAt: '2026-10-10T09:00:00.000Z',
    updatedAt: '2026-10-19T15:30:00.000Z',
    userId: 1,
    userName: 'Ashhal',
  },
  {
    id: 2,
    title: 'Implement task filtering',
    description: 'Add filtering by status, priority, and category so team members can quickly find relevant tasks.',
    status: 'InProgress',
    priority: 'Medium',
    category: 'Development',
    dueDate: '2026-10-28',
    createdAt: '2026-10-18T10:00:00.000Z',
    updatedAt: '2026-10-21T12:15:00.000Z',
    userId: 1,
    userName: 'Ashhal',
  },
  {
    id: 3,
    title: 'Review API integration',
    description: 'Review the frontend API integration and confirm loading, error, and success states behave as expected.',
    status: 'Pending',
    priority: 'Low',
    category: 'Review',
    dueDate: '2026-11-02',
    createdAt: '2026-10-22T08:30:00.000Z',
    updatedAt: null,
    userId: 2,
    userName: 'Jordan',
  },
];

export const handlers = [
  http.get('*/api/tasks/:id', ({ params }) => {
    const taskId = Number(params.id);
    const task = tasks.find(({ id }) => id === taskId);

    if (!task) {
      return HttpResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return HttpResponse.json(task);
  }),
  http.get('*/api/tasks', () => HttpResponse.json(tasks)),
  http.get('*/api/dashboard/stats', () =>
    HttpResponse.json({ totalTasks: 3, completed: 1, inProgress: 1, pending: 1 }),
  ),
  http.get('*/api/users/profile', () =>
    HttpResponse.json({
      id: 1,
      username: 'Ashhal',
      email: 'ashhal@example.com',
      role: 'Admin',
    }),
  ),
];
