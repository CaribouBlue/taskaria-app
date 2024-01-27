import { Tasks } from '@taskaria-app/tasks/util-types';
import { JSONSchemaType } from 'ajv';
import { FastifyInstance, RouteGenericInterface } from 'fastify';
import { tasksSchema } from '../schema/tasks-schema';

interface GetTasksRoute extends RouteGenericInterface {
  Params: {
    userId: string;
  };
  Reply: {
    tasks: Tasks;
  };
}

const schema: {
  params: JSONSchemaType<GetTasksRoute['Params']>;
  reply: JSONSchemaType<GetTasksRoute['Reply']>;
} = {
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
    required: ['userId'],
    additionalProperties: false,
  },
  reply: {
    type: 'object',
    properties: {
      tasks: tasksSchema,
    },
    required: ['tasks'],
  },
};

export const declareGetTasksRoute = (fastify: FastifyInstance) => {
  fastify.route<GetTasksRoute>({
    method: 'GET',
    url: '/',
    schema,
    async handler(request, reply) {
      const tasks = await this.taskDb.queryTasks(request.params.userId);
      return { tasks };
    },
  });
};
