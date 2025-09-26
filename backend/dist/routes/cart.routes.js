import { Router } from 'express';
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cart.controller.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = Router();
// All cart routes require authentication
router.use(authenticateToken);
router.post('/add', addToCart);
router.get('/', getCart);
router.put('/item/:id', updateCartItem);
router.delete('/item/:id', removeFromCart);
router.delete('/clear', clearCart);
export default router;
//# sourceMappingURL=cart.routes.js.map