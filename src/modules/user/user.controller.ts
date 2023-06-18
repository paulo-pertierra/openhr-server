/*
 * This is the Controller. All HTTP Request logic should be here, including validations and error handling.
 * No business logic as much as possible, state changes and business logic is in the services, eg. Calculating time of work.
 * Further reading: Developer Documentation.
 *
 */

import * as userService from './user.service';

import { NextFunction, Request, Response } from 'express';
import { userFieldIsValid, userUuidIsValid } from './user.validation';
import { Field, Order } from '../../utilities/types';
import { clientErrResponseHandler, responseHandler } from '../../utilities/responseHandler';
import { Prisma, User } from '@prisma/client';

export const getUsers = async (req: Request, res: Response) => {
  if (userFieldIsValid(req.query.sortby as unknown as Field)) {
    const field: Field = req.query.sortby as Field;
    const order: Order = req.query.order as Order;

    responseHandler(res, await userService.sortUsersBy(field, order));
  } else {
    responseHandler(res, await userService.findAllUsers());
  }
};

export const getUserByUuid = async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  if (userUuidIsValid(uuid)) responseHandler(res, await userService.findUserByUuId(uuid));
  else clientErrResponseHandler(res, { error: 'UUID is invalid.' });
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.createUser(req.body);
    responseHandler(res, { message: 'Success!' }, 201);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        error.message = `The ${error.name} should be unique. `;
        clientErrResponseHandler(res, { error }, 400);
        return;
      }
    }
    clientErrResponseHandler(res, { error }, 422);
  }
  return;
};

export const deleteUserByUuid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
    await userService.deleteUserByUuid(uuid);
    responseHandler(res, { message: 'Success!' }, 204);
  } catch (error) {
    clientErrResponseHandler(res, error);
  }
};

export const updateUserByUuid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
    if (userUuidIsValid(uuid)) await userService.updateUserByUuid(req.body as User, uuid);
    responseHandler(res, { message: 'Success!' });
  } catch (error) {
    clientErrResponseHandler(res, error);
  }
};
