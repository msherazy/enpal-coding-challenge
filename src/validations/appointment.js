import * as yup from 'yup';
import { LANGUAGES, PRODUCTS, RATINGS } from '../constants/index.js';

export const appointmentSchema = yup.object().shape({
	body: yup.object().shape({
		date: yup
			.string()
			.required('Date is required')
			.matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),

		products: yup
			.array()
			.of(yup.string().oneOf(PRODUCTS, 'Invalid product(s)'))
			.min(1, 'At least one product must be selected')
			.required('Products are required'),

		language: yup.string().required('Language is required').oneOf(LANGUAGES, 'Invalid language'),

		rating: yup.string().required('Customer rating is required').oneOf(RATINGS, 'Invalid rating'),
	}),
});
