import { Router } from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import categoryRoutes from './category.routes.js';
import cartRoutes from './cart.routes.js';
import orderRoutes from './order.routes.js';
import paymentRoutes from './payment.routes.js';
import auditRoutes from './audit.routes.js';
import uploadRoutes from './upload.routes.js';
import userRoutes from './user.routes.js';
const router = Router();
// Mount all routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/audit', auditRoutes);
router.use('/upload', uploadRoutes);
router.use('/users', userRoutes);
export default router;
//# sourceMappingURL=index.js.map