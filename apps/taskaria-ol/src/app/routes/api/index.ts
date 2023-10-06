import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as helloWorld from '@taskaria-app/api/feature/hello-world';

export default async function (fastify: FastifyInstance) {
    fastify.register(helloWorld.route, { prefix: helloWorld.prefix });
}
