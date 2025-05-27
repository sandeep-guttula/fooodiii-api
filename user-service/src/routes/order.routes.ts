import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/order.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getOrders);

export default router;