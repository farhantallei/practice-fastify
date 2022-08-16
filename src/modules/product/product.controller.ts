import prisma from '../../utils/prisma';
import { CreateProductHandler, GetProductsHandler } from './product.options';

export const getProductsHandler: GetProductsHandler = async (
  request,
  reply
) => {
  try {
    return await prisma.product.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        content: true,
        price: true,
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    if (typeof err === 'string') return reply.internalServerError(err);
    return reply.internalServerError('Server error');
  }
};

export const createProductHandler: CreateProductHandler = async (
  request,
  reply
) => {
  const { title, content, price } = request.body;
  const ownerId = parseInt(request.user.sub);

  try {
    return await prisma.product.create({
      data: { title, content, price, ownerId },
    });
  } catch (err) {
    console.error(err);
    if (typeof err === 'string') return reply.internalServerError(err);
    return reply.internalServerError('Server error');
  }
};
