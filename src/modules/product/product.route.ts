import { FastifyPluginCallback } from 'fastify';
import { createProductOpts, getProductsOpts } from './product.options';

const productRoutes: FastifyPluginCallback = async (server) => {
  server.addHook('preHandler', (request) => request.jwtVerify());
  server.get('/', getProductsOpts);
  server.post('/', createProductOpts);
};

export default productRoutes;
