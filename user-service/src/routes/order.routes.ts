import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/order.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateOrder } from '../../../shared/middleware/validation.middleware';


const router = Router();
router.post('/', authenticateToken, validateOrder, createOrder);
router.get('/', authenticateToken, getOrders);

export default router;