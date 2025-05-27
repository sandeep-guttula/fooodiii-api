import prisma from '@shared/database/prisma';
import { SignupInput } from '../types/index';
import { hashPassword } from '../utils/hash';
import { Role } from '@prisma/client';

export const createUser = async (data: SignupInput) => {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Email already in use');

    const hashed = await hashPassword(data.password);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash: hashed,
            role: data.role || Role.user,
        },
    });

    return user;
};