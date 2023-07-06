/*
 * This is the Controller. All HTTP Request logic should be here, including validations and error handling.
 * No business logic as much as possible, state changes and business logic is in the services, eg. Calculating time of work.
 * Further reading: Developer Documentation.
 *
 */

import { NextFunction, Request, Response } from 'express';
import * as eventService from './event.service';
import { responseHandler } from '../../utilities/responseHandler';

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    responseHandler(res, await eventService.findAllEvents());
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    responseHandler(res, await eventService.createEvent(req.body));
  } catch (error) {
    next(error);
  }
};
