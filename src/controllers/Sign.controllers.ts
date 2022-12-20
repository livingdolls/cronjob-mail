import { NextFunction, Request, Response } from "express";
import { LoginService } from "../services/Login.service";
import { LoginType } from "../Type/Auth.type";
import jwt from "jsonwebtoken";
import { ComparePassword } from "../utils/Hash";

export const SignUserControllers = async (
	req: Request<{}, {}, LoginType>,
	res: Response,
	next: NextFunction
) => {
	try {
		// Check User
		const user = await LoginService(req.body);
		if (user === null) {
			return res.send("email tidak ditemukan!");
		}

		// validasi password
		const cekPass = await ComparePassword(req.body.password, user.password);
		console.log(cekPass);
		if (!cekPass) {
			return res.send("passowd salah!");
		}
		// End Validasi

		// Sign JWT
		const token = jwt.sign(
			{
				userId: user.id_user,
				pin: user.mailer?.pin,
				sttus: user.status,
			},
			"supersecret",
			{ noTimestamp: true }
		);

		res.cookie("token", token, {
			httpOnly: true,
		});

		res.send(token);
	} catch (error) {
		console.log(error);
	}
};
