import { Router } from 'express';

import { ResetPasswordController } from '@modules/accounts/useCases/resetPasswordUseCase/ResetPasswordContrller';
import { SendForgotPassWordMailController } from '@modules/accounts/useCases/sendForgotPassWordMail/SendForgotPassWordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPassWordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
