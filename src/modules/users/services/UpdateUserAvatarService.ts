/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '../../../shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
        @inject('StorageProvider') private storageProvider: IStorageProvider,
    ) { } // eslint-disable-line prettier/prettier

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }
        const fileName = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = fileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
