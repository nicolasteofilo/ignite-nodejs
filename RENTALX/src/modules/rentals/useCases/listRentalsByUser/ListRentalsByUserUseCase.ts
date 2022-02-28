import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalRepository } from '../../repositories/interfaces/IRentalRepository';

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUse = await this.rentalRepository.findByUser(user_id);

    return rentalsByUse;
  }
}

export { ListRentalsByUserUseCase };
