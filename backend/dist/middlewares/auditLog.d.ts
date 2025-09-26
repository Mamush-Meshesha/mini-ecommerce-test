import type { Request, Response, NextFunction } from 'express';
export declare const auditLog: (action: string, entity: string) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAuditLogs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auditLog.d.ts.map