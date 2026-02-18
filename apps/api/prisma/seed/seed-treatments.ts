import { prisma } from "../../src/utils/prisma";
import treatmentData from "./treatments.json";

enum CategoryTreatment {
	INSECTICIDE = "INSECTICIDE",
	FUNGICIDE = "FUNGICIDE",
	ORGANIC = "ORGANIC",
	OTHER = "OTHER",
}

async function seedTreatment() {
	for (const treatment of treatmentData) {
		await prisma.treatmentType.create({
			data: {
				name: treatment.name,
				category: treatment.category.toUpperCase() as CategoryTreatment,
				description: treatment.description,
			},
		});
	}
	console.log("Treatment data seeded successfully!");
}

seedTreatment()
	.catch((error) => {
		console.error("Error seeding treatment data:", error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
