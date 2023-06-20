/**
 * Routes handle which URI will work on specific controllers, while doing auth and validation checks.
 * Remember to never clutter this with unnecessary coode. Keep the implementation
 * as clean as possible, by decoupling middleware functions to other files. E.g. validation.
 * Further reading: Developer Documentation.
 *
 */

import { Router } from 'express';
import * as userController from './user.controller';
import * as userValidation from './user.validation';
import { prismaErrorHandler, genericErrorHandler } from '../../middlewares/errorHandler';

export const userRouter = Router();

userRouter.get('/', userController.getUsers, prismaErrorHandler, genericErrorHandler);
userRouter.get('/:uuid', userController.getUserByUuid, prismaErrorHandler, genericErrorHandler);
userRouter.post(
  '/',
  userValidation.validateCreateUserData,
  userController.createUser,
  prismaErrorHandler,
  genericErrorHandler
);
userRouter.put(
  '/:uuid',
  userValidation.validateEditUserData,
  userController.updateUserByUuid,
  prismaErrorHandler,
  genericErrorHandler
);
userRouter.delete(
  '/:uuid',
  userController.deleteUserByUuid,
  prismaErrorHandler,
  genericErrorHandler
);
