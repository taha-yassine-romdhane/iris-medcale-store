/*
  Warnings:

  - You are about to drop the column `stockStatus` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "stockStatus",
ADD COLUMN     "stock" "StockStatus" NOT NULL DEFAULT 'IN_STOCK';
