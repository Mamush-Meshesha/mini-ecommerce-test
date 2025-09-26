import { v2 as cloudinary } from 'cloudinary';
import type { Request, Response, NextFunction } from 'express';
export declare const uploadToCloudinary: (file: Express.Multer.File, folder?: string) => Promise<{
    secure_url: string;
    public_id: string;
}>;
export declare const deleteFromCloudinary: (publicId: string) => Promise<void>;
export declare const validateCloudinaryConfig: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { cloudinary };
//# sourceMappingURL=cloudinary.d.ts.map