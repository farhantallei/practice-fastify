import { FastifyPluginCallback } from 'fastify';
import { registerOpts, loginOpts, getUsersOpts } from './user.options';

const userRoutes: FastifyPluginCallback = async (server) => {
  server.get('/', getUsersOpts);
  server.post('/', registerOpts);
  server.post('/login', loginOpts);
};

export default userRoutes;
