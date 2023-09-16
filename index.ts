import "dotenv/config";
import express from "express";
import morgan from "morgan";

import mainRouter from "./src/routers";

const app = express();
const PORT = 8080;

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at port ${PORT}`);
});
