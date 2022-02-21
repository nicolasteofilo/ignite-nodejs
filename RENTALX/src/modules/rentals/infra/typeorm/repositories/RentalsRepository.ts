import { IRentalRepository } from '@modules/rentals/repositories/interfaces/IRentalRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalRepository {
  create(data: ICreateRentalTDO): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
  findOpenRentalByCar(car_id: string): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
  findOpenRentalByUser(user_id: string): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
}

export { RentalsRepository };
