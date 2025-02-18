import assert from 'assert';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
assert(PORT, 'PORT is missing from .env file');

const DATABASE_URL = process.env.DATABASE_URL;
assert(DATABASE_URL, 'DATABASE_URL is missing in .env');

export const ENV = {
	DATABASE_URL,
	PORT,
};