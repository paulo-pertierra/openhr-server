import { Router } from 'express';

import { userRouter } from '../modules/user/user.route';
import { timeRouter } from '../modules/time/time.route';
import { eventRouter } from '../modules/event/event.route';
export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/times', timeRouter);
apiRouter.use('/events', eventRouter);
