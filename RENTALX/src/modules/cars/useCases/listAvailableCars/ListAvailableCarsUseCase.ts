import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carRepository: ICarsRepository
  ) {}
  execute({ name, category_id, brand }: IRequest): Promise<Car[]> {
    const cars = this.carRepository.findAvailable(name, category_id, brand);
    return cars;
  }
}

export { ListAvailableCarsUseCase };
