import { NextFunction, Request, Response } from "express";
import {
	SignUpService,
	UpdateStatusService,
	UtilSDeleteManyS,
	ValidateUpdateStatusService,
} from "../services/Auth.service";
import { RegisterType, ValidateTokenType } from "../Type/Auth.type";
import { HashString } from "../utils/Hash";

// Pendaftaran user
export const SignUpControllers = async (
	req: Request<{}, {}, RegisterType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { password } = req.body;
		const hashPass = HashString(password);

		const newData = { ...req.body, password: hashPass };
		const respon = await SignUpService(newData);
		console.log(respon);
	} catch (error) {
		console.log(error);
	}
};

// Update Status User (pending, register, verifed)
export const UpdateStatusControllers = async (
	req: Request<ValidateTokenType>,
	res: Response,
	next: NextFunction
) => {
	try {
		// Validasi
		const validate = await ValidateUpdateStatusService(req.params);
		if (validate === null) {
			return res.send("kode verifikasi tidak valid");
		}

		if (validate.status === "expired") {
			return res.send("kode verifikasi kadaluarsa");
		}
		// End Validasi

		const respon = await UpdateStatusService(req.params);

		res.send(respon);
	} catch (error) {
		console.log(error);
	}
};

// Helper
export const UtilSDeleteMany = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// const respon = await UtilSDeleteManyS();
		console.log("pass token");
		// console.log(respon);
	} catch (error) {
		console.log(error);
	}
};
