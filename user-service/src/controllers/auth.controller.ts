import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/constants"
import { createUser } from '../services/auth.service';


export const signup = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);

        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return res.status(201).json({
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
        return res.status(400).json({ error: error.message });
    }
};