import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  helloWorldRoute,
  helloWorldPrefix,
} from '@taskaria-app/api/route/hello-world';

export default async function (fastify: FastifyInstance) {
  fastify.register(helloWorldRoute, { prefix: helloWorldPrefix });
}
