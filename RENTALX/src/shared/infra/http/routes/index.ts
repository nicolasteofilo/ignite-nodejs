import { Router } from 'express';

import { authnticateRoutes } from './authnticate.routes';
import { categoriesRouter } from './categories.routes';
import { specificationsRoutes } from './specificatios.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use(authnticateRoutes);

export { router };
