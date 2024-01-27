import { NewTask, Task, Tasks } from '@taskaria-app/tasks/util-types';
import { JSONSchemaType } from 'ajv';

export const taskSchema: JSONSchemaType<Task> = {
  type: 'object',
  properties: {
    TaskId: { type: 'string' },
    UserId: { type: 'string' },
  },
  required: ['TaskId', 'UserId'],
};

export const newTaskSchema: JSONSchemaType<NewTask> = {
  type: 'object',
  properties: {
    UserId: { type: 'string' },
  },
  required: ['UserId'],
};

export const tasksSchema: JSONSchemaType<Tasks> = {
  type: 'array',
  items: {
    ...taskSchema,
  },
};
