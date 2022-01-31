import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoryUseCase } from './ListCategoriesUseCase';

const categoriesRepository = new CategoriesRepository();
const ListCateregoryUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoryController = new ListCategoriesController(
  ListCateregoryUseCase
);

export { listCategoryController };
