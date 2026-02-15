import type { Context } from "hono";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";

interface RegisterBody {
  email: string;
  password: string;
  full_name: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const createUser = async (c: Context) => {
  const body = (await c.req.json()) as RegisterBody;
  const { email, password, full_name } = body;

  if (password.length < 8) {
    return c.json({ error: "Password minimal harus 8 karakter!" }, 400);
  }

  const existingUser = await prisma.users.findUnique({
    where: { email },
  });
  if (existingUser) {
    return c.json({ error: "Email sudah terdaftar!" }, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      full_name,
    },
  });
  return c.json({ message: "Registrasi berhasil!", id: user.id }, 201);
};

export const loginUser = async (c: Context) => {
  const { email, password } = await c.req.json();

  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (!user) {
    return c.json({ error: "Email atau Password salah!" }, 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return c.json({ error: "Email atau Password salah!" }, 401);
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || "default_secret_key",
    { expiresIn: "24h" },
  );

  return c.json({ message: "Login berhasil!", token });
};

export const logoutUser = async (c: Context) => {
  return c.json({ message: "Logout berhasil!" });
};
