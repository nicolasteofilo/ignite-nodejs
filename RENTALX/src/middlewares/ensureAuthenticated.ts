import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

export async function ensureAnthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, '484f1c5d540e55294143e3d476346509');

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(String(userId));

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: user.id,
    };
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
