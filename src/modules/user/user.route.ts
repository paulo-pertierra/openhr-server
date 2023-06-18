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

export const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:uuid', userController.getUserByUuid);
userRouter.post('/', userValidation.validateUserData, userController.createUser);
userRouter.put('/:uuid', userValidation.validateUserData, userController.updateUserByUuid);
userRouter.delete('/:uuid', userController.deleteUserByUuid);
