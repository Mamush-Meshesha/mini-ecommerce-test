import { Role } from '@prisma/client';
export interface JwtPayload {
    userId: string;
    email: string;
    role: Role;
}
export declare const generateToken: (payload: JwtPayload) => string;
export declare const verifyToken: (token: string) => JwtPayload;
//# sourceMappingURL=jwt.utils.d.ts.map