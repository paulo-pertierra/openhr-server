/**
 * Routes handle which URI will work on specific controllers, while doing auth and validation checks.
 * Remember to never clutter this with unnecessary coode. Keep the implementation
 * as clean as possible, by decoupling middleware functions to other files. E.g. validation.
 * Further reading: Developer Documentation.
 */
import { Router } from 'express';

import * as timeController from './time.controller';
import * as timeValidation from './time.validation';
import * as authHandler from '../../middlewares/authHandler'
import { genericErrorHandler, prismaErrorHandler } from '../../middlewares/errorHandler';

export const timeRouter = Router();

timeRouter.get('/', authHandler.isLoggedIn, timeController.getTimes, prismaErrorHandler, genericErrorHandler);
timeRouter.post('/:uuid', timeController.recordTime, prismaErrorHandler, genericErrorHandler);
