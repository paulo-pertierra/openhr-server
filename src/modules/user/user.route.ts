import { Router } from 'express';
import { check as validator, validationResult } from 'express-validator';
import * as userController from './user.controller';
import * as userValidation from './user.validation';
import {
  responseHandler,
  clientErrResponseHandler,
  serverErrResponseHandler
} from '../../utilities/responseHandler';

export const userRouter = Router();

userRouter.get('/', userController.getUsers);

userRouter.get('/:uuid', userController.getUserByUuid);

userRouter.post('/', userValidation.validateCreateUser, userController.createUser);

userRouter.delete('/:uuid', userController.deleteUserByUuid);
