import { Request, Response } from 'express';
import { createRestaurant, updateRestaurantStatus, getRestaurantsByOwner } from '../services/restaurant.service';

export const addRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {

        if (!req.body.name || !req.body.address) {
            res.status(400).json({ error: 'Name and address are required' });
            return;
        }

        const ownerId = (req as any).user.id;
        console.log(`Owner ID: ${ownerId}`);

        const restaurant = await createRestaurant({ ...req.body, ownerId });
        res.status(201).json({
            message: 'Restaurant created successfully',
            data: restaurant
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { isOnline } = req.body;
        const ownerId = (req as any).user.id;

        const restaurant = await updateRestaurantStatus(id, ownerId, isOnline);
        res.status(200).json({
            message: 'Restaurant status updated successfully',
            data: restaurant
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getMyRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
        const ownerId = (req as any).user.id;
        const restaurants = await getRestaurantsByOwner(ownerId);
        res.status(200).json({
            message: 'Restaurants retrieved successfully',
            data: restaurants
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};