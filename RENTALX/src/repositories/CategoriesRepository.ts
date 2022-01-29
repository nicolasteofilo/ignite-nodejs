import { Category } from '../model/Category';
import {
  ICaterogiesRepository,
  ICreateCategoryDTO,
} from './ICaterogiesRepository';

class CategoriesRepository implements ICaterogiesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ description, name }: ICreateCategoryDTO): Category {
    const category = new Category();
    console.log('create');

    // atribuindo itens para dentro do meu objeto category
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepository };
