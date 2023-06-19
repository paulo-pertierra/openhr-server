/**
 * Routes handle which URI will work on specific controllers, while doing auth and validation checks.
 * Remember to never clutter this with unnecessary coode. Keep the implementation
 * as clean as possible, by decoupling middleware functions to other files. E.g. validation.
 * Further reading: Developer Documentation.
 */
import { Router } from 'express';

import * as eventController from './event.controller';
import * as eventValidation from './event.validation';

export const eventRouter = Router();

eventRouter.get('/', eventController.getAllEvents);
eventRouter.post('/:uuid', eventValidation.validateEventData, eventController.createEvent);
