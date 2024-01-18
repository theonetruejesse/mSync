/*
  Warnings:

  - You are about to drop the `DiscordContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TwilioContact` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DiscordContact_discordId_key";

-- DropIndex
DROP INDEX "DiscordContact_userId_key";

-- DropIndex
DROP INDEX "TwilioContact_contact_key";

-- DropIndex
DROP INDEX "TwilioContact_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DiscordContact";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TwilioContact";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

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
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "User_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "UserType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("id", "name") SELECT "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_typeId_key" ON "User"("typeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UserType_name_key" ON "UserType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_key" ON "Contact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_contact_key" ON "Contact"("contact");
