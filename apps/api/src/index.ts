import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { startScheduler } from "./notifications/scheduler";
import unsubscribeRoute from "./routes/unsubscribe.route";

const app = new Hono();

app.get("/", (c) => c.text("Hello API!"));

app.route("/", unsubscribeRoute);

app.onError((err, c) => {
	console.error(err);
	return c.text("Internal Server Error", 500);
});

startScheduler();

serve(
	{
		fetch: app.fetch,
		port: 8001,
	},
	(info) => {
		console.log(`Server running at http://localhost:${info.port}`);
	},
);
