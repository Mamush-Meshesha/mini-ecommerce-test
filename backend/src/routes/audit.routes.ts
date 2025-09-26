import { Router } from 'express';
import { getAuditLogs } from '../middlewares/auditLog.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Admin only routes
router.get('/', authenticateToken, requireAdmin, getAuditLogs);

export default router;
