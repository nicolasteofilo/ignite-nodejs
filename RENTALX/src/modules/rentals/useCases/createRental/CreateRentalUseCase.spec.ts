import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const currentDayAddOneDay = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dateProvider,
      carsRepository
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: 'car-98765',
      expected_return_date: currentDayAddOneDay,
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not able to create a new rental if the is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'car-98765',
        expected_return_date: currentDayAddOneDay,
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'car-98764',
        expected_return_date: currentDayAddOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register rental if there is already one open for the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'car-98764',
        expected_return_date: currentDayAddOneDay,
      });

      await createRentalUseCase.execute({
        user_id: '123456',
        car_id: 'car-98764',
        expected_return_date: currentDayAddOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to register a new rental if return time is invalid', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'car-98764',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
