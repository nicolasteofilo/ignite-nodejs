import { Router } from 'express';

import { ensureAnthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAnthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
