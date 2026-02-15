import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { loginUser, logoutUser, createUser } from "./controllers/auth";
import { authMiddleware } from "./middleware/auth";

const app = new Hono();

app.use("/auth/*", cors());

app.post("/users", createUser);
app.post("/auth/login", loginUser);
app.delete("/auth/logout", logoutUser);

app.get("/", (c) => {
  return c.text("Hello API!");
});

app.get("/api/test-secure", authMiddleware, (c) => {
  return c.json({ message: "Login berhasil!" });
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
