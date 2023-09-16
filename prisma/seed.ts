import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
	const budi = await prisma.user.upsert({
		where: { username: "budi" },
		update: {},
		create: {
			username: "budi",
			balance: 100000,
		},
	});

	const comp = await prisma.computer.create({
		data: {
			computerNumber: 2,
			isUsed: false,
		},
	});

	console.log({ budi, comp });
}

seed()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
