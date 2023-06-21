import { NextFunction, Request, Response } from 'express';
import * as authUserService from './auth.user.service';
import { responseHandler } from '../../../utilities/responseHandler';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = await authUserService.loginUser(req.body.username, req.body.password);
    responseHandler(res, credentials);
  } catch (error) {
    next(error);
  }
};
