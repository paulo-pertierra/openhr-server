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

export const eventRouter = Router();

eventRouter.get('/', eventController.getAllEvents);
eventRouter.post('/', eventValidation.validateEventData, eventController.createEvent);
eventRouter.post('/user/:uuid', (req: Request, res: Response) => {
  responseHandler(res, { message: 'Yep, in construction!' });
});
