/*
 * This is the Controller. All HTTP Request logic should be here, including validations and error handling.
 * No business logic as much as possible, state changes and business logic is in the services, eg. Calculating time of work.
 * Further reading: Developer Documentation.
 *
 */

import * as timeService from './time.service';

import type { Request, Response, NextFunction } from 'express';
import { timeFieldIsValid, userUuidIsValid } from './time.validation';
import { Field } from './time.types';
import { Order } from '../../utilities/types';
import { clientErrResponseHandler, responseHandler } from '../../utilities/responseHandler';

export const getTimes = async (req: Request, res: Response, next: NextFunction) => {
  if (timeFieldIsValid(req.query.sortby as string)) {
    const field: Field = req.query.sortby as Field;
    const order: Order = req.query.order as Order;
    const date: string = req.query.date as string;
    responseHandler(res, await timeService.sortTimesBy(field, order, date));
    return;
  }
  const date: string = req.query.date as string;
  responseHandler(res, await timeService.getTimes(date));
  return;
};

export const recordTime = async (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  if (userUuidIsValid(uuid)) responseHandler(res, await timeService.recordTime(uuid));
  else clientErrResponseHandler(res, { error: 'UUID is invalid.' });
};
