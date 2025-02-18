import { db } from '../database';

/**
 * Retrieves available appointment slots based on the provided criteria.
 *
 * @param {Object} params - The parameters for fetching available slots.
 * @param {string} params.date - The date for which to find available slots (YYYY-MM-DD format).
 * @param {string[]} [params.products=[]] - The list of products the customer wants to discuss.
 * @param {string} [params.language] - The preferred language of the customer.
 * @param {string} [params.rating] - The customer rating (Gold, Silver, Bronze).
 * @returns {Promise<Array>} - Returns an array of { start_date, available_count } objects.
 */
export const getAvailableSlots = async ({ date, products = [], language, rating }) => {
	// -----------------------------
	// 1) Build a filter for unbooked slots matching manager criteria
	// -----------------------------
	const slotFilter = {
		booked: false,
		...(date && {
			start_date: {
				gte: new Date(`${date}T00:00:00Z`),
				lt: new Date(`${date}T23:59:59Z`),
			},
		}),
		sales_managers: {
			...(language ? { languages: { has: language } } : {}),
			...(rating ? { customer_ratings: { has: rating } } : {}),
			// Ensure manager supports all requested products
			...(products.length ? { products: { hasEvery: products } } : {}),
		},
	};

	// -----------------------------
	// 2) Fetch candidate (unbooked) slots in one go
	// -----------------------------
	const candidateSlots = await db.slots.findMany({
		where: slotFilter,
		include: { sales_managers: true },
		orderBy: { start_date: 'asc' },
	});
	if (!candidateSlots.length) {
		return [];
	}

	// -----------------------------
	// 3) Collect manager IDs so we can fetch their booked slots in one query
	// -----------------------------
	const managerIds = Array.from(new Set(candidateSlots.map(slot => slot.sales_manager_id)));

	// -----------------------------
	// 4) Fetch booked slots that overlap the same day, for all those managers
	// -----------------------------
	const startOfDay = new Date(`${date}T00:00:00Z`);
	const endOfDay = new Date(`${date}T23:59:59Z`);

	const bookedSlots = await db.slots.findMany({
		where: {
			booked: true,
			sales_manager_id: { in: managerIds },
			// Overlapping the same date range
			start_date: { lt: endOfDay },
			end_date: { gt: startOfDay },
		},
	});

	// Group them by manager for quick overlap checks
	const bookedSlotsByManager = {};
	for (const b of bookedSlots) {
		if (!bookedSlotsByManager[b.sales_manager_id]) {
			bookedSlotsByManager[b.sales_manager_id] = [];
		}
		bookedSlotsByManager[b.sales_manager_id].push(b);
	}

	// -----------------------------
	// 5) Filter out candidate slots that actually overlap a booked slot
	// -----------------------------
	const availableSlots = candidateSlots.filter(slot => {
		const candidateStart = new Date(slot.start_date);
		const candidateEnd = new Date(slot.end_date);
		const managerBooked = bookedSlotsByManager[slot.sales_manager_id] || [];

		// If it overlaps with any booked slot, exclude it
		return !managerBooked.some(
			booked =>
				candidateStart < new Date(booked.end_date) && candidateEnd > new Date(booked.start_date),
		);
	});

	// -----------------------------
	// 6) Group by start_date => count how many managers are free at that time
	// -----------------------------
	const groupedSlots = {};
	availableSlots.forEach(slot => {
		const isoStartDate = new Date(slot.start_date).toISOString();
		groupedSlots[isoStartDate] = (groupedSlots[isoStartDate] || 0) + 1;
	});

	// -----------------------------
	// 7) Convert the grouped object to an array, sort, and return
	// -----------------------------
	const result = Object.keys(groupedSlots)
		.map(start_date => ({
			start_date,
			available_count: groupedSlots[start_date],
		}))
		.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

	return result;
};

export const AppointmentService = {
	getAvailableSlots,
};
