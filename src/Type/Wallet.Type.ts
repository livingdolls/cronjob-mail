import { object, string, TypeOf, optional, number } from "zod";

const payload = {
	body: object({
		id_wallet: optional(string()),
		idUser: optional(string()),
		amount: number(),
	}),
};

export const CreateWalletType = object({
	...payload,
});

export const LoginUserSchema = object({
	...payload,
});

export type RegisterType = TypeOf<typeof CreateWalletType>["body"];
