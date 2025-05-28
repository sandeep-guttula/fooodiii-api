import { Request, Response } from 'express';
import { addMenuItem, updateMenuItem, deleteMenuItem, getMenuItems } from '../services/menu.service';

export const createMenuItem = async (req: Request, res: Response): Promise<void> => {
    try {
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