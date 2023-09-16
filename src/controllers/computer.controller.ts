import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

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

const readAll = async (req: Request, res: Response) => {
	try {
		let order: Prisma.ComputerOrderByWithRelationInput = { id: "asc" };

		if (req.query.order === "asc") {
			order = { computerNumber: "asc" };
		}

		if (req.query.order === "desc") {
			order = { computerNumber: "desc" };
		}
		const group = String(req.query.group).toLowerCase() === "true" ? true : false;
		const limit = Number(req.query.limit) || 10;
		const page = Number(req.query.page) || 1;
		const skip = page === 1 ? 0 : (page - 1) * limit;

		const result = await prisma.computer.findMany({
			where: {
				isUsed: group,
			},
			orderBy: order,
			take: limit,
			skip,
		});

		const count = await prisma.computer.count({
			where: {
				isUsed: group,
			},
		});

		const totalPages = Math.ceil(count / limit);
		const nextPage = page < totalPages ? page + 1 : null;
		const prevPage = page > 1 ? page - 1 : null;

		const meta = {
			totalItems: count,
			totalPages,
			currentPage: page,
			nextPage: nextPage ? `${req.protocol}://${req.headers.host}?page=${nextPage}` : null,
			prevPage: prevPage ? `${req.protocol}://${req.headers.host}?page=${prevPage}` : null,
		};

		response(res, 200, "OK", { result, meta });
	} catch (error) {
		console.log(error);
		response(res, 500, "Internal Server Error", (error as Error).message);
	}
};

const readSingle = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const data = await prisma.computer.findUnique({
			where: { id },
		});

		response(res, 200, "OK", data);
	} catch (error) {
		console.log(error);
		response(res, 500, "Internal Server Error", (error as Error).message);
	}
};

const update = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { isUsed, userId } = req.body;

		const checkComputer = await prisma.computer.findUnique({ where: { id } });

		if (!checkComputer) return response(res, 400, "No such computer exist!");

		const updatedData = {
			isUsed: String(isUsed).toLowerCase() === "true" ? true : false,
			userId: String(userId),
		};

		const data = await prisma.computer.update({
			where: { id },
			data: updatedData,
		});

		response(res, 200, "Updated successfully!", data);
	} catch (error) {
		console.log(error);
		response(res, 500, "Internal Server Error", (error as Error).message);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const checkComputer = await prisma.computer.findUnique({ where: { id } });

		if (!checkComputer) return response(res, 400, "No such computer exist!");

		const data = await prisma.computer.delete({ where: { id } });

		response(res, 200, "Deleted successfully", data);
	} catch (error) {
		console.log(error);
		response(res, 500, "Internal Server Error", (error as Error).message);
	}
};

export default { create, readAll, readSingle, update, destroy };
