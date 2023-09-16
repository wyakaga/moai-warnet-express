import { Router } from "express";

import computerController from "../controllers/computer.controller";

const computerRouter: Router = Router();

computerRouter.post("/", computerController.create);
computerRouter.get("/", computerController.readAll);

export default computerRouter;
