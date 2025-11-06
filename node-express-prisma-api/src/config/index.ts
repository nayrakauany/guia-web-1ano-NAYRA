import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL || '',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    // Add other configuration settings as needed
};

export default config;