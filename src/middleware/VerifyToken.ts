import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
	token: any;
}

export const verivyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;
	console.log("ada", token);

	if (token === null) {
		return res.send("token tidak valid!");
	}

	try {
		const tokenValidate: any = jwt.verify(token, "supersecret");
		(req as CustomRequest).token = tokenValidate;

		console.log(tokenValidate);
		if (tokenValidate.sttus === "register") {
			return res.send("mohon verifikasi email!");
		}

		next();
	} catch (error) {
		return res.send("anda tidak ");
	}
};
