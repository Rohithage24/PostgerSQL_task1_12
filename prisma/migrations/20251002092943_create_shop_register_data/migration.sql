/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `MobileLogin` will be added. If there are existing duplicate values, this will fail.
  - Made the column `Name` on table `MobileLogin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `MobileLogin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userName` on table `MobileLogin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."MobileLogin" ALTER COLUMN "Name" SET NOT NULL,
ALTER COLUMN "otp" DROP NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "userName" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."shopRegister" (
    "Id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "Mobile" TEXT NOT NULL,
    "aadhaarFront" TEXT NOT NULL,
    "aadhaarBack" TEXT NOT NULL,
    "interiorPhoto" TEXT NOT NULL,
    "exteriorPhoto" TEXT NOT NULL,

    CONSTRAINT "shopRegister_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopRegister_Mobile_key" ON "public"."shopRegister"("Mobile");

-- CreateIndex
CREATE UNIQUE INDEX "MobileLogin_userName_key" ON "public"."MobileLogin"("userName");

-- AddForeignKey
ALTER TABLE "public"."shopRegister" ADD CONSTRAINT "shopRegister_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."MobileLogin"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
