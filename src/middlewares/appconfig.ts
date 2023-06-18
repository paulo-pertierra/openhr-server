import express, { Application } from 'express';
import morgan from 'morgan';

export function configureMiddlewares(app: Application) {
  app.use(morgan('common'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
}
