import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export const helloWorldRoute = async function (fastify: FastifyInstance) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'hello world' };
  });
};

export const helloWorldPrefix = '/hello-world';
