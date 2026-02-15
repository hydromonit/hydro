import { getToken, removeToken, setToken } from "@/utils/storage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function api<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error");
  }

  return data as T;
}

export const authApi = {
  register: (payload: { email: string; password: string; full_name: string }) =>
    api<{ message: string; id: string }>("/users", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload: { email: string; password: string }) =>
    api<{ message: string; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: () =>
    api<{ message: string }>("/auth/logout", {
      method: "DELETE",
    }),
};

export { getToken, setToken, removeToken };
