/*
 * This is the Controller. All HTTP Request logic should be here, including validations and error handling.
 * No business logic as much as possible, state changes and business logic is in the services, eg. Calculating time of work.
 * Further reading: Developer Documentation.
 *
 */

import * as timeService from './time.service';

import type { Request, Response, NextFunction } from 'express';
import { timeFieldIsValid } from './time.validation';
import { prisma } from '../../utilities/databaseHandler';
import { Field } from './time.types';
import { Order } from '../../utilities/types';
import { responseHandler } from '../../utilities/responseHandler';

export const getTimes = async (req:Request, res:Response, next:NextFunction) => {
  if (timeFieldIsValid(req.query.sortby as string)) {
    const field: Field = req.query.sortby as Field;
    const order: Order = req.query.order as Order;
    
    responseHandler(res, await timeService.sortTimesBy(field, order))
  }
  responseHandler(res, await timeService.getTimes())
}