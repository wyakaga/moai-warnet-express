import "dotenv/config";
import express from "express";

import router from "./src/routers";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at port ${PORT}`);
});
