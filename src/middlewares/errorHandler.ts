import express, { Application, ErrorRequestHandler, NextFunction } from 'express';
import { clientErrResponseHandler, serverErrResponseHandler } from '../utilities/responseHandler';

export const prismaErrorHandler: ErrorRequestHandler = (err, req, res, next) => {};
