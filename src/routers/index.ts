import { Request, Response, Router } from "express";

import { response } from "../utils/response";

const mainRouter: Router = Router();

mainRouter.get("/", async (req: Request, res: Response) => {
	response(res, 200, "OK", "Welcome!");
});

export default mainRouter;