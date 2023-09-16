import { Router } from "express";

import computerController from "../controllers/computer.controller";

const computerRouter: Router = Router();

computerRouter.post("/", computerController.create);
computerRouter.get("/", computerController.readAll);
computerRouter.get("/:id", computerController.readSingle);
computerRouter.patch("/:id", computerController.update);

export default computerRouter;
