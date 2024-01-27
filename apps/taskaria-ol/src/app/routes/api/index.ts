import { FastifyInstance } from 'fastify';
import {
  helloWorldRoute,
  helloWorldPrefix,
} from '@taskaria-app/hello-world/api-hello-world';
import {
  declareTasksRoutes,
  tasksRoutePrefix,
} from '@taskaria-app/tasks/api-tasks';

export default async function (fastify: FastifyInstance) {
  fastify.register(helloWorldRoute, { prefix: helloWorldPrefix });

  fastify.register(declareTasksRoutes, { prefix: tasksRoutePrefix });
}
