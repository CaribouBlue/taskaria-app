import { NewTask, Task } from '@taskaria-app/tasks/util-types';
import { JSONSchemaType } from 'ajv';
import { FastifyInstance, RouteGenericInterface } from 'fastify';
import { newTaskSchema, taskSchema } from '../schema/tasks-schema';
import { v4 as uuid } from 'uuid';

interface PostTasksRoute extends RouteGenericInterface {
  Body: NewTask;
  Params: {
    userId: string;
  };
  Reply: {
    task: Task;
  };
}

const schema: {
  params: JSONSchemaType<PostTasksRoute['Params']>;
  body: JSONSchemaType<PostTasksRoute['Body']>;
  reply: JSONSchemaType<PostTasksRoute['Reply']>;
} = {
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
    required: ['userId'],
    additionalProperties: false,
  },
  body: {
    ...newTaskSchema,
  },
  reply: {
    type: 'object',
    properties: {
      task: taskSchema,
    },
    required: ['task'],
  },
};

export const declarePostTasksRoute = (fastify: FastifyInstance) => {
  fastify.route<PostTasksRoute>({
    method: 'POST',
    url: '/',
    schema,
    async handler(request, reply) {
      const newTask = request.body;
      const task: Task = {
        ...newTask,
        taskId: uuid(),
      };
      await this.taskDb.putTask(task);
      return { task };
    },
  });
};
