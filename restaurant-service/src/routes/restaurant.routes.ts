import { Router } from 'express';
import { addRestaurant, updateStatus, getMyRestaurants } from '../controllers/restaurant.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticateToken, requireRole('restaurant_owner'), addRestaurant);
router.put('/:id/status', authenticateToken, requireRole('restaurant_owner', 'admin'), updateStatus);
router.get('/my-restaurants', authenticateToken, requireRole('restaurant_owner'), getMyRestaurants);

export default router;