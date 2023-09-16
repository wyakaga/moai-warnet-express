import { Request, Response } from "express";

import prisma from "../configs/prisma.config";
import { response } from "../utils/response";

const create = async (req: Request, res: Response) => {
	try {
		const { username, balance } = req.body;

		const checkUser = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (checkUser) {
			return response(res, 400, "User name should be unique!");
		}

		const newUser = await prisma.user.create({
			data: {
				username,
				balance: parseInt(balance),
			},
		});

		response(res, 201, "User created successfully", newUser);
	} catch (error) {
		console.log(error);
		response(res, 500, "Internal Server Error", (error as Error).message);
	}
};

export default { create };
