import { RSOWH } from '../../types';
import {
  getUsersHandler,
  loginHandler,
  registerHandler,
} from './user.controller';
import { $ref, LoginRequest, RegisterRequest } from './user.schema';

export const getUsersOpts: RSOWH = {
  schema: {
    response: {
      200: $ref('getUsersResponseSchema'),
    },
  },
  preHandler: (request) => request.jwtVerify(),
  handler: getUsersHandler,
};

export const registerOpts: RSOWH<{ Body: RegisterRequest }> = {
  schema: {
    body: $ref('registerSchema'),
    response: {
      201: $ref('registerResponseSchema'),
    },
  },
  handler: registerHandler,
};

export const loginOpts: RSOWH<{ Body: LoginRequest }> = {
  schema: {
    body: $ref('loginSchema'),
    response: {
      200: $ref('loginResponseSchema'),
    },
  },
  handler: loginHandler,
};

export type GetUsersHandler = typeof getUsersOpts.handler;
export type RegisterHandler = typeof registerOpts.handler;
export type LoginHandler = typeof loginOpts.handler;
