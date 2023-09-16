import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

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

const readAll = async (req: Request, res: Response) => {
	try {
		const { search = "" } = req.query;

		let order: Prisma.UserOrderByWithRelationInput = { username: "asc" };

		if (req.query.order === "poor") {
			order = { balance: "asc" };
		}

		if (req.query.order === "rich") {
			order = { balance: "desc" };
		}

		const limit = Number(req.query.limit) || 10;
		const page = Number(req.query.page) || 1;
		const skip = page === 1 ? 0 : (page - 1) * limit;

		const result = await prisma.user.findMany({
			where: {
				username: {
					contains: String(search),
					mode: "insensitive",
				},
			},
			orderBy: order,
			take: limit,
			skip,
		});

		const count = await prisma.user.count({
			where: {
				username: {
					contains: String(search),
					mode: "insensitive",
				},
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

		const data = await prisma.user.findUnique({
			where: {
				id,
			},
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
		const { hour } = req.body;

		const checkUser = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!checkUser) {
			return response(res, 400, "No such user exist!");
		}

		const price = Number(hour) * 3000;

		const updatedData = {
			balance: checkUser.balance - price,
		};

		const data = await prisma.user.update({
			where: {
				id,
			},
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

		const checkUser = await prisma.user.findUnique({
			where: { id },
		});

		if (!checkUser) return response(res, 400, "No such user exist!");

		const data = await prisma.user.delete({
			where: { id },
		});

		response(res, 200, "Deleted succesfully!", data);
	} catch (error) {
		console.log(error);
		response(res, 500, "Internal Server Error", (error as Error).message);
	}
};

export default { create, readAll, readSingle, update, destroy };
