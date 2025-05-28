import prisma from '@shared/database/prisma';
import { LoginInput, SignupInput } from '../types/index';
import { hashPassword } from '../utils/hash';
import { Role } from '@prisma/client';
import { comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants';

export const createUser = async (data: SignupInput) => {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Email already in use');

    // log database url
    console.log('Database URL:', process.env.DATABASE_URL);
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

export const loginUser = async (data: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await comparePassword(data.password, user.passwordHash);
    if (!isValid) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { user, token };
};