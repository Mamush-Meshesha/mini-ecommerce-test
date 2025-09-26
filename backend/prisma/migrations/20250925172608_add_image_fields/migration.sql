-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imagePublicId" TEXT,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "profileImagePublicId" TEXT;
