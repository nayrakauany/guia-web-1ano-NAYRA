import express from 'express';
import { PrismaClient } from '@prisma/client';
import { setupRoutes } from './routes';
import { securityMiddleware } from './middleware/security.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { config } from './config';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(securityMiddleware);

setupRoutes(app);

app.use(errorMiddleware);

const PORT = config.PORT || 3000;

const startServer = async () => {
    try {
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
};

startServer();