-- CreateTable
CREATE TABLE "public"."MobileLogin" (
    "Id" SERIAL NOT NULL,
    "Mobile" TEXT NOT NULL,
    "Name" TEXT,
    "otp" TEXT NOT NULL,

    CONSTRAINT "MobileLogin_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MobileLogin_Mobile_key" ON "public"."MobileLogin"("Mobile");
