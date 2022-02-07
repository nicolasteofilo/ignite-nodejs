/* eslint-disable no-use-before-define */
import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import {
  ICaterogiesRepository,
  ICreateCategoryDTO,
} from '../ICaterogiesRepository';

// Singleton Pattern - criar apenas uma istancia de uma classe que vai ser uma instancia global para a nossa aplicação

class CategoriesRepository implements ICaterogiesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    // entida para salvar
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    // SELECT * FROM categories where name = "name" limit 1
    // as {} é como se fosse o WHERE
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
