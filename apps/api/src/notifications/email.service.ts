import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (
	to: string,
	subject: string,
	html: string,
	text: string,
) => {
	try {
		await sgMail.send({
			to,
			from: process.env.EMAIL_FROM!,
			subject,
			text,
			html,
		});

		console.log("Email sent to:", to);
	} catch (error: any) {
		console.error("SendGrid error:", error.response?.body || error.message);
	}
};
