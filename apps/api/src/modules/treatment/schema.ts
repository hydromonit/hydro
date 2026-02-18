import { z } from "zod";

export const treatmentLogSchema = z.object({
	pestIncidentId: z.string(),
	treatmentTypeId: z.string(),
	treatmentDate: z.coerce.date(),
	dosage: z.string(),
	notes: z.string().optional(),
	imageUrl: z.string().optional(),
	effectiveness: z
		.enum(["EFFECTIVE", "INEFFECTIVE", "PARTIAL", "PENDING"])
		.optional(),
	nextTreatmentDate: z.coerce.date().optional(),
});

export type TreatmentLog = z.infer<typeof treatmentLogSchema>;
