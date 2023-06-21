/**
 * Routes handle which URI will work on specific controllers, while doing auth and validation checks.
 * Remember to never clutter this with unnecessary coode. Keep the implementation
 * as clean as possible, by decoupling middleware functions to other files. E.g. validation.
 * Further reading: Developer Documentation.
 */
import { Router, Request, Response } from 'express';

import * as authAdminController from './auth.user.controller';
import * as authUserValidation from './auth.user.validation';
import { genericErrorHandler, prismaErrorHandler } from '../../../middlewares/errorHandler';

export const authUserRouter = Router();

authUserRouter.post(
  '/login',
  authUserValidation.validateUserLoginData,
  authAdminController.loginUser,
  prismaErrorHandler,
  genericErrorHandler
);
