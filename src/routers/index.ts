import { Request, Response, Router } from "express";

import { response } from "../utils/response";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
	response(res, 200, "OK", "Welcome!");
});

export default router;