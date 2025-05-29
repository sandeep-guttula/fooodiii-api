import prisma from '../config/db';
import { OrderStatus } from '@prisma/client';

interface OrderItem {
    menuItemId: string;
    quantity: number;
}

interface PlaceOrderInput {
    userId: string;
    restaurantId: string;
    items: OrderItem[];
}

export const placeOrder = async (data: PlaceOrderInput) => {
    const { userId, restaurantId, items } = data;

    const restaurant = await prisma.restaurant.findUnique({
        where: { id: restaurantId, isOnline: true }
    });

    if (!restaurant) throw new Error('Restaurant not available');

    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
        const menuItem = await prisma.menuItem.findUnique({
            where: { id: item.menuItemId, isAvailable: true }
        });
        if (!menuItem) throw new Error(`Menu item ${item.menuItemId} not available`);

        const itemTotal = menuItem.price * item.quantity;
        totalAmount += itemTotal;

        orderItemsData.push({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: menuItem.price
        });
    }

    // Create order
    const order = await prisma.order.create({
        data: {
            userId,
            restaurantId,
            totalAmount,
            status: OrderStatus.placed,
            orderItems: {
                create: orderItemsData
            }
        },
        include: {
            orderItems: {
                include: { menuItem: true }
            },
            restaurant: true
        }
    });

    return order;
};

export const getUserOrders = async (userId: string) => {
    return await prisma.order.findMany({
        where: { userId },
        include: {
            restaurant: true,
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
