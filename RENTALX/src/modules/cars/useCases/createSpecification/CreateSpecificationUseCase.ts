import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);
    console.log('aqui');

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    if (!name || !description) {
      throw new Error('Missing name or description');
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
