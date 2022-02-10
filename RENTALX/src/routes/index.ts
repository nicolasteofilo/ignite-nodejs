import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { specificationsRoutes } from './specificatios.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);

export { router };
