import { Request, Response } from 'express';
import { placeOrder, getUserOrders } from './../services/order.service';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        if (!req.body.restaurantId || !req.body.items || req.body.items.length === 0) {
            res.status(400).json({ error: 'restaurantId and items are required' });
            return;
        }
        const order = await placeOrder({ ...req.body, userId });
        res.status(201).json({
            message: 'Order placed successfully',
            data: order
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};


export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const orders = await getUserOrders(userId);
        res.status(200).json({
            message: 'Orders retrieved successfully',
            data: orders
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};