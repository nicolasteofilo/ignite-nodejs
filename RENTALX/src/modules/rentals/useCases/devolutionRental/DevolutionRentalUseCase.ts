import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

import { IRentalRepository } from '../../repositories/interfaces/IRentalRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    console.log(rental);

    const minimus_daily = 1;
    const dateNow = this.dateProvider.dateNow();

    const car = await this.carsRepository.findById(rental.car_id);
    console.log(car);

    if (!rental) {
      throw new AppError('Rental not found');
    }

    if (rental.user_id !== user_id) {
      throw new AppError('You can not devolution this rental');
    }

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily < minimus_daily) {
      daily = 1;
    }

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    );

    let totalRental = 0;
    let fine = 0;

    if (delay > 0) {
      const calculateFine = daily * car.fine_amount;
      totalRental = calculateFine;
      fine = calculateFine;
    }

    totalRental += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = totalRental;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
