import { Router } from 'express';

import { SendForgotPassWordMailController } from '@modules/accounts/useCases/sendForgotPassWordMail/SendForgotPassWordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPassWordMailController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);

export { passwordRoutes };
