import { Router } from 'express';

import { userRouter } from '../modules/user/user.route';
import { timeRouter } from '../modules/time/time.route';
import { eventRouter } from '../modules/event/event.route';

import { authAdminRouter } from '../modules/auth/admin/auth.admin.route';
import { authUserRouter } from '../modules/auth/user/auth.user.router';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/times', timeRouter);
apiRouter.use('/events', eventRouter);
apiRouter.use('/auth', authAdminRouter);
apiRouter.use('/auth', authUserRouter);