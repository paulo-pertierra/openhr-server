import { Router } from 'express';
import { authAdminRouter } from '../modules/auth/admin/auth.admin.route';
import { authUserRouter } from '../modules/auth/user/auth.user.route';

export const authRouter = Router();

authRouter.use('/admin', authAdminRouter);
authRouter.use('/user', authUserRouter);
