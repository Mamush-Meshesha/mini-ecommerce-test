import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { uploadProfileImage } from '../middlewares/multer.js';
const router = Router();
// Public routes
router.post('/register', register);
router.post('/login', login);
// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, uploadProfileImage, updateProfile);
export default router;
//# sourceMappingURL=auth.routes.js.map