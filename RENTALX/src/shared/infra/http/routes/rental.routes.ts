import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/devolutionRentalController';

import { ensureAnthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post('/', ensureAnthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAnthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };
