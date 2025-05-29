import { Request, Response } from 'express';
import { addMenuItem, updateMenuItem, deleteMenuItem, getMenuItems } from '../services/menu.service';
import prisma from '../config/db';


export const createMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {

        const user = (req as any).user;
        if (!user || user.role !== 'restaurant_owner') {
            res.status(403).json({ error: 'Forbidden: Only restaurant owners can create menu items' });
            return;
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: req.body.restaurantId,
                ownerId: user.id
            }
        });

        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not found or you do not have permission to add items' });
            return;
        }

        if (!req.body.name || !req.body.price || !req.body.restaurantId) {
            res.status(400).json({ error: 'Name, price, and restaurantId are required' });
            return;
        }

        const menuItem = await addMenuItem(req.body);

        res.status(201).json({
            message: 'Menu item created successfully',
            data: menuItem
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateMenuItemController = async (req: Request, res: Response): Promise<void> => {
    try {


        const { id } = req.params;

        const menuItem = await updateMenuItem(id, req.body);
        res.status(200).json({
            message: 'Menu item updated successfully',
            data: menuItem
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteMenuItemController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteMenuItem(id);
        res.status(200).json({
            message: 'Menu item deleted successfully'
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getRestaurantMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurantId } = req.params;
        const menuItems = await getMenuItems(restaurantId);
        res.status(200).json({
            message: 'Menu items retrieved successfully',
            data: menuItems
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};