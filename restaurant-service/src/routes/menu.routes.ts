import { Router } from 'express';
import {
    createMenuItem,
    updateMenuItemController,
    deleteMenuItemController,
    getRestaurantMenu
} from '../controllers/menu.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticateToken, requireRole('restaurant_owner'), createMenuItem);
router.put('/:id', authenticateToken, requireRole('restaurant_owner'), updateMenuItemController);
router.delete('/:id', authenticateToken, requireRole('restaurant_owner', 'admin'), deleteMenuItemController);
router.get('/restaurant/:restaurantId', getRestaurantMenu);

export default router;