type scheduleType =
  | 'LvAnnual'
  | 'LvSick'
  | 'LvParental'
  | 'LvBereaved'
  | 'LvPaid'
  | 'LvUnpaid'
  | 'LvSpecial'
  | 'LvMedical'
  | 'LvStudy'
  | 'LvOther'
  | 'ObConference'
  | 'ObBusinessMeeting'
  | 'ObClientMeeting'
  | 'ObSiteVisit'
  | 'ObContract'
  | 'ObTraining'
  | 'ObPresentation'
  | 'ObOther'
  | 'OVERTIME'
  | 'UNDERTIME';

import { check, validationResult } from 'express-validator';
import { clientErrResponseHandler } from '../../utilities/responseHandler';
import { NextFunction, Request, Response } from 'express';

export const validateScheduleData = [
  check('title').notEmpty().withMessage('Title should not be empty.'),
  check('description').optional().isLength({ min: 3, max: 150 }),
  check('scheduleType').notEmpty(),
  check('start').notEmpty().withMessage('Start date is required.').isISO8601(),
  check('end').optional().isISO8601(),
  check('allDay').notEmpty().default(false).isBoolean().withMessage('All day is boolean only.'),
  check('userUuid').notEmpty().isUUID(4),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      clientErrResponseHandler(res, errors, 422);
      return;
    }
    next();
    return;
  }
];
