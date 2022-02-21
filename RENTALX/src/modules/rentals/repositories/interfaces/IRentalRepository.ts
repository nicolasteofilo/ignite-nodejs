import { Rental } from '../../infra/typeorm/entities/Rental';

interface IRentalRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalTDO): Promise<Rental>;
}

export { IRentalRepository };
