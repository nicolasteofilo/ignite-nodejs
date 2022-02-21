import { Router } from 'express';
import { ensureAdmin } from 'middlewares/ensureAdmin';
import { ensureAnthenticated } from 'middlewares/ensureAuthenticated';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificatioControler } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadImageController } from '@modules/cars/useCases/uploadImage/UploadCarImagesController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificatioControler();
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
