import { Task } from '@taskaria-app/tasks/util-types';
import { JSONSchemaType } from 'ajv';
import { FastifyInstance, RouteGenericInterface } from 'fastify';
import { taskSchema } from '../schema/tasks-schema';

interface PutTasksRoute extends RouteGenericInterface {
  Body: Task;
  Params: {
    userId: string;
    taskId: string;
  };
  Reply: {
    task: Task;
  };
}

const schema: {
  params: JSONSchemaType<PutTasksRoute['Params']>;
  body: JSONSchemaType<PutTasksRoute['Body']>;
  reply: JSONSchemaType<PutTasksRoute['Reply']>;
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
  body: {
    ...taskSchema,
  },
  reply: {
    type: 'object',
    properties: {
      task: taskSchema,
    },
    required: ['task'],
  },
};

export const declarePutTasksRoute = (fastify: FastifyInstance) => {
  fastify.route<PutTasksRoute>({
    method: 'PUT',
    url: '/:taskId',
    schema,
    async handler(request, reply) {
      const task = request.body;
      const taskId = task.TaskId;
      await this.taskDb.putTask(task);
      return { task };
    },
  });
};
