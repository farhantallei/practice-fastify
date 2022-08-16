declare global {
  namespace NodeJS {
    interface ProcessEnv {
      npm_package_version: string;
    }
  }
}

// declare module 'fastify' {
//   interface FastifyRequest {
//     decodeToken: (token: string) => {
//       sub: string;
//       iat: number;
//       exp: number;
//     } | null;
//   }
// }

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      iat: number;
      exp: number;
    };
  }
}

export {};
