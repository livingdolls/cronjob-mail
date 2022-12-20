import { PrismaClient } from "@prisma/client";
import { MakeId } from "../utils/RandomId";

const prisma = new PrismaClient();

export const UpdateMailController = async (data: any) => {
	const respon = await prisma.user.update({
		where: {
			id_user: data.id_user,
		},
		data: {
			email: data.newEmail,
			status: "pending",
			mailer: {
				update: {
					email: data.newEmail,
					pin: MakeId(12),
					status: "pending",
				},
			},
		},
	});

	return respon;
};
