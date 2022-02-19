import { Router } from 'express';
import { ensureAdmin } from 'middlewares/ensureAdmin';
import { ensureAnthenticated } from 'middlewares/ensureAuthenticated';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  '/',
  ensureAnthenticated,
  ensureAdmin,
  createCarController.handle
);

export { carsRoutes };
