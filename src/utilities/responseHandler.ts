import { Response } from 'express';

export function responseHandler(res: Response, data: any, status = 200) {
  res.status(status).json({ data });
}

export function clientErrResponseHandler(res: Response, data: any, status = 400) {
  res.status(status).json({ data });
}

export function serverErrResponseHandler(res: Response, data: any, status = 500) {
  res.status(status).json({ data });
}
