import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const demoUserId = "b4d5a976-9b03-43d9-ac03-3ba0bd893850";

    await prisma.product.createMany({
        data: Array.from({ length: 25 }).map((_, index) => ({
            userId: demoUserId,
            name: `Product ${index + 1}`,
            sku: `SKU-${index + 1}`,
            price: (Math.random() * 100).toFixed(2),
            quantity: Math.floor(Math.random() * 100),
            lowStockAt: Math.random() > 0.5 ? Math.floor(Math.random() * 100) : null,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (index * 5)),
        }))
    });

    console.log("Seed data inserted successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
