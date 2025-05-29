import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Connected to database');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

export default prisma;
