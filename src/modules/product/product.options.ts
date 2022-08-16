import { RSOWH } from '../../types';
import { createProductHandler, getProductsHandler } from './product.controller';
import { $ref, CreateProductRequest } from './product.schema';

export const getProductsOpts: RSOWH = {
  schema: {
    response: { 200: $ref('productsResponseSchema') },
  },
  handler: getProductsHandler,
};

export const createProductOpts: RSOWH<{ Body: CreateProductRequest }> = {
  schema: {
    body: $ref('createProductSchema'),
    response: {
      201: $ref('productResponseSchema'),
    },
  },
  handler: createProductHandler,
};

export type GetProductsHandler = typeof getProductsOpts.handler;
export type CreateProductHandler = typeof createProductOpts.handler;
