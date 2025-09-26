import { Router } from 'express';
import { 
  createPaymentRequest, 
  getPaymentRequests, 
  getPaymentRequest, 
  approvePaymentRequest, 
  rejectPaymentRequest, 
  confirmPaymentRequest 
} from '../controllers/payment.controller.js';
import { authenticateToken, requireAdmin, requireSuperAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// All payment routes require authentication
router.use(authenticateToken);

// User routes
router.post('/', createPaymentRequest);
router.get('/', getPaymentRequests);
router.get('/:id', getPaymentRequest);

// Admin routes
router.put('/:id/approve', requireAdmin, approvePaymentRequest);
router.put('/:id/reject', requireAdmin, rejectPaymentRequest);

// Super admin routes
router.put('/:id/confirm', requireSuperAdmin, confirmPaymentRequest);

export default router;
