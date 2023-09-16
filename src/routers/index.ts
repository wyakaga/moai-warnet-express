import { Request, Response, Router } from "express";

import { response } from "../utils/response";
import userRouter from "./user.router";
import computerRouter from "./computer.router";

const mainRouter: Router = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/computer", computerRouter);

mainRouter.get("/", async (req: Request, res: Response) => {
	response(res, 200, "OK", "Welcome!");
});

export default mainRouter;
