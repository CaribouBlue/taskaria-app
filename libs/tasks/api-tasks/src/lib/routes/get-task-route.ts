import { Task } from '@taskaria-app/tasks/util-types';
import { JSONSchemaType } from 'ajv';
import { FastifyInstance, RouteGenericInterface } from 'fastify';
import { taskSchema } from '../schema/tasks-schema';

interface GetTaskRoute extends RouteGenericInterface {
  Params: {
    userId: string;
    taskId: string;
  };
  Reply: {
    task: Task;
  };
}

const schema: {
  params: JSONSchemaType<GetTaskRoute['Params']>;
  reply: JSONSchemaType<GetTaskRoute['Reply']>;
} = {
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      taskId: { type: 'string' },
    },
    required: ['userId', 'taskId'],
    additionalProperties: false,
  },
  reply: {
    type: 'object',
    properties: {
      task: taskSchema,
    },
    required: ['task'],
  },
};

export const declareGetTaskRoute = (fastify: FastifyInstance) => {
  fastify.route<GetTaskRoute>({
    method: 'GET',
    url: '/:taskId',
    schema,
    async handler(request, reply) {
      const task = await this.taskDb.getTask(request.params.taskId);
      if (!task) {
        reply.status(404).send();
      } else {
        return { task };
      }
    },
  });
};
