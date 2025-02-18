import { Router } from 'express';
import { AppointmentController } from '../controllers/index.js';
import { appointmentSchema } from '../validations';
import { validateRequest } from '../middlewares/validate.js';

export const appointmentRouter = Router();

appointmentRouter.post(
	'/',
	validateRequest(appointmentSchema),
	AppointmentController.getAppointments,
);
