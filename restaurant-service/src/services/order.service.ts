import prisma from '../../../shared/database/prisma';
import { OrderStatus } from '@prisma/client';

export const getRestaurantOrders = async (ownerId: string) => {
    return await prisma.order.findMany({
        where: {
            restaurant: { ownerId }
        },
        include: {
            user: {
                select: { name: true, email: true }
            },
            orderItems: {
                include: { menuItem: true }
            },
            deliveryAgent: {
                select: { name: true, email: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus, ownerId: string) => {
    // Verify restaurant ownership
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            restaurant: { ownerId }
        }
    });

    if (!order) {
        throw new Error('Order not found or unauthorized');
    }

    return await prisma.order.update({
        where: { id: orderId },
        data: { status }
    });
};

export const assignDeliveryAgent = async (orderId: string) => {
    // Find available delivery agent
    const availableAgent = await prisma.user.findFirst({
        where: {
            role: 'delivery_agent',
            availability: {
                isAvailable: true
            }
        }
    });

    if (availableAgent) {
        // Assign agent and mark as unavailable
        await prisma.order.update({
            where: { id: orderId },
            data: { deliveryAgentId: availableAgent.id }
        });

        await prisma.deliveryAgentAvailability.update({
            where: { agentId: availableAgent.id },
            data: { isAvailable: false }
        });

        // Create delivery status update
        await prisma.deliveryStatusUpdate.create({
            data: {
                orderId,
                status: 'assigned'
            }
        });
    }
};