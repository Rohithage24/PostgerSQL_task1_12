/*
  Warnings:

  - A unique constraint covering the columns `[ShopName]` on the table `shopRegister` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Mobile]` on the table `shopRegister` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Gmail]` on the table `shopRegister` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Gmail` to the `shopRegister` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `shopRegister` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shopRegister" ADD COLUMN     "Gmail" TEXT NOT NULL,
ADD COLUMN     "Status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shopRegister_ShopName_key" ON "shopRegister"("ShopName");

-- CreateIndex
CREATE UNIQUE INDEX "shopRegister_Mobile_key" ON "shopRegister"("Mobile");

-- CreateIndex
CREATE UNIQUE INDEX "shopRegister_Gmail_key" ON "shopRegister"("Gmail");
