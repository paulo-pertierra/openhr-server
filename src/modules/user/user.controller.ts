/*
 * This is the Controller. All HTTP Request logic should be here, including validations and error handling.
 * No business logic as much as possible, state changes and business logic is in the services, eg. Calculating time of work.
 * Further reading: Developer Documentation.
 */

import * as userService from './user.service';

import { NextFunction, Request, Response } from 'express';
import { userFieldIsValid, userUuidIsValid } from './user.validation';
import { clientErrResponseHandler, responseHandler } from '../../utilities/responseHandler';
import { Prisma, User } from '@prisma/client';
import type { Order } from '../../utilities/types';
import type { Field } from './user.types';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (userFieldIsValid(req.query.sortby as unknown as Field)) {
      const field: Field = req.query.sortby as Field;
      const order: Order = req.query.order as Order;
  
      responseHandler(res, await userService.findAllUsersAndSortBy(field, order));
      return;
    }
    if (userFieldIsValid(req.query.filterby as unknown as Field)) {
      const field: Field = req.query.filterby as Field;
      const value: string = req.query.value as string;
      responseHandler(res, await userService.findUsersByFilter(field, value));
      return;
    }
    responseHandler(res, await userService.findAllUsers());
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const getUserByUuid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
    if (userUuidIsValid(uuid)) responseHandler(res, await userService.findUserByUuId(uuid));
    else clientErrResponseHandler(res, { error: 'UUID is invalid.' });
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.createUser(req.body);
    responseHandler(res, { message: 'Success!' }, 201);
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const deleteUserByUuid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
    await userService.deleteUserByUuid(uuid);
    responseHandler(res, { message: 'Success!' }, 204);
    return;
  } catch (error) {
    clientErrResponseHandler(res, error);
    return;
  }
};

export const updateUserByUuid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
    if (userUuidIsValid(uuid)) await userService.updateUserByUuid(req.body as User, uuid);
    responseHandler(res, { message: 'Success!' });
    return;
  } catch (error) {
    next(error);
    return;
  }
};
