import { Router } from 'express';
import { ensureAdmin } from 'middlewares/ensureAdmin';
import { ensureAnthenticated } from 'middlewares/ensureAuthenticated';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAnthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
