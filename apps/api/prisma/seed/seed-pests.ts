import { prisma } from "../../src/utils/prisma";
import pestData from "./pests.json";

async function seedPests() {
	for (const pest of pestData) {
		await prisma.pestType.create({
			data: {
				name: pest.name,
				category: pest.category.toUpperCase() as "PEST" | "DISEASE",
				description: pest.description,
			},
		});
	}
	console.log("Pest data seeded successfully!");
}

seedPests()
	.catch((error) => {
		console.error("Error seeding pest data:", error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
