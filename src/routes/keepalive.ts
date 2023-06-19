import { Request, Response } from 'express';
import { responseHandler } from '../utilities/responseHandler';

export function keepAliveRoute(req: Request, res: Response) {
  responseHandler(res, { message: 'pong!' });
}
