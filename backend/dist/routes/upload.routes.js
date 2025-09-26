import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { validateCloudinaryConfig } from '../middlewares/cloudinary.js';
import { uploadProductImage, uploadProfileImage } from '../middlewares/multer.js';
import { createProduct } from '../controllers/product.controller.js';
import { updateProfile } from '../controllers/auth.controller.js';
const router = Router();
// Apply authentication and Cloudinary validation to all routes
router.use(authenticateToken);
router.use(validateCloudinaryConfig);
/**
 * @swagger
 * /api/upload/product:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Create product with image upload
 *     description: Create a new product with image upload (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               price:
 *                 type: number
 *                 description: Product price
 *               stock:
 *                 type: integer
 *                 description: Stock quantity
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *                 description: Category ID (optional)
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: Product image file
 *             required:
 *               - name
 *               - price
 *               - stock
 *     responses:
 *       201:
 *         description: Product created successfully with image
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/product', uploadProductImage, createProduct);
/**
 * @swagger
 * /api/upload/profile:
 *   put:
 *     tags:
 *       - Upload
 *     summary: Update profile with image upload
 *     description: Update user profile with optional image upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/profile', uploadProfileImage, updateProfile);
export default router;
//# sourceMappingURL=upload.routes.js.map