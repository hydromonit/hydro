import { hc } from "hono/client";
import type { AppType } from "../../../api/src/index";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const client = hc<AppType>(BASE_URL);
