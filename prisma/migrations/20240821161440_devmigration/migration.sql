-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "picture" TEXT,
    "createdAt" DATETIME  DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
