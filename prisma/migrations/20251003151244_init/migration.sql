-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT,
    "Mobile" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "MobileLogin" (
    "Id" SERIAL NOT NULL,
    "Mobile" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "otp" TEXT,

    CONSTRAINT "MobileLogin_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "shopRegister" (
    "id" SERIAL NOT NULL,
    "ShopName" TEXT NOT NULL,
    "CustomerCare" VARCHAR(15) NOT NULL,
    "userId" INTEGER NOT NULL,
    "Mobile" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Pincode" VARCHAR(6) NOT NULL,
    "aadhaarFront" TEXT,
    "aadhaarBack" TEXT,
    "interiorPhoto" TEXT,
    "exteriorPhoto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shopRegister_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Mobile_key" ON "User"("Mobile");

-- CreateIndex
CREATE UNIQUE INDEX "MobileLogin_Mobile_key" ON "MobileLogin"("Mobile");

-- CreateIndex
CREATE UNIQUE INDEX "MobileLogin_userName_key" ON "MobileLogin"("userName");

-- AddForeignKey
ALTER TABLE "shopRegister" ADD CONSTRAINT "shopRegister_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MobileLogin"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
