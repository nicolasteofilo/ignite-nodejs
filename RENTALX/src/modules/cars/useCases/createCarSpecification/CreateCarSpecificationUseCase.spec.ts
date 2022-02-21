import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeAll(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should not able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specification_id = ['5678'];
      await createCarSpecificationUseCase.execute({
        car_id,
        specification_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fusca 2',
      description: 'Carro de luxo',
      daily_rate: 100,
      license_plate: 'ABC-1235',
      fine_amount: 10,
      brand: 'VW',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Airbag',
      description: 'Airbag para o carro',
    });

    const specification_id = [specification.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(specificationCars).toHaveProperty('specifications');
    expect(specificationCars.specifications.length).toBe(1);
  });
});
