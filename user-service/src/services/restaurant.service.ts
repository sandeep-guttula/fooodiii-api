import prisma from '@shared/database/prisma';

export const getOnlineRestaurants = async () => {
    return await prisma.restaurant.findMany({
        where: { isOnline: true },
        include: {
            menuItems: {
                where: { isAvailable: true }
            },
            owner: {
                select: { name: true, email: true }
            }
        }
    });
};