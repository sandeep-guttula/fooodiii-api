import { Router } from 'express';
import {
    createMenuItem,
    updateMenuItemController,
    deleteMenuItemController,
    getRestaurantMenu
} from '../controllers/menu.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';
import { validateMenuItem, validateUUIDParam } from '../../../shared/middleware/validation.middleware';

const router = Router();

router.post('/', authenticateToken, requireRole('restaurant_owner'), validateMenuItem, createMenuItem);
router.put('/:id', authenticateToken, requireRole('restaurant_owner'), validateUUIDParam('id'), validateMenuItem, updateMenuItemController);
router.delete('/:id', authenticateToken, requireRole('restaurant_owner'), validateUUIDParam('id'), deleteMenuItemController);
router.get('/restaurant/:restaurantId', validateUUIDParam('restaurantId'), getRestaurantMenu);

export default router;