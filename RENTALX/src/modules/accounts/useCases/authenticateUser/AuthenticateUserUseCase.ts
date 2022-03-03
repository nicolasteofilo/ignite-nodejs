import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    const passwordMatched = await compare(
      String(password),
      String(user.password)
    );

    if (!passwordMatched) {
      throw new AppError('Email or password incorrect!');
    }

    const token = sign({}, authConfig.secret_token, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: user.id,
      expiresIn: authConfig.expiresInRefresh,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      authConfig.expiresInRefreshDays
    );

    await this.userTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    const tokenResponse: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };

    return tokenResponse;
  }
}

export { AuthenticateUserUseCase };
