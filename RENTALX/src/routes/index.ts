import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { specificationsRoutes } from './specificatios.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRoutes);

export { router };
