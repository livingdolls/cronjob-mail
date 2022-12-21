import mail from "nodemailer";

const transport = mail.createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAIL_GOOGLE || "yasare12x@gmail.com",
		pass: process.env.MAIL_PASS || "oyzhvccmrtqkgsdj",
	},
});

export const sendMail = async (text: any, mail: any) => {
	const options = {
		from: "'Email Verifikasi'",
		to: mail,
		subject: "verify token",
		text: `
            Berikut link untuk verifikasi pendaftaran ${text}
        `,
	};

	try {
		const send = transport.sendMail(options);
		return send;
	} catch (error) {
		console.log(error);
	}
};
