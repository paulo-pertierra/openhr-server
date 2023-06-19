import { Request, Response } from 'express';
import * as eventService from './event.service';
import { responseHandler } from '../../utilities/responseHandler';

export const getAllEvents = async (req: Request, res: Response) => {
  responseHandler(res, await eventService.findAllEvents());
  return;
};

export const createEvent = async (req: Request, res: Response) => {
  responseHandler(res, await eventService.createEvent(req.body));
};
