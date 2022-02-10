import { ICreateUserDTO } from "../dtos/ICreateUserTDO";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>
}

export { IUsersRepository };