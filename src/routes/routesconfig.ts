import { Application, Router } from 'express';
import { apiRouter } from './apiroutes';
import { keepAliveRoute } from './keepalive';
import { authRouter } from './authroutes';
export function configureRoutes(app: Application) {
  app.use('/api', apiRouter);
  app.use('/ping', keepAliveRoute);
  app.use('/auth', authRouter)
}
