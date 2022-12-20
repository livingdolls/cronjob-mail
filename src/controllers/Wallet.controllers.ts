import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
	CreateWalletService,
	GetWalletService,
} from "../services/Wallet.service";

export const CreateWalletController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log(req.cookies.token);
		if (req.cookies.token === null) {
			res.send("akses dilarang");
		}

		const getUser: any = jwt.decode(req.cookies.token);
		const data = { userId: getUser.userId, amount: req.body.amount };

		const respon = await CreateWalletService(data);
		console.log(respon);
	} catch (error) {}
};

export const GetWalletController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log(req.cookies.token);
		if (req.cookies.token === null) {
			res.send("akses dilarang");
		}

		const getUser: any = jwt.decode(req.cookies.token);

		const respon = await GetWalletService(getUser.userId);
		console.log(respon);
	} catch (error) {
		res.send(error);
	}
};
