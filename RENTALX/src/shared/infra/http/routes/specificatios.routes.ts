import { Router } from 'express';
import { ensureAdmin } from 'middlewares/ensureAdmin';

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAnthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAnthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
