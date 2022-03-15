import { inject, injectable } from 'tsyringe';

import { IUserResponseTDO } from '@modules/accounts/dtos/IUserResponseTDO';
import { UserMap } from '@modules/accounts/mappers/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(userId: string): Promise<IUserResponseTDO> {
    const user = await this.usersRepository.findById(userId);

    return UserMap.toTDO(user);
  }
}
