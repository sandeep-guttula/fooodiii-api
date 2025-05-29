import prisma from "../config/db";

interface CreateRestaurantInput {
    name: string;
    address: string;
    ownerId: string;
}

export const createRestaurant = async (data: CreateRestaurantInput) => {
    return await prisma.restaurant.create({
        data: {
            name: data.name,
            address: data.address,
            ownerId: data.ownerId,
            isOnline: true
        },
        include: {
            owner: {
                select: { name: true, email: true }
            }
        }
    });
};

export const updateRestaurantStatus = async (id: string, ownerId: string, isOnline: boolean) => {
    const restaurant = await prisma.restaurant.findFirst({
        where: { id, ownerId }
    });

    if (!restaurant) {
        throw new Error('Restaurant not found or unauthorized');
    }

    return await prisma.restaurant.update({
        where: { id },
        data: { isOnline }
    });
};

export const getRestaurantsByOwner = async (ownerId: string) => {
    return await prisma.restaurant.findMany({
        where: { ownerId },
        include: {
            menuItems: true,
            _count: {
                select: { orders: true }
            }
        }
    });
};