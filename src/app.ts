import jwt from '@fastify/jwt';
import sensible from '@fastify/sensible';
import swagger from '@fastify/swagger';
import fastify from 'fastify';
import { withRefResolver } from 'fastify-zod';
import { productRoutes, userRoutes } from './modules/routes';
import { productSchemas, userSchemas } from './modules/schemas';

const server = fastify();

// Plugins
server.register(sensible);
server.register(jwt, { secret: 'JWTSECRETKEY' });
server.register(
  swagger,
  withRefResolver({
    routePrefix: '/docs',
    exposeRoute: true,
    staticCSP: true,
    openapi: {
      info: {
        title: 'Fastify API',
        description: 'API for some products',
        version: process.env.npm_package_version,
      },
    },
  })
);

// Decorates
// server.decorateRequest('decodeToken', (token: string) =>
//   server.jwt.decode(token)
// );

// Schemas
for (const schema of [...productSchemas, ...userSchemas]) {
  server.addSchema(schema);
}

// Routes
server.register(userRoutes, { prefix: 'api/users' });
server.register(productRoutes, { prefix: 'api/products' });

// Home
server.get('/', () => {
  return 'Fastify + Prisma + Typescript';
});

function main() {
  try {
    server.listen({ port: 5000 }, () =>
      console.log(`Server ready at http://localhost:5000`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
