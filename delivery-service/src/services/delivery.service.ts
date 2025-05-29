import prisma from '../config/db';
import { DeliveryStatus, OrderStatus } from '@prisma/client';

export const getAssignedOrders = async (agentId: string) => {
    return await prisma.order.findMany({
        where: {
            deliveryAgentId: agentId,
            status: {
                in: ['accepted', 'preparing', 'out_for_delivery']
            }
        },
        include: {
            restaurant: {
                select: { name: true, address: true }
            },
            user: {
                select: { name: true, email: true }
            },
            orderItems: {
                include: { menuItem: true }
            },
            deliveryStatuses: {
                orderBy: { updatedAt: 'desc' }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};

export const updateDeliveryStatus = async (orderId: string, status: DeliveryStatus, agentId: string) => {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            deliveryAgentId: agentId
        }
    });

    if (!order) {
        throw new Error('Order not found or not assigned to you');
    }

    const deliveryUpdate = await prisma.deliveryStatusUpdate.create({
        data: {
            orderId,
            status
        }
    });

    let orderStatus: OrderStatus = order.status;
    if (status === 'picked_up') {
        orderStatus = OrderStatus.out_for_delivery;
    } else if (status === 'delivered') {
        orderStatus = OrderStatus.delivered;

        await prisma.deliveryAgentAvailability.upsert({
            where: { agentId },
            update: { isAvailable: true },
            create: { agentId, isAvailable: true }
        });
    }

    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status: orderStatus }
    });

    return { deliveryUpdate, order: updatedOrder };
};

export const updateAgentAvailability = async (agentId: string, isAvailable: boolean) => {
    return await prisma.deliveryAgentAvailability.upsert({
        where: { agentId },
        update: { isAvailable, updatedAt: new Date() },
        create: { agentId, isAvailable }
    });
};

export const getDeliveryHistory = async (agentId: string) => {
    return await prisma.order.findMany({
        where: {
            deliveryAgentId: agentId,
            status: 'delivered'
        },
        include: {
            restaurant: {
                select: { name: true, address: true }
            },
            user: {
                select: { name: true }
            },
            ratings: {
                where: { ratingType: 'delivery_agent' }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};