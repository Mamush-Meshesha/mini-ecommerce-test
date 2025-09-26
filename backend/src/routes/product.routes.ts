import { Router } from 'express';
import { 
  createProduct, 
  getProducts, 
  getProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/product.controller.js';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware.js';
import { uploadSingle } from '../middlewares/multer.js';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin only routes
router.post('/', authenticateToken, requireAdmin, uploadSingle('image'), createProduct);
router.put('/:id', authenticateToken, requireAdmin, uploadSingle('image'), updateProduct);
router.delete('/:id', authenticateToken, requireAdmin, deleteProduct);

export default router;
