import fastify from 'fastify';

const server = fastify();

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
