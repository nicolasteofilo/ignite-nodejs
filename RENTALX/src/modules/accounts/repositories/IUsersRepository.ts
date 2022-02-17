import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserTDO';
import { User } from '@modules/accounts/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
