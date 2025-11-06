import { AuthService } from '../../src/services/auth.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const authService = new AuthService(prisma);

describe('AuthService', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('register', () => {
        it('should successfully register a new user', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
            };

            const user = await authService.register(userData);
            expect(user).toHaveProperty('id');
            expect(user.email).toBe(userData.email);
        });

        it('should throw an error if the user already exists', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
            };

            await expect(authService.register(userData)).rejects.toThrow('User already exists');
        });
    });

    describe('login', () => {
        it('should successfully log in a user', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
            };

            const user = await authService.login(userData.email, userData.password);
            expect(user).toHaveProperty('id');
            expect(user.email).toBe(userData.email);
        });

        it('should throw an error if the credentials are invalid', async () => {
            await expect(authService.login('invalid@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
        });
    });
});