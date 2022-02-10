import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserTDO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from 'bcryptjs'

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const userAreadyExists = await this.usersRepository.findByEmail(email);

        if(userAreadyExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hash(password, 8)
        await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            driver_license
        })
    }
}

export { CreateUserUseCase }