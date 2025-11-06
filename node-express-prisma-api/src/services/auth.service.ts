import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types';

const prisma = new PrismaClient();

export class AuthService {
    async register(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        return user;
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
                expiresIn: '1h',
            });
            return token;
        }
        return null;
    }

    async getUserFromToken(token: string): Promise<User | null> {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            const user = await prisma.user.findUnique({
                where: { id: (decoded as any).id },
            });
            return user;
        } catch (error) {
            return null;
        }
    }
}