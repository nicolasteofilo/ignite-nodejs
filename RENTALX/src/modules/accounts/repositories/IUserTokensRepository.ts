import { ICreateUserTokenTDO } from '../dtos/ICreateUserTokenTDO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

export interface IUserTokensRepository {
  create(params: ICreateUserTokenTDO): Promise<UserTokens>;
}
