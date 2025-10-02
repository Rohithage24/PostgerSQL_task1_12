/*
  Warnings:

  - The primary key for the `shopRegister` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `shopRegister` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."shopRegister_Mobile_key";

-- AlterTable
ALTER TABLE "public"."shopRegister" DROP CONSTRAINT "shopRegister_pkey",
DROP COLUMN "Id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "aadhaarFront" DROP NOT NULL,
ALTER COLUMN "aadhaarBack" DROP NOT NULL,
ALTER COLUMN "interiorPhoto" DROP NOT NULL,
ALTER COLUMN "exteriorPhoto" DROP NOT NULL,
ADD CONSTRAINT "shopRegister_pkey" PRIMARY KEY ("id");
