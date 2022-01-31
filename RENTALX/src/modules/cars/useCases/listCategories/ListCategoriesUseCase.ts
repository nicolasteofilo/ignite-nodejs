import { Category } from '../../model/Category';
import { ICaterogiesRepository } from '../../repositories/ICaterogiesRepository';

class ListCategoryUseCase {
  constructor(private categoriesRepository: ICaterogiesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoryUseCase };
