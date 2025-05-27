import { Request, Response } from 'express';
import { createRating } from './../services/rating.service';

export const addRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const rating = await createRating({ ...req.body, userId });
        res.status(201).json({
            message: 'Rating added successfully',
            data: rating
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};