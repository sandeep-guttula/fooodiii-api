import prisma from '../../../shared/database/prisma';

interface MenuItemInput {
    restaurantId: string;
    name: string;
    description?: string;
    price: number;
    isAvailable?: boolean;
}

export const addMenuItem = async (data: MenuItemInput) => {
    // Verify restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
        where: { id: data.restaurantId }
    });

    if (!restaurant) {
        throw new Error('Restaurant not found');
    }

    return await prisma.menuItem.create({
        data: {
            restaurantId: data.restaurantId,
            name: data.name,
            description: data.description,
            price: data.price,
            isAvailable: data.isAvailable ?? true
        }
    });
};

export const updateMenuItem = async (id: string, data: Partial<MenuItemInput>) => {
    return await prisma.menuItem.update({
        where: { id },
        data
    });
};

export const deleteMenuItem = async (id: string) => {
    return await prisma.menuItem.delete({
        where: { id }
    });
};

export const getMenuItems = async (restaurantId: string) => {
    return await prisma.menuItem.findMany({
        where: { restaurantId },
        orderBy: { createdAt: 'desc' }
    });
};