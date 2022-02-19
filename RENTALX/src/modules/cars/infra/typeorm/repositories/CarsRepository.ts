import { getRepository, Repository } from 'typeorm';

import { ICreateCarTDO } from '@modules/cars/dtos/ICreateCarTDO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
  }: ICreateCarTDO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async findAvailable(
    name?: string,
    category_id?: string,
    brand?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true }); // where available = true

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }
}

export { CarsRepository };
