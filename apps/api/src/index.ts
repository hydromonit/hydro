import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { pest } from "./modules/pest/route";
import { treatment } from "./modules/treatment/route";

const app = new Hono()
	.use(cors())
	.use(logger())
	.get("/", (c) => {
		return c.text("Hello API!");
	})
	.route("/v1/pest", pest)
	.route("/v1/treatment", treatment);

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
