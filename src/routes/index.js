import { Router } from 'express';
import { healthRouter } from './health';
import { appointmentRouter } from './appointment';
import { errorRouter } from './error';

export const appRouter = Router();

// System health check route
appRouter.use('/health', healthRouter);

// Create appointment route
appRouter.use('/calendar/query', appointmentRouter);

appRouter.use(errorRouter);
