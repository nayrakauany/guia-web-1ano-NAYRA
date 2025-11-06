import { UserService } from '../../src/services/user.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userService = new UserService(prisma);

describe('UserService', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData = { email: 'test@example.com', password: 'password123' };
            const user = await userService.createUser(userData);
            expect(user).toHaveProperty('id');
            expect(user.email).toBe(userData.email);
        });
    });

    describe('getUser', () => {
        it('should return a user by id', async () => {
            const userData = { email: 'test2@example.com', password: 'password123' };
            const createdUser = await userService.createUser(userData);
            const user = await userService.getUser(createdUser.id);
            expect(user).toHaveProperty('id', createdUser.id);
            expect(user.email).toBe(userData.email);
        });
    });

    describe('updateUser', () => {
        it('should update an existing user', async () => {
            const userData = { email: 'test3@example.com', password: 'password123' };
            const createdUser = await userService.createUser(userData);
            const updatedData = { email: 'updated@example.com' };
            const updatedUser = await userService.updateUser(createdUser.id, updatedData);
            expect(updatedUser.email).toBe(updatedData.email);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user by id', async () => {
            const userData = { email: 'test4@example.com', password: 'password123' };
            const createdUser = await userService.createUser(userData);
            await userService.deleteUser(createdUser.id);
            const user = await userService.getUser(createdUser.id);
            expect(user).toBeNull();
        });
    });
});