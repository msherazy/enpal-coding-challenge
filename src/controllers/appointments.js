import { AppointmentService } from '../services';
import expressAsyncHandler from 'express-async-handler';
import { RESPONSE_CODES } from '../constants/responseCodes.js';

/**
 * Controller to fetch available appointment slots.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with available appointment slots.
 *
 * @example
 * // Example request:
 * GET /appointments?date=2024-05-03&products=SolarPanels,Heatpumps&language=German&rating=Gold&page=1&limit=10
 *
 * // Example response:
 * {
 *   "success": true,
 *   "message": "Available slots fetched successfully",
 *   "data": {
 *     "page": 1,
 *     "limit": 10,
 *     "total_records": 5,
 *     "total_pages": 1,
 *     "data": [
 *       { "start_date": "2024-05-03T10:30:00.00Z", "available_count": 1 },
 *       { "start_date": "2024-05-03T12:00:00.00Z", "available_count": 2 }
 *     ]
 *   }
 * }
 */
const getAppointments = expressAsyncHandler(async (req, res) => {
	const { page = 1, limit = 10 } = req.query;
	const { date, products, language, rating } = req.body;

	try {
		const filters = { date, products, language, rating, page, limit };
		const availableSlots = await AppointmentService.getAvailableSlots(filters);

		res.status(RESPONSE_CODES.SUCCESS.FETCH_SUCCESS.code).json(availableSlots);
	} catch (error) {
		res.status(RESPONSE_CODES.ERROR.FETCH_ERROR.code).json({
			success: false,
			message: RESPONSE_CODES.ERROR.FETCH_ERROR.message,
			error: error.message,
		});
	}
});

/**
 * Controller for handling appointment-related requests.
 */
export const AppointmentController = {
	getAppointments,
};
