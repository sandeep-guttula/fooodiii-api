import { Request, Response } from 'express';
import {
    getRestaurantOrders,
    updateOrderStatus,
    assignDeliveryAgent
} from '../services/order.service';

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const ownerId = (req as any).user.id;
        const orders = await getRestaurantOrders(ownerId);
        res.status(200).json({
            message: 'Orders retrieved successfully',
            data: orders
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrderStatusController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const ownerId = (req as any).user.id;

        const order = await updateOrderStatus(orderId, status, ownerId);

        // If order is accepted, assign delivery agent
        if (status === 'accepted') {
            await assignDeliveryAgent(orderId);
        }

        res.status(200).json({
            message: 'Order status updated successfully',
            data: order
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};