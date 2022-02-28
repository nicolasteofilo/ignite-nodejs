import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalRepository } from '../interfaces/IRentalRepository';

class RentalsRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalTDO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(), // the database will set this value
    });

    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.rentals.find((rental) => rental.id === id);
    return rental;
  }
}

export { RentalsRepositoryInMemory };
