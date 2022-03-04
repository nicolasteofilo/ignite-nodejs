import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

import { AppError } from '../../../errors/AppError';

export async function ensureAnthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, authConfig.secret_refresh_token);

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      String(userId),
      token
    );

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: String(userId),
    };
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
