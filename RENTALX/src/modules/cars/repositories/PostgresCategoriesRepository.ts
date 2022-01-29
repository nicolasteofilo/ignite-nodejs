import { Category } from '../model/Category';
import {
  ICaterogiesRepository,
  ICreateCategoryDTO,
} from './ICaterogiesRepository';

// o PostgresCategoriesRepository é um subtipo do ICaterogiesRepository
class PostgresCategoriesRepository implements ICaterogiesRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
  list(): Category[] {
    console.log('list');
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log({
      name,
      description,
    });
  }
}

export { PostgresCategoriesRepository };
