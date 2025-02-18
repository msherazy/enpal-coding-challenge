export const RESPONSE_CODES = {
	SUCCESS: {
		FETCH_SUCCESS: {
			code: 200,
			message: 'Available appointment slots fetched successfully',
		},
	},
	ERROR: {
		INVALID_REQUEST: {
			code: 400,
			message: 'Invalid request parameters provided',
		},
		FETCH_ERROR: {
			code: 500,
			message: 'Error occurred while fetching available appointment slots',
		},
	},
};