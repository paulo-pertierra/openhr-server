import { NextFunction, Request, Response } from 'express';
import * as authAdminService from './auth.admin.service';

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authAdminService.loginAdmin(req.body.username, req.body.password);
    return;
  } catch (error) {
    next(error);
    return;
  }
};
