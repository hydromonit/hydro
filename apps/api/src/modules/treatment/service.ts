import { prisma } from "../../utils/prisma";
import type { TreatmentLog } from "./schema";

export async function getTreatments() {
	return prisma.treatmentType.findMany();
}

export async function logTreatment(data: TreatmentLog) {
	return prisma.treatmentLog.create({
		data: {
			pest_incident_id: data.pestIncidentId,
			treatment_type_id: data.treatmentTypeId,
			treatment_date: data.treatmentDate,
			dosage: data.dosage,
			notes: data.notes,
			image_url: data.imageUrl,
			effectiveness: data.effectiveness,
			next_treatment_date: data.nextTreatmentDate,
		},
	});
}

export async function updateTreatmentLog(
	id: string,
	data: Partial<TreatmentLog>,
) {
	return prisma.treatmentLog.update({
		where: {
			id,
		},
		data: {
			pest_incident_id: data.pestIncidentId,
			treatment_type_id: data.treatmentTypeId,
			treatment_date: data.treatmentDate,
			dosage: data.dosage,
			notes: data.notes,
			image_url: data.imageUrl,
			effectiveness: data.effectiveness,
			next_treatment_date: data.nextTreatmentDate,
		},
	});
}
