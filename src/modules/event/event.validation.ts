/**
 * In-controller validation
 */

enum Field {
  title,
  description,
  allDay,
  start,
  end
}

export function eventFieldIsValid(fieldInput: string) {
  return Object.values(Field).includes(fieldInput as unknown as Field);
}

import { NextFunction, Request, Response } from 'express';
/**
 * In-route validation
 */

import { check, validationResult } from 'express-validator';
import { clientErrResponseHandler } from '../../utilities/responseHandler';
export const validateEventData = [
  check('title').notEmpty().withMessage('Title should not be empty.').isString(),
  check('description').optional().isString(),
  check('allDay').isBoolean().withMessage('All day value should only be boolean.'),
  check('start').notEmpty().isISO8601().withMessage('Start date or specified date is required.'),
  check('end').optional().isISO8601(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      clientErrResponseHandler(res, errors, 422);
    }
    next();
  }
];
