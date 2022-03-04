import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPassWordMailUseCase } from './SendForgotPassWordMailUseCase';

export class SendForgotPassWordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPassWordMailUseCase = container.resolve(
      SendForgotPassWordMailUseCase
    );

    await sendForgotPassWordMailUseCase.execute(email);

    return response.json({ message: 'ok' });
  }
}
