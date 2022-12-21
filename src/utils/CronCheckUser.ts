import cron from "node-cron";
import {
	CheckStatusUser,
	ExpiredPinService,
	SendEmailService,
} from "../services/Auth.service";
import { sendMail } from "./mail";

// Check User dengan status pending Cron Job setiap 10s
export const CheckUserCron = async () => {
	cron.schedule("*/10 * * * * *", async () => {
		const res = await CheckStatusUser();

		if (res.length === 0) {
			console.log("semua user telah dikirim kode verifikasi");
		} else {
			res.map(async (r) => {
				console.log("kirim verify ke user = ", r.id_user);
				const set = await SendEmailVerification(
					r.id_user,
					r.mailer?.pin,
					r.email
				);

				// Jalankan Cron Job Expired Pin
				CheckExpiredPinCronJob(r.id_user, r.mailer?.pin);
			});
		}
	});
};

// Kirim Email
export const SendEmailVerification = async (id: any, pin: any, mail: any) => {
	try {
		const set = await SendEmailService(id);
		const link = `http://localhost:3001/api/auth/${id}/verify/${pin}`;
		const send = await sendMail(link, mail);
		console.log("sukkses mengirim verifikasi! = ", send?.response);
		return send;
	} catch (error) {
		console.log(error);
	}
};

// CronJob Set Expired Pin setelah 1jam
export const CheckExpiredPinCronJob = async (idUser: any, pin: any) => {
	// cron job menit 1 setiap 1 jam
	cron.schedule("1 */1 * * *", async () => {
		const setExpired = await ExpiredPinService(idUser, pin);
		console.log(setExpired);
		console.log("Pin expired Untuk user = ", idUser);
	});
};
