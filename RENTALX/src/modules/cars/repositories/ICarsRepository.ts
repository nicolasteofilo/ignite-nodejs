import { ICreateCarTDO } from '../dtos/ICreateCarTDO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarTDO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAvailable(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]>;
}
