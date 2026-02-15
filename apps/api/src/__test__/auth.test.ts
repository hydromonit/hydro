import { describe, expect, it } from "vitest";

const BASE_URL = "http://localhost:8000";

describe("Auth API", () => {
	const randomEmail = `test${Date.now()}@test.com`;
	const password = "password123";
	const fullName = "Test User";

	it("register success", async () => {
		const res = await fetch(`${BASE_URL}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: randomEmail,
				password,
				full_name: fullName,
			}),
		});
		const data = await res.json();
		expect(res.status).toBe(201);
		expect(data.message).toBe("Registrasi berhasil!");
	});

	it("register weak password", async () => {
		const res = await fetch(`${BASE_URL}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: `weak${Date.now()}@test.com`,
				password: "123",
				full_name: "X",
			}),
		});
		const data = await res.json();
		expect(res.status).toBe(400);
		expect(data.error).toBe("Password minimal harus 8 karakter!");
	});

	it("register duplicate email", async () => {
		const res = await fetch(`${BASE_URL}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: randomEmail,
				password,
				full_name: fullName,
			}),
		});
		const data = await res.json();
		expect(res.status).toBe(400);
		expect(data.error).toBe("Email sudah terdaftar!");
	});

	it("login success", async () => {
		const res = await fetch(`${BASE_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: randomEmail, password }),
		});
		const data = await res.json();
		expect(res.status).toBe(200);
		expect(data.token).toBeDefined();
	});

	it("login wrong password", async () => {
		const res = await fetch(`${BASE_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: randomEmail, password: "wrong" }),
		});
		const data = await res.json();
		expect(res.status).toBe(401);
		expect(data.error).toBe("Email atau Password salah!");
	});

	it("protected route no token", async () => {
		const res = await fetch(`${BASE_URL}/api/test-secure`);
		const data = await res.json();
		expect(res.status).toBe(401);
	});

	it("protected route invalid token", async () => {
		const res = await fetch(`${BASE_URL}/api/test-secure`, {
			headers: { Authorization: "Bearer invalid" },
		});
		const data = await res.json();
		expect(res.status).toBe(401);
		expect(data.error).toBe("Token tidak valid");
	});

	it("protected route valid token", async () => {
		const loginRes = await fetch(`${BASE_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: randomEmail, password }),
		});
		const { token } = await loginRes.json();

		const res = await fetch(`${BASE_URL}/api/test-secure`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		expect(res.status).toBe(200);
	});
});
