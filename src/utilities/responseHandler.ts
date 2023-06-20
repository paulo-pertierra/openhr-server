import { Response } from 'express';

export function responseHandler(res: Response, data: any, status = 200) {
  res.status(status).json({ data });
}

export function clientErrResponseHandler(res: Response, error: any, status = 400) {
  res.status(status).json({ data: { error } });
}

export function serverErrResponseHandler(res: Response, error: any, status = 500) {
  res.status(status).json({ data: { error } });
}
