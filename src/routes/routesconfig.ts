import { Application, Router } from 'express';
import { apiRouter } from './apiroutes';
import { keepAliveRoute } from './keepalive';
export function configureRoutes(app: Application) {
  app.use('/api', apiRouter);
  app.use('/ping', keepAliveRoute);
}
