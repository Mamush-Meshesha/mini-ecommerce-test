import { v2 as cloudinary } from 'cloudinary';
import type { Request, Response, NextFunction } from 'express';
import streamifier from 'streamifier';


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Upload image to Cloudinary
export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string = 'mini-ecommerce'
): Promise<{ secure_url: string; public_id: string }> => {
  // Log the file info first
  console.log('📦 Received file for Cloudinary upload:', {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    hasBuffer: !!file.buffer,
  });
  console.log('Target folder:', folder);

  return new Promise((resolve, reject) => {
    // Create upload stream without transformations
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto', // lets Cloudinary detect file type automatically
      },
      (error, result) => {
        if (error || !result) {
          console.error('❌ Cloudinary upload error:', error);
          return reject(new Error('Failed to upload image to Cloudinary'));
        }

        console.log('✅ Cloudinary upload success:', {
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    console.log('🚀 Starting stream to Cloudinary...');
    // Stream the in-memory buffer directly
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};


// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

// Middleware to validate Cloudinary configuration
export const validateCloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    return res.status(500).json({ 
      message: 'Cloudinary configuration is missing. Please check environment variables.' 
    });
  }
  next();
};

export { cloudinary };