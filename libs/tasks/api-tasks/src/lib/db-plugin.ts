import { TasksDb } from '@taskaria-app/tasks/util-db';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

// using declaration merging, add your plugin props to the appropriate fastify interfaces
// if prop type is defined here, the value will be typechecked when you call decorate{,Request,Reply}
declare module 'fastify' {
  interface FastifyInstance {
    taskDb: TasksDb;
  }
}

const taskDbPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorate('taskDb', new TasksDb());
};

export default fp(taskDbPlugin);
