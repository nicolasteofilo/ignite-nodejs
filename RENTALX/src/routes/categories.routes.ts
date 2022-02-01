import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();
const upload = multer({
  dest: './tmp',
});

categoriesRouter.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouter.get('/', (request, response) => {
  return listCategoryController.handle(request, response);
});

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
  const { file } = request;
  console.log(file);
  return response.send();
});

export { categoriesRouter };
