import { prisma } from '../utils/prisma.utils.js';
export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, role } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const where = {};
        if (role) {
            where.role = role;
        }
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            orders: true,
                            cartItems: true
                        }
                    }
                },
                skip,
                take: parseInt(limit),
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.user.count({ where })
        ]);
        res.json({
            users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }
        const validRoles = ['USER', 'ADMIN', 'SUPER_ADMIN'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const user = await prisma.user.update({
            where: { id: id },
            data: { role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
        // Log audit trail
        if (req.user) {
            await prisma.auditLog.create({
                data: {
                    userId: req.user.userId,
                    action: 'UPDATE',
                    entity: 'User',
                    entityId: user.id,
                    roleAtTime: req.user.role,
                }
            });
        }
        res.json({
            message: 'User role updated successfully',
            user
        });
    }
    catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: id }
        });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Prevent deletion of super admin users
        if (existingUser.role === 'SUPER_ADMIN') {
            return res.status(403).json({ message: 'Cannot delete super admin users' });
        }
        // Delete user (this will cascade delete related cart items and orders due to foreign key constraints)
        await prisma.user.delete({
            where: { id: id }
        });
        // Log audit trail
        if (req.user) {
            await prisma.auditLog.create({
                data: {
                    userId: req.user.userId,
                    action: 'DELETE',
                    entity: 'User',
                    entityId: id,
                    roleAtTime: req.user.role,
                }
            });
        }
        res.json({
            message: 'User deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//# sourceMappingURL=user.controller.js.map