import { Router } from 'express';
import { getOrders, updateOrderStatusController } from '../controllers/order.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, requireRole('restaurant_owner'), getOrders);
router.put('/:orderId/status', authenticateToken, requireRole('restaurant_owner'), updateOrderStatusController);

export default router;