/* eslint-disable no-shadow */
import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAnthenticated';
import UploadConfig from '@config/upload';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import UsersController from '@modules/users/infra/http/controllers/UsersController';

const UsersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(UploadConfig);

UsersRouter.post('/', usersController.create);

UsersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);
export default UsersRouter;
