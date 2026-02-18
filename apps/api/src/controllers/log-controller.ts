import { PrismaClient } from "@prisma/client";
import type { Context } from "hono"; // Tambahkan 'type' untuk fix error verbatimModuleSyntax

const prisma = new PrismaClient();

export const createDailyLog = async (c: Context) => {
	try {
		const body = await c.req.json();
		const { batchId, phLevel, ppmLevel, waterTemp, notes, imageUrl } = body;

		// Ambil user dari context (Hasil Issue 1)
		const user = c.get("user");

		// Validasi Server-side sesuai In Scope
		if (phLevel < 0 || phLevel > 14) {
			return c.json({ error: "pH level harus di antara 0-14" }, 400);
		}
		if (ppmLevel < 0 || ppmLevel > 5000) {
			return c.json({ error: "PPM level harus di antara 0-5000" }, 400);
		}

		// Simpan ke database
		const log = await prisma.dailyLog.create({
			data: {
				batchId: Number(batchId),
				userId: user.id, // Pastikan data aman per user
				phLevel: Number(phLevel),
				ppmLevel: Number(ppmLevel),
				waterTemp: Number(waterTemp),
				notes,
				imageUrl,
			},
		});

		return c.json(log, 201);
	} catch (error) {
		return c.json({ error: "Gagal menyimpan log" }, 500);
	}
};
