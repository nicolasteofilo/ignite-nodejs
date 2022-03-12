import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  userId: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ avatar_file, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    console.log(user.avatar);
    // if (user.avatar !== undefined) {
    //   await this.storageProvider.delete(user.avatar, 'avatar');
    // }
    console.log('passou do if');
    await this.storageProvider.save(avatar_file, 'avatar');
    console.log('passou do if');

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
