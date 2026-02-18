import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { authMiddleware } from "../../middleware/authMiddleware";
import { treatmentLogSchema } from "./schema";
import { getTreatments, logTreatment, updateTreatmentLog } from "./service";

export const treatment = new Hono()
	.use("*", authMiddleware)
	.get("/type", async (c) => {
		const treatments = await getTreatments();
		try {
			return c.json({
				status: 200,
				success: true,
				data: treatments,
			});
		} catch (error) {
			return c.json(
				{
					status: 500,
					success: false,
					message: "Failed to retrieve treatment types",
					error: error instanceof Error ? error.message : "Unknown error",
				},
				500,
			);
		}
	})
	.post("/log", zValidator("json", treatmentLogSchema), async (c) => {
		const data = c.req.valid("json");
		try {
			const result = await logTreatment(data);
			return c.json({
				status: 200,
				success: true,
				data: result,
			});
		} catch (error) {
			return c.json(
				{
					status: 500,
					success: false,
					message: "Failed to log treatment",
					error: error instanceof Error ? error.message : "Unknown error",
				},
				500,
			);
		}
	})
	.patch("/log/:id", zValidator("json", treatmentLogSchema), async (c) => {
		const { id } = c.req.param();
		const data = c.req.valid("json");
		try {
			const result = await updateTreatmentLog(id, data);
			return c.json({
				status: 200,
				success: true,
				data: result,
			});
		} catch (error) {
			return c.json(
				{
					status: 500,
					success: false,
					message: "Failed to update treatment log",
					error: error instanceof Error ? error.message : "Unknown error",
				},
				500,
			);
		}
	});
