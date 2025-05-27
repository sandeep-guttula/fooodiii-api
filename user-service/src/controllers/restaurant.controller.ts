import { getOnlineRestaurants } from './../services/restaurant.service';
import { Request, Response } from 'express';

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurants = await getOnlineRestaurants();
        res.status(200).json({
            message: 'Restaurants retrieved successfully',
            data: restaurants
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};