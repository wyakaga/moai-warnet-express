import { Request, Response } from "express";

import prisma from "../configs/prisma.config";
import { response } from "../utils/response";

const create = async (req: Request, res: Response) => {
	try {
		const { computerNumber, isUsed } = req.body;

		const checkComputer = await prisma.computer.findUnique({
			where: { computerNumber: Number(computerNumber) },
		});

		if (checkComputer) return response(res, 400, "Computer number must be unique!");

		const data = await prisma.computer.create({
			data: {
				computerNumber: Number(computerNumber),
				isUsed: isUsed.toLowerCase() === "true" ? true : false,
			},
		});

		response(res, 200, "Created successfully", data);
	} catch (error) {
		console.log(error);
		response(res, 500, "Internal Server Error", (error as Error).message);
	}
};

export default { create };
