import { Router } from "express";
import * as userController from "./user.controller"
import { responseHandler, clientErrResponseHandler, serverErrResponseHandler } from "../../utilities/responseHandler";

export const userRouter = Router();

import { Field, Order } from "../../utilities/types";

userRouter.get("/", async (req, res, next) => {
  const data = await userController.sortUsersBy(req.query.sortby as Field, req.query.order as Order);
  return responseHandler(res, data);
});

userRouter.get("/", async (req, res) => {
  const data = await userController.findAllUsers();
  return responseHandler(res, data);
});