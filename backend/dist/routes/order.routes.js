import { Router } from 'express';
import { createOrder, getOrders, getOrder, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';
const router = Router();
// User routes (require authentication)
router.use(authenticateToken);
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
// Admin routes
router.get('/admin/all', requireAdmin, getAllOrders);
router.put('/admin/:id/status', requireAdmin, updateOrderStatus);
export default router;
//# sourceMappingURL=order.routes.js.map