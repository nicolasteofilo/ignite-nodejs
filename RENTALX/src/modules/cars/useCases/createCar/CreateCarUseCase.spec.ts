import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('shoud be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Fusca',
      description: 'Carro de luxo',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 10,
      brand: 'VW',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('shoud not be able to create a car with exists license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Fusca 1',
        description: 'Carro de luxo',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 10,
        brand: 'VW',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Fusca 2',
        description: 'Carro de luxo',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 10,
        brand: 'VW',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to register the car with availability true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Fusca 2',
      description: 'Carro de luxo',
      daily_rate: 100,
      license_plate: 'ABC-1235',
      fine_amount: 10,
      brand: 'VW',
      category_id: 'category',
    });
    expect(car.available).toBe(true);
  });
});
