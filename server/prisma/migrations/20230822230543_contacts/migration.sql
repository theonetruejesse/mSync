/*
  Warnings:

  - You are about to drop the column `discordId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twilioId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twilioId` on the `Channel` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,
    CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "name") SELECT "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL
);
INSERT INTO "new_Channel" ("discordId", "id", "name") SELECT "discordId", "id", "name" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");
CREATE UNIQUE INDEX "Channel_discordId_key" ON "Channel"("discordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_key" ON "Contact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_contact_key" ON "Contact"("contact");
