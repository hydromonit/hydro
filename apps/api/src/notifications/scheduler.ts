import cron from "node-cron";
import { runDailyDigest } from "./digest.service";

export const startScheduler = () => {
	cron.schedule(
		"0 7 * * *",
		async () => {
			console.log("Running Daily Digest...");
			await runDailyDigest();
		},
		{
			timezone: "Asia/Jakarta",
		},
	);

	console.log("Scheduler initialized");
};
