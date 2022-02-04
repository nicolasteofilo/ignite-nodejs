/* eslint-disable no-use-before-define */
import { Category } from '../../entities/Category';
import {
  ICaterogiesRepository,
  ICreateCategoryDTO,
} from '../ICaterogiesRepository';

// Singleton Pattern - criar apenas uma istancia de uma classe que vai ser uma instancia global para a nossa aplicação

class CategoriesRepository implements ICaterogiesRepository {
  private categories: Category[];

  private static INSTANC: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getIntance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANC) {
      CategoriesRepository.INSTANC = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANC;
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
    console.log('create', this.categories);

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
