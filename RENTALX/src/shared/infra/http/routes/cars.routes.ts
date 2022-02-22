import { Router } from 'express';
import { ensureAnthenticated } from 'middlewares/ensureAuthenticated';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadImageController } from '@modules/cars/useCases/uploadImage/UploadCarImagesController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificationController();
const uploadImageController = new UploadImageController();

const uploadCarImages = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAnthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post(
  '/specifications/:id',
  ensureAnthenticated,
  ensureAdmin,
  createCarSpecification.handle
);

carsRoutes.post(
  '/images/:id',
  ensureAnthenticated,
  ensureAdmin,
  uploadCarImages.array('images'),
  uploadImageController.handle
);

export { carsRoutes };
