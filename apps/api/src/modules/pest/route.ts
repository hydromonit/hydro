import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { authMiddleware } from "../../middleware/authMiddleware";
import { reportPestIncidentSchema } from "./schema";
import {
	getActiveIncidentsByBatchId,
	getIncidentsById,
	getPestTypes,
	reportPestIncident,
	updatePestIncident,
} from "./service";

export const pest = new Hono()
	.use("*", authMiddleware)
	.get("/type", async (c) => {
		const pestTypes = await getPestTypes();
		return c.json({
			status: 200,
			success: true,
			data: pestTypes,
		});
	})
	.get("/incidents/:id", async (c) => {
		const { id } = c.req.param();
		try {
			const incident = await getIncidentsById(id);
			if (!incident) {
				return c.json(
					{
						status: 404,
						success: false,
						message: "Pest incident not found",
					},
					404,
				);
			}
			return c.json({
				status: 200,
				success: true,
				data: incident,
			});
		} catch (error) {
			return c.json(
				{
					status: 500,
					success: false,
					message: "Failed to retrieve pest incident",
					error: error instanceof Error ? error.message : "Unknown error",
				},
				500,
			);
		}
	})
	.post(
		"/incidents",
		zValidator("json", reportPestIncidentSchema),
		async (c) => {
			const data = c.req.valid("json");

			try {
				const result = await reportPestIncident(data);

				return c.json({
					status: 201,
					success: true,
					message: "Pest incident reported successfully",
					data: {
						...result,
					},
				});
			} catch (error) {
				return c.json(
					{
						status: 500,
						success: false,
						message: "Failed to report pest incident",
						error: error instanceof Error ? error.message : "Unknown error",
					},
					500,
				);
			}
		},
	)
	.patch(
		"/incidents/:id",
		zValidator("json", reportPestIncidentSchema),
		async (c) => {
			const { id } = c.req.param();
			const data = c.req.valid("json");

			try {
				const result = await updatePestIncident(id, data);

				return c.json({
					status: 200,
					success: true,
					message: "Pest incident updated successfully",
					data: {
						...result,
					},
				});
			} catch (error) {
				return c.json(
					{
						status: 500,
						success: false,
						message: "Failed to update pest incident",
						error: error instanceof Error ? error.message : "Unknown error",
					},
					500,
				);
			}
		},
	)
	.get("/active/:batchId", async (c) => {
		const { batchId } = c.req.param();
		try {
			const incidents = await getActiveIncidentsByBatchId(batchId);
			return c.json({
				status: 200,
				success: true,
				data: incidents,
			});
		} catch (error) {
			return c.json(
				{
					status: 500,
					success: false,
					message: "Failed to retrieve active pest incidents",
					error: error instanceof Error ? error.message : "Unknown error",
				},
				500,
			);
		}
	});
