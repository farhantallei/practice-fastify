import { hashPassword, verifyPassword } from '../../utils/hash';
import prisma from '../../utils/prisma';
import { GetUsersHandler, LoginHandler, RegisterHandler } from './user.options';

export const getUsersHandler: GetUsersHandler = async (request, reply) => {
  try {
    return await prisma.user.findMany({
      select: { id: true, email: true, name: true },
    });
  } catch (err) {
    console.error(err);
    if (typeof err === 'string') return reply.internalServerError(err);
    return reply.internalServerError('Server error');
  }
};

export const registerHandler: RegisterHandler = async (request, reply) => {
  const { email, name, password } = request.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) return reply.badRequest('Email already exists');

    const { hash, salt } = hashPassword(password);

    const newUser = await prisma.user.create({
      data: { email, name, password: hash, salt },
    });

    return reply.code(201).send(newUser);
  } catch (err) {
    console.error(err);
    if (typeof err === 'string') return reply.internalServerError(err);
    return reply.internalServerError('Server error');
  }
};

export const loginHandler: LoginHandler = async (request, reply) => {
  const { email, password: candidatePassword } = request.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user == null) return reply.badRequest('Invalid credentials');
    const correctPassword = verifyPassword({
      candidatePassword,
      salt: user.salt,
      hash: user.password,
    });
    if (!correctPassword) return reply.badRequest('Invalid credentials');
    return await reply
      .jwtSign({}, { sign: { sub: `${user.id}`, expiresIn: '30d' } })
      .then((accessToken) => ({ accessToken }));
  } catch (err) {
    console.error(err);
    if (typeof err === 'string') return reply.internalServerError(err);
    return reply.internalServerError('Server error');
  }
};
