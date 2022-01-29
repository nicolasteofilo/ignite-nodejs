import { Request, Response, Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRouter = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({
    name,
    description,
  });

  return response.status(201).json({ messge: 'Category created successfully' });
});

categoriesRouter.get('/', (request: Request, response: Response) => {
  const all = categoriesRepository.list();

  if (all.length === 0) {
    return response.status(204).json({ message: 'No categories found' });
  }

  return response.status(200).json(all);
});

export { categoriesRouter };
