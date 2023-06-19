import { Request, Response } from 'express';
import * as eventService from './event.service';
import { responseHandler } from '../../utilities/responseHandler';

export const getAllEvents = (req: Request, res: Response) => {
  responseHandler(res, eventService.findAllEvents());
  return;
};

export const createEvent = (req: Request, res: Response) => {
  responseHandler(res, eventService.createEvent(req.body));
};
