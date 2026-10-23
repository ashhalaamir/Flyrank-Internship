import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/api/tasks', () =>
    HttpResponse.json([
      {
        id: 1,
        title: 'Design dashboard layout',
        status: 'Completed',
        priority: 'High',
        category: 'Design',
        dueDate: '2026-10-20',
        userId: 1,
        userName: 'Ashhal',
      },
      {
        id: 2,
        title: 'Implement task filtering',
        status: 'In Progress',
        priority: 'Medium',
        category: 'Development',
        dueDate: '2026-10-28',
        userId: 1,
        userName: 'Ashhal',
      },
      {
        id: 3,
        title: 'Review API integration',
        status: 'Pending',
        priority: 'Low',
        category: 'Review',
        dueDate: '2026-11-02',
        userId: 2,
        userName: 'Jordan',
      },
    ]),
  ),
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
