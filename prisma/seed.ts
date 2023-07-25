/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import { inventoryData } from '../mocks';

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	for (const p of inventoryData) {
		const { categoryName, ...rest } = p;
		const inventory = await prisma.inventory.upsert({
			where: { name: rest.name },
			update: {},
			create: {
				...rest,
				categoryName
			},
		});
		console.log(`Created inventory with name: ${inventory.name}`);
	}

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.log("gokhan error");
		
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});