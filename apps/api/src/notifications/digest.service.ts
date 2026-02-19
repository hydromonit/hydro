import { alreadySentToday } from "../utils/idempotency.util";
import { isEligible } from "./eligibility.service";
import { sendEmail } from "./email.service";
import { getUsers } from "./mock.provider";
import { buildTemplate } from "./template";

export const runDailyDigest = async () => {
	const users = getUsers();

	for (const user of users) {
		if (!isEligible(user)) continue;
		if (alreadySentToday(user.id)) continue;

		const { html, text } = buildTemplate(user);

		await sendEmail(user.email, "Your Daily Garden Digest", html, text);
	}
};
