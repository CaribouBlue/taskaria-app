import { NewTask, Task, Tasks } from '@taskaria-app/tasks/util-types';
import { JSONSchemaType } from 'ajv';

export const taskSchema: JSONSchemaType<Task> = {
  type: 'object',
  properties: {
    taskId: { type: 'string' },
    userId: { type: 'string' },
    summary: { type: 'string' },
    isCompleted: { type: 'boolean' },
  },
  required: ['taskId', 'userId', 'summary'],
};

export const newTaskSchema: JSONSchemaType<NewTask> = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    summary: { type: 'string' },
  },
  required: ['userId', 'summary'],
};

export const tasksSchema: JSONSchemaType<Tasks> = {
  type: 'array',
  items: {
    ...taskSchema,
  },
};
