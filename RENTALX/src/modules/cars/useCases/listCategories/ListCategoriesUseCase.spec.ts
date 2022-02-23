import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoryRepositoryInMemory';

import { ListCategoryUseCase } from './ListCategoriesUseCase';

let listCategoriesUseCase: ListCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('List Categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to list a all categories', async () => {
    await categoriesRepositoryInMemory.create({
      name: 'New Category',
      description: 'New Category Description',
    });

    const categories = await listCategoriesUseCase.execute();

    expect(categories).toHaveLength(1);
  });
});
