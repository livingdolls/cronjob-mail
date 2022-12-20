import { PrismaClient } from "@prisma/client";
import { LoginType } from "../Type/Auth.type";

const prisma = new PrismaClient();

export const LoginService = async (data: LoginType) => {
	const respon = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
		include: {
			mailer: true,
		},
	});
	return respon;
};
