import { FastifyInstance } from 'fastify';
import { declareGetTasksRoute } from './routes/get-tasks-route';
import { declareGetTaskRoute } from './routes/get-task-route';
import { declarePutTasksRoute } from './routes/put-tasks-route';
import { declarePostTasksRoute } from './routes/post-tasks-route';
import { TasksDbPlugin } from '..';

export const declareTasksRoutes = async function (fastify: FastifyInstance) {
  fastify.register(TasksDbPlugin);

  declareGetTasksRoute(fastify);
  declarePostTasksRoute(fastify);
  declarePutTasksRoute(fastify);
  declareGetTaskRoute(fastify);
};

export const tasksRoutePrefix = 'users/:userId/tasks';
