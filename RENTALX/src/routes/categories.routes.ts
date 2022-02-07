import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { importCategoriesController } from '../modules/cars/useCases/importCategories';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();
const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
  return importCategoriesController.handle(request, response);
});

export { categoriesRouter };
