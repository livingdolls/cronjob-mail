import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateWalletService = async (data: any) => {
	const respon = await prisma.wallet.create({
		data: {
			idUser: data.userId,
			amount: data.amount,
			currency: {
				create: {
					currency: "rupiah",
				},
			},
		},
	});

	return respon;
};

export const GetWalletService = async (id: string) => {
	const respon = await prisma.user.findUnique({
		where: {
			id_user: id,
		},
		include: {
			mailer: true,
			wallet: true,
		},
	});

	return respon;
};
