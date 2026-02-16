import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import bcrypt from "bcrypt";
import type { log } from "console";
import { Hono } from "hono";
import { cors } from "hono/cors";
import jwt from "jsonwebtoken";
import z from "zod";
import { authMiddleware } from "./middleware/auth";
import { prisma } from "./utils/prisma";

const app = new Hono();

app.use(
	cors({
		origin:
			process.env.ALLOWED_ORIGINS?.split(",") || "[http://localhost:3000]",
		allowMethods: ["GET", "POST", "DELETE"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
		maxAge: 86400,
	}),
);

const registerSchema = z.object({
	email: z.string().email("Email tidak valid"),
	password: z.string().min(8, "Password minimal 8 karakter"),
	full_name: z.string().min(1, "Nama lengkap wajib diisi"),
});

const loginSchema = z.object({
	email: z.string().email("Email tidak valid"),
	password: z.string().min(8, "Password minimal 8 karakter"),
});

const registerRoute = app.post(
	"/users",
	zValidator("json", registerSchema),
	async (c) => {
		const body = await c.req.json();
		const { email, password, full_name } = c.req.valid("json");

		const existingUser = await prisma.users.findUnique({ where: { email } });
		if (existingUser) {
			return c.json({ error: "Email sudah terdaftar" }, 400);
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.users.create({
			data: {
				email,
				password: hashedPassword,
				full_name,
			},
		});

		return c.json({ message: "Registrasi berhasil", id: user.id }, 201);
	},
);

const loginRoute = app.post(
	"/auth/login",
	zValidator("json", loginSchema),
	async (c) => {
		const { email, password } = c.req.valid("json");

		const user = await prisma.users.findUnique({ where: { email } });
		if (!user) {
			return c.json({ error: "Email atau password salah" }, 401);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return c.json({ error: "Email atau password salah" }, 401);
		}

		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET! || "secret_key",
			{
				expiresIn: "24h",
			},
		);

		return c.json({ message: "Login berhasil", token });
	},
);

const logoutRoute = app.post("/auth/logout", authMiddleware, async (c) => {
	return c.json({ message: "Logout berhasil" });
});

app.get("/", (c) => {
	return c.text("Hello API!");
});

app.get("/api/test-secure", authMiddleware, (c) => {
	return c.json({ message: "Login berhasil!" });
});

export type AppType =
	| typeof registerRoute
	| typeof loginRoute
	| typeof logoutRoute;

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
