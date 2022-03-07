import { ICreateUserTokenTDO } from '../dtos/ICreateUserTokenTDO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

export interface IUserTokensRepository {
  create(params: ICreateUserTokenTDO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}
