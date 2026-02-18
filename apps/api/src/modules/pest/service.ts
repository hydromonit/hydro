import { prisma } from "../../utils/prisma";
import type { ReportPestIncident } from "./schema";

export async function getPestTypes() {
	return prisma.pestType.findMany();
}

export async function getIncidentsById(id: string) {
	return prisma.pestIncident.findUnique({
		where: {
			id,
		},
	});
}

export async function getActiveIncidentsByBatchId(batchId: string) {
	return prisma.pestIncident.findMany({
		where: {
			batch_id: batchId,
			status: "ONGOING",
		},
	});
}

export async function reportPestIncident(input: ReportPestIncident) {
	return prisma.pestIncident.create({
		data: {
			batch_id: input.batchId,
			pest_type_id: input.pestType,
			detected_date: input.detectedDate,
			resolved_date: input.resolvedDate,
			status: input.status,
			severity: input.severity,
			affected_count: input.affectedCount,
			notes: input.notes,
			image_url: input.imageUrl,
		},
	});
}

export async function updatePestIncident(
	id: string,
	input: Partial<ReportPestIncident>,
) {
	return prisma.pestIncident.update({
		where: {
			id,
		},
		data: {
			batch_id: input.batchId,
			pest_type_id: input.pestType,
			detected_date: input.detectedDate,
			resolved_date: input.resolvedDate,
			status: input.status,
			severity: input.severity,
			affected_count: input.affectedCount,
			notes: input.notes,
			image_url: input.imageUrl,
		},
	});
}
