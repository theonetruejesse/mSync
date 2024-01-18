/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,type]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contact";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Membership";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Role";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AdminContact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,
    CONSTRAINT "AdminContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClientContact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,
    CONSTRAINT "ClientContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminMembership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "AdminMembership_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AdminMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClientMembership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelId" INTEGER NOT NULL,
    "channelType" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "ClientMembership_channelId_channelType_fkey" FOREIGN KEY ("channelId", "channelType") REFERENCES "Channel" ("id", "type") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClientMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminContact_userId_key" ON "AdminContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminContact_contact_key" ON "AdminContact"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "ClientContact_userId_key" ON "ClientContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientContact_contact_key" ON "ClientContact"("contact");

-- CreateIndex
CREATE INDEX "AdminMembership_channelId_userId_idx" ON "AdminMembership"("channelId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminMembership_channelId_userId_key" ON "AdminMembership"("channelId", "userId");

-- CreateIndex
CREATE INDEX "ClientMembership_channelId_userId_idx" ON "ClientMembership"("channelId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientMembership_channelType_userId_key" ON "ClientMembership"("channelType", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientMembership_channelId_userId_key" ON "ClientMembership"("channelId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_type_key" ON "Channel"("id", "type");
