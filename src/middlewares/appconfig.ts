import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

export function configureMiddlewares(app: Application) {
  app.use(morgan('common'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
}
