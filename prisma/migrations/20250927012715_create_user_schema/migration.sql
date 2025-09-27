-- CreateTable
CREATE TABLE "public"."User" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT,
    "Mobile" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);
