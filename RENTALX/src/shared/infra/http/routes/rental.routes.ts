import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/devolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAnthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAnthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAnthenticated,
  devolutionRentalController.handle
);

rentalRoutes.get(
  '/user',
  ensureAnthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
