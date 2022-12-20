import { PrismaClient, User } from "@prisma/client";
import { RegisterType, ValidateTokenType } from "../Type/Auth.type";
import { MakeId } from "../utils/RandomId";

const prisma = new PrismaClient();

// Service Pendaftaran
export const SignUpService = async (data: RegisterType): Promise<User> => {
	const respon = await prisma.user.create({
		data: {
			email: data.email,
			password: data.password,
			status: "pending",
			mailer: {
				create: {
					email: data.email,
					pin: MakeId(12),
					status: "pending",
				},
			},
		},
	});

	return respon;
};

// Menghasilkan status user
export const CheckStatusUser = async () => {
	const respon = await prisma.user.findMany({
		where: {
			status: "pending",
		},
		select: {
			id_user: true,
			status: true,
			email: true,
			mailer: {
				select: {
					pin: true,
				},
			},
		},
	});

	return respon;
};

// Service update status user setelah verifikasi email
export const UpdateStatusService = async (id: ValidateTokenType) => {
	const respon = await prisma.user.update({
		where: {
			id_user: id.id_user,
		},
		data: {
			status: "verifed",
			mailer: {
				update: { status: "verifed" },
			},
		},
	});

	return respon;
};

// Check Status User (hanya status)
export const ValidateUpdateStatusService = async (id: ValidateTokenType) => {
	const respon = await prisma.mailer.findFirst({
		where: {
			AND: [{ userId: id.id_user, pin: id.pin }],
		},
		select: {
			status: true,
		},
	});

	return respon;
};

// Update status User setelah dikirim kode verif
export const SendEmailService = async (id: any) => {
	const respon = await prisma.user.update({
		where: {
			id_user: id,
		},
		data: {
			status: "register",
			mailer: {
				update: { status: "register" },
			},
		},
	});

	return respon;
};

// Menampilkan status mailer User
export const getUserPinService = async (id: any) => {
	const respon = await prisma.user.findUnique({
		where: {
			id_user: id,
		},
		select: {
			mailer: true,
		},
	});

	return respon;
};

// Update pin setelah 1 jam
export const ExpiredPinService = async (idUser: any, pin: any) => {
	const respon = await prisma.mailer.update({
		where: {
			pin: pin,
		},
		data: {
			status: "expired",
		},
	});

	return respon;
};

// Helper
export const UtilSDeleteManyS = async () => {
	const respon = await prisma.user.deleteMany();
	return respon;
};
