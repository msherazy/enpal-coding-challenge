import { failure } from '../utils';

export const globalError = (err, req, res, next) => {
	console.error('in error handler', err);
	res.status(err.status || 500).json(
		failure({
			req,
			statusCode: err.status || 500,
			message: err.message || 'Internal Server Error',
			details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
		}),
	);
};

export const notFound = (req, res) => {
	res.status(404).json(failure({ req, statusCode: 404, message: 'Route not found' }));
};

export const ErrorController = {
	globalError,
	notFound,
};
