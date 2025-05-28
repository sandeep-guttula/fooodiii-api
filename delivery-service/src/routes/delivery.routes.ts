import { Router } from 'express';
import {
    getMyOrders,
    updateOrderStatus,
    updateAvailability,
    getDeliveryHistoryController
} from '../controllers/delivery.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';
import { validateDeliveryStatus, validateAvailability, validateUUIDParam } from '../../../shared/middleware/validation.middleware';

const router = Router();

router.get('/orders', authenticateToken, requireRole('delivery_agent'), getMyOrders);
router.put('/orders/:orderId/status', authenticateToken, requireRole('delivery_agent'), validateUUIDParam('orderId'), validateDeliveryStatus, updateOrderStatus);
router.put('/availability', authenticateToken, requireRole('delivery_agent'), validateAvailability, updateAvailability);
router.get('/history', authenticateToken, requireRole('delivery_agent'), getDeliveryHistoryController);

export default router;