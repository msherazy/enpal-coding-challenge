import { Router } from 'express';
import { success } from '../utils';

export const healthRouter = Router();

healthRouter.get('/', (req, res) => {
	const uptimeInSeconds = process.uptime();
	const days = Math.floor(uptimeInSeconds / (60 * 60 * 24));
	const hours = Math.floor((uptimeInSeconds % (60 * 60 * 24)) / (60 * 60));
	const minutes = Math.floor((uptimeInSeconds % (60 * 60)) / 60);
	const seconds = Math.floor(uptimeInSeconds % 60);

	const formattedUptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
	return res.status(200).json(
		success({
			req,
			statusCode: 200,
			data: {
				status: 'ok',
				uptime: formattedUptime,
			},
			message: 'Health check successful',
		}),
	);
});
