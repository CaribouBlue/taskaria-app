import Fastify, { FastifyInstance } from 'fastify';
import { helloWorldRoute } from './hello-world-route';

describe('GET /', () => {
  let server: FastifyInstance;

  beforeEach(() => {
    server = Fastify();
    server.register(helloWorldRoute);
  });

  it('should respond with a message', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.json()).toEqual({ message: 'hello world' });
  });
});
