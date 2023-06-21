import { NextFunction, Request, Response } from 'express';
import { validateAdminToken, validateAllToken } from '../middlewares/tokenHandler';
import { clientErrResponseHandler } from '../utilities/responseHandler';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (typeof authHeader !== 'undefined') {
    const jwt = authHeader.split(' ')[1];
    try {
      const user = validateAllToken(jwt);
      console.log(user);
      next();
      return;
    } catch (error) {
      clientErrResponseHandler(res, error, 403);
      return;
    }
  } else {
    clientErrResponseHandler(res, 'You are not logged in.', 403);
    return;
  }
};
