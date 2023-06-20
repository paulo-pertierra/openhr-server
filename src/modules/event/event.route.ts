/**
 * Routes handle which URI will work on specific controllers, while doing auth and validation checks.
 * Remember to never clutter this with unnecessary coode. Keep the implementation
 * as clean as possible, by decoupling middleware functions to other files. E.g. validation.
 * Further reading: Developer Documentation.
 */
import { Router, Request, Response } from 'express';

import * as eventController from './event.controller';
import * as eventValidation from './event.validation';
import { responseHandler } from '../../utilities/responseHandler';
import { genericErrorHandler, prismaErrorHandler } from '../../middlewares/errorHandler';

export const eventRouter = Router();

eventRouter.get('/', eventController.getAllEvents, prismaErrorHandler, genericErrorHandler);
eventRouter.post(
  '/',
  eventValidation.validateEventData,
  eventController.createEvent,
  prismaErrorHandler,
  genericErrorHandler
);
eventRouter.post('/user/:uuid', (req: Request, res: Response) => {
  responseHandler(res, { message: 'Yep, in construction!' });
});
