import { ICreateUserDTO } from "../../dtos/ICreateUserTDO";
import { IUsersRepository } from "../IUsersRepository";
import { Repository, getRepository } from 'typeorm'
import { User } from "../../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    async create({ name, email, password, driver_license, username }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            email,
            driver_license,
            password,
        })

        await this.repository.save(user)
    }
}

export { UsersRepository }