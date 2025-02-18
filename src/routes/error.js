import { Router } from 'express';
import { ErrorController } from '../controllers/index.js'; // Import failure response utility

export const errorRouter = Router();

// 404 Not Found Handler (Catches unmatched routes)
errorRouter.use('*', ErrorController.notFound);
