import { object, string, TypeOf, optional } from "zod";

const payload = {
	body: object({
		_id_user: optional(string()),
		email: string().email(),
		password: string().min(6).max(16),
		status: optional(string()),
		mailer: optional(object({})),
	}),
};

const payloadLogin = {
	body: object({
		id_user: optional(string()),
		email: string().email(),
		password: string().min(6).max(16),
		status: optional(string()),
		mailer: optional(object({})),
	}),
};

export const RegisterUserSchema = object({
	...payload,
});

export const LoginUserSchema = object({
	...payload,
});

export const ValidateTokenSchema = object({
	params: object({
		id_user: string(),
		pin: string(),
	}),
});

export type RegisterType = TypeOf<typeof RegisterUserSchema>["body"];
export type ValidateTokenType = TypeOf<typeof ValidateTokenSchema>["params"];
export type LoginType = TypeOf<typeof LoginUserSchema>["body"];
