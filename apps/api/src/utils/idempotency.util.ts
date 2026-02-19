const sent = new Set<string>();

export const alreadySentToday = (userId: string) => {
	const today = new Date().toISOString().split("T")[0];
	const key = `${userId}-${today}`;

	if (sent.has(key)) return true;

	sent.add(key);
	return false;
};
