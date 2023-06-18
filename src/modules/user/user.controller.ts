/* This is the Controller. All internal logic should be here.
 * Bleeding the logic to other areas will make
 * working with business logic unmaintainable. Beware!
 * Further reading: Developer Documentation.
 */

import * as userService from './user.service';

import { NextFunction, Request, Response } from 'express';
import { userFieldIsValid, userUuidIsValid } from './user.validation';
import { Field, Order } from '../../utilities/types';
import { clientErrResponseHandler, responseHandler } from '../../utilities/responseHandler';
import { Prisma } from '@prisma/client';

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
    responseHandler(res, data, 201);
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
    const data = await userService.deleteUserByUuid(uuid);
    responseHandler(res, data, 204);
  } catch (error) {
    clientErrResponseHandler(res, error);
  }
};

export const updateUserByUuid = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    clientErrResponseHandler(res, error);
  }
};
