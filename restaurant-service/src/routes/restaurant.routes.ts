import { Router } from 'express';
import { addRestaurant, updateStatus, getMyRestaurants } from '../controllers/restaurant.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';
import { validateRestaurant, validateRestaurantStatus, validateUUIDParam } from '../../../shared/middleware/validation.middleware';


const router = Router();

router.post('/', authenticateToken, requireRole('restaurant_owner'), validateRestaurant, addRestaurant);
router.put('/:id/status', authenticateToken, requireRole('restaurant_owner'), validateUUIDParam('id'), validateRestaurantStatus, updateStatus);
router.get('/my-restaurants', authenticateToken, requireRole('restaurant_owner'), getMyRestaurants);

export default router;