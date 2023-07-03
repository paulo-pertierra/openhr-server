import { Application, Router } from 'express';
import { apiRouter } from './apiroutes';
import { keepAliveRoute } from './keepalive';
import { authRouter } from './authroutes';
import { setupRouter } from '../modules/setup/setup.route';

export function configureRoutes(app: Application) {
  app.use('/api', apiRouter);
  app.use('/ping', keepAliveRoute);
  app.use('/auth', authRouter);
  app.use('/setup', setupRouter);
}
