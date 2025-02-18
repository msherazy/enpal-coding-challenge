import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
	log: ['query', 'info', 'warn', 'error'],
});

export const testConnection = async () => {
	try {
		await db.$connect();
		console.log('Database connection established successfully!');
	} catch (error) {
		console.error('Database connection failed!', error);
	}
};
