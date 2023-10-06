import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export const route = async function (fastify: FastifyInstance) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'hello world' };
  });
}

export const prefix = '/hello-world';