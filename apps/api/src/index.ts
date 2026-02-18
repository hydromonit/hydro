import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createDailyLog } from "./controllers/log-controller";

const app = new Hono();

// Daftarkan endpoint POST sebagai rute RPC
const routes = app.post("/logs", createDailyLog);

// Export tipe untuk digunakan di Frontend (Pola RPC)
export type AppRouteType = typeof routes;

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);

export default app;
