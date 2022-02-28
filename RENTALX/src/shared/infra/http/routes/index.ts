import cors from 'cors';
import { Router } from 'express';

import { authnticateRoutes } from './authnticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specificatios.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', cors(), categoriesRouter);
router.use('/specifications', cors(), specificationsRoutes);
router.use('/users', cors(), usersRoutes);
router.use('/cars', cors(), carsRoutes);
router.use('/rentals', cors(), rentalRoutes);
router.use(authnticateRoutes, cors());

export { router };
