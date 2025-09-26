import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma.utils.js';

export const auditLog = (action: string, entity: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Only log if the request was successful (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        const entityId = req.params.id || 'unknown';
        
        // Log audit trail asynchronously to avoid blocking the response
        prisma.auditLog.create({
          data: {
            userId: req.user.userId,
            action,
            entity,
            entityId,
            roleAtTime: req.user.role
          }
        }).catch(error => {
          console.error('Audit log error:', error);
        });
      }
      
      return originalSend.call(this, data);
    };
    
    next();
  };
};

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const userRole = req.user?.role;
    const { page = 1, limit = 10, entity, action, userId } = req.query;

    if (!userRole || userRole === 'USER') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    let where: any = {};

    if (entity) where.entity = entity as string;
    if (action) where.action = action as string;
    if (userId) where.userId = userId as string;

    const [auditLogs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        skip,
        take: parseInt(limit as string),
        orderBy: {
          timestamp: 'desc'
        }
      }),
      prisma.auditLog.count({ where })
    ]);

    res.json({
      auditLogs,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
