-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CLOTHES', 'ELECTRONICS', 'FURNITURE', 'TOYS', 'BOOKS');

-- CreateTable
CREATE TABLE "Ads" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "contact" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "adId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ads_slug_key" ON "Ads"("slug");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
