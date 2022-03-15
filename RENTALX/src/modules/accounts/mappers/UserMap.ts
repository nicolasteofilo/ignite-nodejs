import { instanceToInstance } from 'class-transformer';

import { IUserResponseTDO } from '../dtos/IUserResponseTDO';
import { User } from '../infra/typeorm/entities/User';

export class UserMap {
  static toTDO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseTDO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}
