import { Router } from 'express';

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authnticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authnticateRoutes.post('/sessions', authenticateUserController.handle);

export { authnticateRoutes };
