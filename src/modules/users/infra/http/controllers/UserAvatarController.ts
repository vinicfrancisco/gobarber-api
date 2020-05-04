import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const udpateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await udpateUserAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
