import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('shoud be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi 58',
      description: 'Audio com 4 portas 58',
      brand: 'Audi',
      category_id: 'category-id',
      daily_rate: 100,
      fine_amount: 100,
      license_plate: 'ABC-2007',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });
  it('shoud be able to list availeble cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi test',
      description: 'Audio com 4 portas 58',
      brand: 'Audi',
      category_id: 'category-id',
      daily_rate: 100,
      fine_amount: 100,
      license_plate: 'ABC-2008',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Audi test',
    });

    expect(cars).toEqual([car]);
  });
  it('shoud be able to list availeble cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi test_2',
      description: 'Audio com 4 portas 58',
      brand: 'Audi',
      category_id: 'category-id',
      daily_rate: 100,
      fine_amount: 100,
      license_plate: 'ABC-2009',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Audi',
    });

    expect(cars).toEqual([car]);
  });
  it('shoud be able to list availeble cars by category id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi test_2',
      description: 'Audio com 4 portas 58',
      brand: 'Audi',
      category_id: 'category-id',
      daily_rate: 100,
      fine_amount: 100,
      license_plate: 'ABC-2009',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category-id',
    });

    expect(cars).toEqual([car]);
  });
});
