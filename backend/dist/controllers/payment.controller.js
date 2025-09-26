import { prisma } from '../utils/prisma.utils.js';
import { PaymentStatus, Role } from '@prisma/client';
/**
 * @swagger
 * /api/payments/request:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Create payment request
 *     description: Create a new payment request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 0
 *                 description: Payment amount
 *             required:
 *               - amount
 *           example:
 *             amount: 299.99
 *     responses:
 *       201:
 *         description: Payment request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 paymentRequest:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const createPaymentRequest = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { amount } = req.body;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Valid amount is required' });
        }
        const paymentRequest = await prisma.paymentRequest.create({
            data: {
                userId,
                amount: parseFloat(amount),
                status: PaymentStatus.PENDING
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        // Log audit trail
        await prisma.auditLog.create({
            data: {
                userId,
                action: 'CREATE',
                entity: 'PaymentRequest',
                entityId: paymentRequest.id,
                roleAtTime: req.user.role
            }
        });
        res.status(201).json({
            message: 'Payment request created successfully',
            paymentRequest
        });
    }
    catch (error) {
        console.error('Create payment request error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
/**
 * @swagger
 * /api/payments/requests:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get payment requests
 *     description: Retrieve payment requests (Admin sees all, users see their own)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - name: status
 *         in: query
 *         description: Filter by payment status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [PENDING, APPROVED_BY_ADMIN, REJECTED_BY_ADMIN, CONFIRMED_BY_SUPER_ADMIN]
 *     responses:
 *       200:
 *         description: Payment requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentRequests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getPaymentRequests = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const userRole = req.user?.role;
        const { status, page = 1, limit = 10 } = req.query;
        if (!userId || !userRole) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        let where = {};
        // Regular users can only see their own payment requests
        if (userRole === Role.USER) {
            where.userId = userId;
        }
        // Filter by status if provided
        if (status) {
            where.status = status;
        }
        const [paymentRequests, total] = await Promise.all([
            prisma.paymentRequest.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    admin: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    superAdmin: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
                skip,
                take: parseInt(limit),
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.paymentRequest.count({ where })
        ]);
        res.json({
            paymentRequests,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Get payment requests error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
/**
 * @swagger
 * /api/payments/requests/{id}:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get payment request by ID
 *     description: Retrieve a specific payment request by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Payment request ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Payment request retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentRequest:
 *                   $ref: '#/components/schemas/Payment'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getPaymentRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        const userRole = req.user?.role;
        if (!userId || !userRole) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const paymentRequest = await prisma.paymentRequest.findUnique({
            where: { id: id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                superAdmin: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        if (!paymentRequest) {
            return res.status(404).json({ message: 'Payment request not found' });
        }
        // Regular users can only see their own payment requests
        if (userRole === Role.USER && paymentRequest.userId !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.json({ paymentRequest });
    }
    catch (error) {
        console.error('Get payment request error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
/**
 * @swagger
 * /api/payments/requests/{id}/approve:
 *   put:
 *     tags:
 *       - Payments
 *     summary: Approve payment request
 *     description: Approve a payment request (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Payment request ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Payment request approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 paymentRequest:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const approvePaymentRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        const userRole = req.user?.role;
        if (!userId || userRole !== Role.ADMIN && userRole !== Role.SUPER_ADMIN) {
            return res.status(403).json({ message: 'Admin access required' });
        }
        const paymentRequest = await prisma.paymentRequest.findUnique({
            where: { id: id }
        });
        if (!paymentRequest) {
            return res.status(404).json({ message: 'Payment request not found' });
        }
        if (paymentRequest.status !== PaymentStatus.PENDING) {
            return res.status(400).json({ message: 'Payment request is not in pending status' });
        }
        const updatedPaymentRequest = await prisma.paymentRequest.update({
            where: { id: id },
            data: {
                status: PaymentStatus.APPROVED_BY_ADMIN,
                approvedByAdminId: userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        // Log audit trail
        await prisma.auditLog.create({
            data: {
                userId,
                action: 'APPROVE',
                entity: 'PaymentRequest',
                entityId: id,
                roleAtTime: userRole
            }
        });
        res.json({
            message: 'Payment request approved successfully',
            paymentRequest: updatedPaymentRequest
        });
    }
    catch (error) {
        console.error('Approve payment request error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
/**
 * @swagger
 * /api/payments/requests/{id}/reject:
 *   put:
 *     tags:
 *       - Payments
 *     summary: Reject payment request
 *     description: Reject a payment request (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Payment request ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Payment request rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 paymentRequest:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const rejectPaymentRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        const userRole = req.user?.role;
        if (!userId || userRole !== Role.ADMIN && userRole !== Role.SUPER_ADMIN) {
            return res.status(403).json({ message: 'Admin access required' });
        }
        const paymentRequest = await prisma.paymentRequest.findUnique({
            where: { id: id }
        });
        if (!paymentRequest) {
            return res.status(404).json({ message: 'Payment request not found' });
        }
        if (paymentRequest.status !== PaymentStatus.PENDING) {
            return res.status(400).json({ message: 'Payment request is not in pending status' });
        }
        const updatedPaymentRequest = await prisma.paymentRequest.update({
            where: { id: id },
            data: {
                status: PaymentStatus.REJECTED_BY_ADMIN,
                approvedByAdminId: userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        // Log audit trail
        await prisma.auditLog.create({
            data: {
                userId,
                action: 'REJECT',
                entity: 'PaymentRequest',
                entityId: id,
                roleAtTime: userRole
            }
        });
        res.json({
            message: 'Payment request rejected successfully',
            paymentRequest: updatedPaymentRequest
        });
    }
    catch (error) {
        console.error('Reject payment request error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
/**
 * @swagger
 * /api/payments/requests/{id}/confirm:
 *   put:
 *     tags:
 *       - Payments
 *     summary: Confirm payment request
 *     description: Confirm a payment request (Super Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Payment request ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Payment request confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 paymentRequest:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const confirmPaymentRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        const userRole = req.user?.role;
        if (!userId || userRole !== Role.SUPER_ADMIN) {
            return res.status(403).json({ message: 'Super admin access required' });
        }
        const paymentRequest = await prisma.paymentRequest.findUnique({
            where: { id: id }
        });
        if (!paymentRequest) {
            return res.status(404).json({ message: 'Payment request not found' });
        }
        if (paymentRequest.status !== PaymentStatus.APPROVED_BY_ADMIN) {
            return res.status(400).json({ message: 'Payment request must be approved by admin first' });
        }
        const updatedPaymentRequest = await prisma.paymentRequest.update({
            where: { id: id },
            data: {
                status: PaymentStatus.CONFIRMED_BY_SUPER_ADMIN,
                confirmedBySuperAdminId: userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                superAdmin: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        // Log audit trail
        await prisma.auditLog.create({
            data: {
                userId,
                action: 'CONFIRM',
                entity: 'PaymentRequest',
                entityId: id,
                roleAtTime: userRole
            }
        });
        res.json({
            message: 'Payment request confirmed successfully',
            paymentRequest: updatedPaymentRequest
        });
    }
    catch (error) {
        console.error('Confirm payment request error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//# sourceMappingURL=payment.controller.js.map