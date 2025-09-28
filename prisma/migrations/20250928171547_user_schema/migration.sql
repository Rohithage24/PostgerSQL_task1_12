-- CreateTable
CREATE TABLE "public"."User" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT,
    "Mobile" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "public"."MobileLogin" (
    "Id" SERIAL NOT NULL,
    "Mobile" TEXT NOT NULL,
    "Name" TEXT,
    "otp" TEXT NOT NULL,

    CONSTRAINT "MobileLogin_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Mobile_key" ON "public"."User"("Mobile");

-- CreateIndex
CREATE UNIQUE INDEX "MobileLogin_Mobile_key" ON "public"."MobileLogin"("Mobile");
