import prisma from '../config/db';
import { RatingType } from '@prisma/client';

interface CreateRatingInput {
    userId: string;
    orderId: string;
    ratingType: RatingType;
    rating: number;
    comment?: string;
}

export const createRating = async (data: CreateRatingInput) => {
    const { userId, orderId, ratingType, rating, comment } = data;

    const order = await prisma.order.findFirst({
        where: { id: orderId, userId, status: 'delivered' }
    });
    if (!order) throw new Error('Order not found or not delivered');

    const existingRating = await prisma.rating.findFirst({
        where: { orderId, userId, ratingType }
    });
    if (existingRating) throw new Error('Rating already exists for this order');

    return await prisma.rating.create({
        data: { userId, orderId, ratingType, rating, comment }
    });
};
