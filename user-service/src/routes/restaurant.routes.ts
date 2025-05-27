import { Router } from 'express';
import { getRestaurants } from '../controllers/restaurant.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getRestaurants);


export default router;