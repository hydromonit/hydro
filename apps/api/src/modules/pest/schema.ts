import z from "zod";

export const reportPestIncidentSchema = z.object({
	batchId: z.string(),
	pestType: z.string(),
	detectedDate: z.coerce.date(),
	resolvedDate: z.coerce.date().optional(),
	status: z.enum(["ONGOING", "RESOLVED", "UNRESOLVED"]),
	severity: z.enum(["MILD", "MODERATE", "SEVERE"]),
	affectedCount: z.number(),
	notes: z.string().optional(),
	imageUrl: z.string().optional(),
});

export type ReportPestIncident = z.infer<typeof reportPestIncidentSchema>;
