/*
 * This is the Controller. All HTTP Request logic should be here, including validations and error handling.
 * No business logic as much as possible, state changes and business logic is in the services, eg. Calculating time of work.
 * Further reading: Developer Documentation.
 */

import * as setupService from './setup.service';

import { NextFunction, Request, Response } from 'express';
import { clientErrResponseHandler, responseHandler } from '../../utilities/responseHandler';
import { Prisma, User } from '@prisma/client';
import type { Order } from '../../utilities/types';

export const countAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    responseHandler(res, { isSetup: await setupService.countAdmin() });
  } catch (error) {
    next(error);
  }
};
