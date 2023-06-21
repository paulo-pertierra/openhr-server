import { NextFunction, Request, Response } from 'express';
import * as authAdminService from './auth.admin.service';
import { responseHandler } from '../../../utilities/responseHandler';

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authAdminService.loginAdmin(req.body.username, req.body.password);
    responseHandler(res, data);
    return;
  } catch (error) {
    next(error);
    return;
  }
};
