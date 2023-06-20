import { NextFunction, Request, Response } from 'express';
import * as authAdminService from './auth.admin.service';

export const loginAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    authAdminService.loginAdmin(req.body.username, req.body.password);
  } catch (error) {
    next(error);
  }
};
