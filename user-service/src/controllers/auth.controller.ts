import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/constants"
import { createUser, loginUser } from '../services/auth.service';

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await createUser(req.body);

        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: JWT_EXPIRES_IN ? parseInt(JWT_EXPIRES_IN) * 1000 : undefined,
        });
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, token } = await loginUser(req.body);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: JWT_EXPIRES_IN ? parseInt(JWT_EXPIRES_IN) * 1000 : undefined,
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};
