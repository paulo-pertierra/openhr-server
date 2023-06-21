import { ErrorRequestHandler } from 'express';
import { clientErrResponseHandler, serverErrResponseHandler } from '../utilities/responseHandler';
import { Prisma } from '@prisma/client';
import { AuthError } from '../modules/auth/auth.errors';

export const prismaErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code.match('P2002')) {
      const message = `The ${error?.meta?.target} should be unique. `;
      clientErrResponseHandler(res, { message }, 400);
      return;
    }
    if (error.code.match('P2025')) {
      clientErrResponseHandler(
        res,
        { code: error.code, message: 'You were trying to edit a record that does not exist.' },
        422
      );
      return;
    }
    serverErrResponseHandler(res, {
      code: error.code,
      message:
        'Congrats! You found a new PrismaClientKnownRequestError. Tell the admins about it so they can catch it. For now it is an error 500'
    });
    return;
  }
  next(error);
  return;
};

export const genericErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof AuthError) {
    clientErrResponseHandler(res, error.message, 403);
  }
  serverErrResponseHandler(res, error.message);
  return;
};
