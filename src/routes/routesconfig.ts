import { Application, Router } from "express";
import { apiRouter } from "./apiroutes";
export function configureRoutes(app: Application) {
  app.use("/api", apiRouter);
}