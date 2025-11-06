import express from 'express';
import { json, urlencoded } from 'body-parser';
import { securityMiddleware } from './middleware/security.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { routes } from './routes';

const app = express();

// Middleware
app.use(securityMiddleware);
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorMiddleware);

export default app;