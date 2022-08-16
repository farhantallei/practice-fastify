import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const { id, email, name, password, accessToken } = {
  id: z.number(),
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(8),
  accessToken: z.string(),
};

const getUsersResponseSchema = z.array(z.object({ id, email, name }));
const registerSchema = z.object({ email, name, password });
const registerResponseSchema = z.object({ id, email, name });
const loginSchema = z.object({ email, password });
const loginResponseSchema = z.object({ accessToken });

const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    getUsersResponseSchema,
    registerSchema,
    registerResponseSchema,
    loginSchema,
    loginResponseSchema,
  },
  { $id: 'user' }
);

export { $ref };

export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;

export default userSchemas;
