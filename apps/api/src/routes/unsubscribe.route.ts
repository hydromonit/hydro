import { Hono } from "hono";
import { getUsers } from "../notifications/mock.provider";

const app = new Hono();

app.get("/unsubscribe/:token", (c) => {
	const token = c.req.param("token");

	const users = getUsers();
	const user = users.find((u) => u.unsubscribeToken === token);

	if (!user) {
		return c.text("Invalid link", 400);
	}

	user.receiveEmails = false;

	return c.html("<h2>You are unsubscribed.</h2>");
});

export default app;
