import { Router } from "express";

import computerController from "../controllers/computer.controller";

const computerRouter: Router = Router();

computerRouter.post("/", computerController.create);

export default computerRouter;
