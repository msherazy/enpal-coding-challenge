import { ValidationError } from 'yup';
import { failure } from '../utils';

/**
 * Generic request validation middleware that automatically validates query, body, params, and file.
 *
 * @param {Object} schema - Yup schema defining validation rules.
 */
export const validateRequest = schema => async (req, res, next) => {
	try {
		await schema.validate(
			{
				body: req.body,
				query: req.query,
				params: req.params,
			},
			{
				abortEarly: false,
				stripUnknown: true,
			},
		);
		return next();
	} catch (error) {
		if (error instanceof ValidationError) {
			return res.status(400).json(
				failure({
					req,
					statusCode: 400,
					message: 'Validation failed',
					details: error.errors,
				}),
			);
		}
		next(error);
	}
};
