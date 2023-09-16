import { Router } from "express";

import userController from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/", userController.create);
userRouter.get("/", userController.readAll);

export default userRouter;
