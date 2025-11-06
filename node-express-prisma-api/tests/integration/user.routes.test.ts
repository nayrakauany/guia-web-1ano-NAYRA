import request from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/prisma/client';

describe('User Routes', () => {
    beforeAll(async () => {
        await prisma.user.deleteMany(); // Clean up the database before tests
    });

    afterAll(async () => {
        await prisma.$disconnect(); // Disconnect Prisma client after tests
    });

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.username).toBe('testuser');
    });

    it('should get a user by ID', async () => {
        const user = await prisma.user.create({
            data: {
                username: 'testuser2',
                email: 'testuser2@example.com',
                password: 'password123',
            },
        });

        const response = await request(app).get(`/api/users/${user.id}`);

        expect(response.status).toBe(200);
        expect(response.body.username).toBe('testuser2');
    });

    it('should update a user', async () => {
        const user = await prisma.user.create({
            data: {
                username: 'testuser3',
                email: 'testuser3@example.com',
                password: 'password123',
            },
        });

        const response = await request(app)
            .put(`/api/users/${user.id}`)
            .send({
                username: 'updateduser',
            });

        expect(response.status).toBe(200);
        expect(response.body.username).toBe('updateduser');
    });

    it('should delete a user', async () => {
        const user = await prisma.user.create({
            data: {
                username: 'testuser4',
                email: 'testuser4@example.com',
                password: 'password123',
            },
        });

        const response = await request(app).delete(`/api/users/${user.id}`);

        expect(response.status).toBe(204);
    });

    it('should return 404 for non-existing user', async () => {
        const response = await request(app).get('/api/users/999999');

        expect(response.status).toBe(404);
    });
});