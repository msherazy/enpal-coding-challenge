/**
 * Generates a success response.
 *
 * @param {Object} options - Response options.
 * @param {Object} options.req - Express request object.
 * @param {number} options.statusCode - HTTP status code.
 * @param {any} [options.data] - Response data (optional).
 * @param {string} [options.message] - Custom success message (optional).
 * @returns {Object} - Standardized success response.
 */
export const success = ({
	req,
	statusCode = 200,
	data = null,
	message = 'Request processed successfully',
}) => ({
	success: true,
	path: req.originalUrl,
	message,
	statusCode,
	data,
	timestamp: new Date().toUTCString(),
});

/**
 * Generates a failure (error) response.
 *
 * @param {Object} options - Response options.
 * @param {Object} options.req - Express request object.
 * @param {number} options.statusCode - HTTP status code.
 * @param {string} [options.message] - Custom error message (optional).
 * @param {any} [options.details] - Additional error details (optional, useful for debugging).
 * @returns {Object} - Standardized failure response.
 */
export const failure = ({
	req,
	statusCode = 500,
	message = 'An error occurred',
	details = null,
}) => ({
	success: false,
	path: req.originalUrl,
	message,
	statusCode,
	method: req.method,
	...(details !== null && { error: details }),
	timestamp: new Date().toUTCString(),
});
