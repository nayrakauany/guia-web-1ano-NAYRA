export type User = {
    id: string;
    username: string;
    email: string;
    password: string; // Consider hashing this
    createdAt: Date;
    updatedAt: Date;
};

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};

export type CreateUserInput = {
    username: string;
    email: string;
    password: string;
};

export type UpdateUserInput = {
    username?: string;
    email?: string;
    password?: string; // Consider hashing this
};

export type ErrorResponse = {
    message: string;
    statusCode: number;
};