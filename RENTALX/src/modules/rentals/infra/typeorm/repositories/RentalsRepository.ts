import { getRepository, Repository } from 'typeorm';

import { ICreateRentalTDO } from '@modules/rentals/dtos/ICreateRentalTDO';
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
    id,
    end_date,
    total,
  }: ICreateRentalTDO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return openByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.repository.find({
      where: { user_id },
    });
    return rentalsByUser;
  }
}

export { RentalsRepository };
