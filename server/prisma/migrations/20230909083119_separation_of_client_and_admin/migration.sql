/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeId` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Contact_contact_key";

-- DropIndex
DROP INDEX "Contact_userId_key";

-- DropIndex
DROP INDEX "Membership_channelId_userId_key";

-- DropIndex
DROP INDEX "Membership_channelId_userId_idx";

-- DropIndex
DROP INDEX "Role_name_key";

-- DropIndex
DROP INDEX "User_discordId_key";

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
CREATE TABLE "ChannelType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AdminRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ClientRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AdminContact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "discordId" TEXT NOT NULL,
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
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "AdminMembership_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AdminMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AdminMembership_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "AdminRole" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClientMembership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "ClientMembership_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClientMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClientMembership_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ClientRole" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "webhookToken" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "Channel_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ChannelType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("discordId", "id", "name", "webhookId", "webhookToken") SELECT "discordId", "id", "name", "webhookId", "webhookToken" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");
CREATE UNIQUE INDEX "Channel_discordId_key" ON "Channel"("discordId");
CREATE UNIQUE INDEX "Channel_webhookId_key" ON "Channel"("webhookId");
CREATE UNIQUE INDEX "Channel_webhookToken_key" ON "Channel"("webhookToken");
CREATE UNIQUE INDEX "Channel_typeId_key" ON "Channel"("typeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ChannelType_name_key" ON "ChannelType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AdminRole_name_key" ON "AdminRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ClientRole_name_key" ON "ClientRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AdminContact_userId_key" ON "AdminContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminContact_discordId_key" ON "AdminContact"("discordId");

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
CREATE UNIQUE INDEX "ClientMembership_channelId_userId_key" ON "ClientMembership"("channelId", "userId");
