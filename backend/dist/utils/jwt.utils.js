import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign(payload, secret, { expiresIn: '7d' });
};
export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.verify(token, secret);
};
//# sourceMappingURL=jwt.utils.js.map