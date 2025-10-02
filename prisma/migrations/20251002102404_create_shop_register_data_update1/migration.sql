/*
  Warnings:

  - Added the required column `Address` to the `shopRegister` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerCare` to the `shopRegister` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Pincode` to the `shopRegister` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ShopName` to the `shopRegister` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `shopRegister` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."shopRegister" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "CustomerCare" VARCHAR(15) NOT NULL,
ADD COLUMN     "Pincode" VARCHAR(6) NOT NULL,
ADD COLUMN     "ShopName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
