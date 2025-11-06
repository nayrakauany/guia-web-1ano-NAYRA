import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';

const securityMiddleware = (app: any) => {
    // Set security headers
    app.use(helmet());

    // Enable CORS
    app.use(cors({
        origin: process.env.CORS_ORIGIN || '*', // Allow all origins or specify your own
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
};

export default securityMiddleware;