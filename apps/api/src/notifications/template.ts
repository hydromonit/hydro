import type { User } from "./mock.provider";
import { getStaleBatches } from "./stale.util";

export const buildTemplate = (user: User) => {
	const active = user.batches.filter(
		(b) => b.status === "seeding" || b.status === "growing",
	);

	const stale = getStaleBatches(active);

	const baseUrl = process.env.APP_BASE_URL || "http://localhost:8001";
	const unsubscribeUrl = `${baseUrl}/unsubscribe/${user.unsubscribeToken}`;

	const html = `
    <h2>Selamat Pagi ${user.full_name}</h2>
    <p>Batch Aktif: ${active.length}</p>
    <p>Batch yang perlu diperhatikan: ${stale.length}</p>
    <a href="https://dashboard.com">Open Dashboard</a>
    <br/><br/>
    <a href="${unsubscribeUrl}">
      Unsubscribe
    </a>
  `;

	const text = `
    Selamat Pagi ${user.full_name}
    Batch Aktif: ${active.length}
    Batch yang perlu diperhatikan: ${stale.length}
    Dashboard: https://dashboard.com
    Unsubscribe: ${unsubscribeUrl}
  `;

	return { html, text };
};
