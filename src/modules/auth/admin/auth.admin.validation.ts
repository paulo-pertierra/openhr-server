import { Request, Response, NextFunction } from 'express';

import { check, validationResult } from 'express-validator';
import { clientErrResponseHandler } from '../../../utilities/responseHandler';
export const validateAdminLoginData = [
  check('username').notEmpty().withMessage('Username is required.'),
  check('password').notEmpty().withMessage('Password is required.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      clientErrResponseHandler(res, errors, 422);
    }
    next();
  }
];