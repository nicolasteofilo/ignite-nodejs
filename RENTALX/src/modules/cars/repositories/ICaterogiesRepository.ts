import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICaterogiesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICaterogiesRepository, ICreateCategoryDTO };
