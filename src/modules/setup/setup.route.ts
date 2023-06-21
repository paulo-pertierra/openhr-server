/**
 * Routes handle which URI will work on specific controllers, while doing auth and validation checks.
 * Remember to never clutter this with unnecessary coode. Keep the implementation
 * as clean as possible, by decoupling middleware functions to other files. E.g. validation.
 * Further reading: Developer Documentation.
 */
import { Router, Request, Response } from 'express';

import * as setupController from './setup.controller';
// import * as setupValidation from './setup.validation';
import { responseHandler } from '../../utilities/responseHandler';
import { genericErrorHandler, prismaErrorHandler } from '../../middlewares/errorHandler';

export const setupRouter = Router();

setupRouter.get('/', setupController.countAdmin);
