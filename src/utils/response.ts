import { Response } from "express";

export const response = (res: Response, statusCode: number, message: string, data?: any) => {
	res.status(statusCode).json({
		statusCode,
		message,
		data,
	});
};
