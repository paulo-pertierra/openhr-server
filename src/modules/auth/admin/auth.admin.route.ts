/**
 * Routes handle which URI will work on specific controllers, while doing auth and validation checks.
 * Remember to never clutter this with unnecessary coode. Keep the implementation
 * as clean as possible, by decoupling middleware functions to other files. E.g. validation.
 * Further reading: Developer Documentation.
 */
import { Router, Request, Response } from 'express';

import * as authAdminController from './auth.admin.controller';
import * as authAdminValidation from './auth.admin.validation';
import { responseHandler } from '../../../utilities/responseHandler';
import { genericErrorHandler, prismaErrorHandler } from '../../../middlewares/errorHandler';

export const authAdminRouter = Router();

authAdminRouter.post(
  '/login',
  authAdminValidation.validateAdminLoginData,
  authAdminController.loginAdmin,
  prismaErrorHandler,
  genericErrorHandler
);

authAdminRouter.post('/createAdmin', (req: Request, res: Response) => {
  responseHandler(res, { message: 'Yep, in construction!' });
});
