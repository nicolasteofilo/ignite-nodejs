import { getRepository, Repository } from 'typeorm';

import { IRentalRepository } from '@modules/rentals/repositories/interfaces/IRentalRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalTDO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ car_id });
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = this.repository.findOne({ user_id });
    return openByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
    });
    return rentals;
  }
}

export { RentalsRepository };
