import { NextFunction, Request, Response } from "express";
import { getUserPinService } from "../services/Auth.service";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail";
import { UpdateMailController } from "../services/ChangeMail.service";

export type JWTPayload = {
	id_user: string;
	pin: string;
	newEmail: string;
};

export const ChangeMailConfirmController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const makeToken = await getUserPinService(req.params.id_user);
		if (makeToken === null) {
			throw new Error("user tidak ada");
		}

		const signToken = jwt.sign(
			{
				id_user: req.params.id_user,
				pin: makeToken.mailer?.pin,
				newEmail: req.body.email,
			},
			"supersecret",
			{ noTimestamp: true }
		);

		const link = `http://localhost:3001/api/auth/change-email/verivy/${signToken}`;

		const rest = await sendMail(link, makeToken.mailer?.email);
		console.log(rest);
	} catch (error) {
		console.log(error);
	}
};

export const ChangeMailVerifyController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token: any = jwt.verify(req.params.token, "supersecret");
		console.log(token.id_user);

		// Validasi
		const getMailer = await getUserPinService(token.id_user);
		console.log(getMailer);

		if (getMailer === null) {
			return res.send("kode token tidak valid");
		}

		if (getMailer.mailer?.pin !== token.pin) {
			return res.send("kode token kadaluarsa atau sudah digunakan");
		}
		// End Validasi

		// Sukses Validasi
		const respon = await UpdateMailController(token);

		console.log(respon);
	} catch (error) {
		console.log(error);
	}
};
