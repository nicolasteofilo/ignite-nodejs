import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const avatar_file = null;

    await updateUserAvatarUseCase.execute({
      userId: id,
      avatar_file,
    });

    return response.status(204).json({ message: 'Avatar updated' });
  }
}

export { UpdateUserAvatarController };
