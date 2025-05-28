import { Router } from 'express';
import { getOrders, updateOrderStatusController } from '../controllers/order.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';
import { validateOrderStatus, validateUUIDParam } from '../../../shared/middleware/validation.middleware';

const router = Router();

router.get('/', authenticateToken, requireRole('restaurant_owner'), getOrders);
router.put('/:orderId/status', authenticateToken, requireRole('restaurant_owner'), validateUUIDParam('orderId'), validateOrderStatus, updateOrderStatusController);

export default router;