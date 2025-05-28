import { Request, Response } from 'express';
import {
    getAssignedOrders,
    updateDeliveryStatus,
    updateAgentAvailability,
    getDeliveryHistory
} from '../services/delivery.service';

export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const agentId = (req as any).user.id;
        const orders = await getAssignedOrders(agentId);
        res.status(200).json({
            message: 'Assigned orders retrieved successfully',
            data: orders
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const agentId = (req as any).user.id;

        const result = await updateDeliveryStatus(orderId, status, agentId);

        res.status(200).json({
            message: 'Delivery status updated successfully',
            data: result
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
        const agentId = (req as any).user.id;
        const { isAvailable } = req.body;

        const availability = await updateAgentAvailability(agentId, isAvailable);
        res.status(200).json({
            message: 'Availability updated successfully',
            data: availability
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getDeliveryHistoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const agentId = (req as any).user.id;
        const history = await getDeliveryHistory(agentId);
        res.status(200).json({
            message: 'Delivery history retrieved successfully',
            data: history
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};