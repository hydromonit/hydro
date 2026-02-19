import type { User } from "./mock.provider";

export const isEligible = (user: User) => {
	if (!user.receiveEmails) return false;

	const active = user.batches.filter(
		(b) => b.status === "seeding" || b.status === "growing",
	);

	return active.length > 0;
};
