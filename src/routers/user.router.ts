import { Router } from "express";

import userController from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/", userController.create);
userRouter.get("/", userController.readAll);
userRouter.get("/:id", userController.readSingle);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.destroy);

export default userRouter;
