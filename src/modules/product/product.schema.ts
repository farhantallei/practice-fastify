import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const { id, createdAt, updatedAt, title, content, price, ownerId } = {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string().min(1),
  content: z.string().min(1).optional(),
  price: z.number(),
  ownerId: z.number(),
};

const createProductSchema = z.object({ title, content, price });
const productResponseSchema = z.object({
  id,
  createdAt,
  updatedAt,
  title,
  content,
  price,
});
const productsResponseSchema = z.array(productResponseSchema);

const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    createProductSchema,
    productResponseSchema,
    productsResponseSchema,
  },
  { $id: 'product' }
);

export { $ref };

export type CreateProductRequest = z.infer<typeof createProductSchema>;

export default productSchemas;
