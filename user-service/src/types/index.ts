import { Role } from '@prisma/client';

export interface SignupInput {
    name: string;
    email: string;
    password: string;
    role?: Role;
}

export interface LoginInput {
    email: string;
    password: string;
}