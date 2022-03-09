import { ICreateUserTokenTDO } from '@modules/accounts/dtos/ICreateUserTokenTDO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUserTokensRepository } from '../IUserTokensRepository';

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenTDO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      id: '1',
      user_id,
      expires_date,
      refresh_token,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.userTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.userTokens.splice(userTokenIndex, 1);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userToken;
  }
}
