import { Router } from 'express';
import { ensureAdmin } from 'middlewares/ensureAdmin';
import { ensureAnthenticated } from 'middlewares/ensureAuthenticated';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificatioControler } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificatioControler();

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

export { carsRoutes };
