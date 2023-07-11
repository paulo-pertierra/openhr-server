import { NextFunction, Request, Response } from 'express';
import * as scheduleService from './schedule.service';
import { responseHandler } from '../../utilities/responseHandler';
import { ScheduleType, Status } from '@prisma/client';

export const getSchedulesByMonth = async (req: Request, res: Response) => {
  responseHandler(res, await scheduleService.findManySchedulesMonthly());
  return;
};

export const getSchedulesByYear = async (req: Request, res: Response) => {
  responseHandler(res, await scheduleService.findManySchedulesYearly());
};

export const getSchedulesByUserUuid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    responseHandler(res, await scheduleService.findManySchedulesByUserUuid(req.params.userUuid));
  } catch (error) {
    next(error);
  }
}

export const createSchedule = async (req: Request, res: Response) => {
  responseHandler(
    res,
    await scheduleService.createSchedule({
      title: req.body.title as string,
      description: req.body.description as string,
      scheduleType: req.body.scheduleType as ScheduleType,
      start: req.body.start,
      end: req.body.end,
      allDay: req.body.allDay,
      userUuid: req.params.userUuid,
      status: 'Pending'
    })
  );
};

export const answerSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    responseHandler(
      res,
      await scheduleService.updateScheduleByUuid(req.query.status as Status, req.params.id)
    );
  } catch (error) {
    next(error);
  }
};
