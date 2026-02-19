import type { Batch } from "./mock.provider";

export const getStaleBatches = (batches: Batch[]) => {
	return batches.filter(
		(b) =>
			(b.status === "seeding" || b.status === "growing") &&
			b.days_since_last_log > 2,
	);
};
