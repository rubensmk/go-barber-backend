/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAnthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentscontroller = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentscontroller.create);

export default appointmentsRouter;
