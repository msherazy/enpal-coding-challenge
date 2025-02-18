import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { AppointmentController } from './appointments';
import { RESPONSE_CODES } from '../constants/responseCodes';

// Mock the services module on an entry level
jest.unstable_mockModule('../services', () => ({
	getAvailableSlots: jest.fn(),
}));

// Import the mocked module dynamically
const AppointmentService = await import('../services');

// Define reusable test data
const MOCK_REQUEST = {
	query: { page: 1, limit: 10 },
	body: {
		date: '2024-05-03',
		products: ['SolarPanels', 'Heatpumps'],
		language: 'German',
		rating: 'Gold',
	},
};

const MOCK_RESPONSE_DATA = [
		{ start_date: '2024-05-03T10:30:00.000Z', available_count: 1 },
		{ start_date: '2024-05-03T11:00:00.000Z', available_count: 1 },
		{ start_date: '2024-05-03T11:30:00.000Z', available_count: 1 },
];

// Utility function to create a mock response object
const createMockResponse = () => {
	return {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	};
};

describe('AppointmentController', () => {
	let req, res, next;

	beforeEach(() => {
		jest.clearAllMocks();
		req = { ...MOCK_REQUEST };
		res = createMockResponse();
		next = jest.fn();
	});

	it('should return available appointment slots successfully', async () => {
		// Mock a successful response
		AppointmentService.getAvailableSlots.mockResolvedValue(MOCK_RESPONSE_DATA.data);

		// Call the controller
		await AppointmentController.getAppointments(req, res, next);

		// Handle assertions here
		expect(res.status).toHaveBeenCalledWith(RESPONSE_CODES.SUCCESS.FETCH_SUCCESS.code);
		expect(res.status).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining([
				expect.any(Object),
			])
		);
	});
});