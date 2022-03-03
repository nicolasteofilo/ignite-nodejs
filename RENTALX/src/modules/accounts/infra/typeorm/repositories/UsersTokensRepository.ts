import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenTDO } from '@modules/accounts/dtos/ICreateUserTokenTDO';
import { IUserTokensRepository } from '@modules/accounts/repositories/IUserTokensRepository';

import { UserTokens } from '../entities/UserTokens';

export class UsersTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenTDO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
