import { FastifyInstance } from 'fastify';
import {
  declareTasksRoutes,
  tasksRoutePrefix,
} from '@taskaria-app/tasks/api-tasks';

export default async function (fastify: FastifyInstance) {
  fastify.register(declareTasksRoutes, { prefix: tasksRoutePrefix });
}
