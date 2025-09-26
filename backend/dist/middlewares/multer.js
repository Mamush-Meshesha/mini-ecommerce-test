import multer from 'multer';
import path from 'path';
// File filter function
const fileFilter = (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'));
    }
};
// Multer configuration for memory storage (temporary)
const storage = multer.memoryStorage();
// Create multer instance with file size limit and filter
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});
// Specific upload configurations
export const uploadSingle = (fieldName) => upload.single(fieldName);
export const uploadMultiple = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount);
// For profile image upload
export const uploadProfileImage = uploadSingle('profileImage');
// For product image upload
export const uploadProductImage = uploadSingle('productImage');
export const uploadProductImages = uploadMultiple('productImages', 5);
// Disk storage configuration (alternative for local development)
export const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
export const uploadToDisk = multer({
    storage: diskStorage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});
//# sourceMappingURL=multer.js.map