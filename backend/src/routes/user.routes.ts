import { Router } from 'express';
import { 
  getAllUsers, 
  updateUserRole, 
  deleteUser 
} from '../controllers/user.controller.js';
import { authenticateToken, requireSuperAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// All user management routes require authentication and super admin privileges
router.use(authenticateToken);
router.use(requireSuperAdmin);

router.get('/admin/all', getAllUsers);
router.put('/admin/:id/role', updateUserRole);
router.delete('/admin/:id', deleteUser);

export default router;