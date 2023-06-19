import { Router } from 'express';

import { userRouter } from '../modules/user/user.route';
import { timeRouter } from '../modules/time/time.route';
export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/times', timeRouter);
