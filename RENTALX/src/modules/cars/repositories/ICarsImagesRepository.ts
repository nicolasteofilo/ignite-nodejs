import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICreateCarImagesTDO {
  car_id: string;
  images_name: string;
}

interface ICarsImagesRepository {
  create({ car_id, images_name }: ICreateCarImagesTDO): Promise<CarImage>;
}

export { ICarsImagesRepository, ICreateCarImagesTDO };
