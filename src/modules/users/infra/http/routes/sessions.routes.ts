import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();
const sessionscontroller = new SessionsController();

sessionsRouter.post('/', sessionscontroller.create);

export default sessionsRouter;
