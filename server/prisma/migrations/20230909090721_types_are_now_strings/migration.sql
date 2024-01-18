/*
  Warnings:

  - You are about to drop the `ChannelType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `typeId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `User` table. All the data in the column will be lost.
  - Added the required column `type` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ChannelType_name_key";

-- DropIndex
DROP INDEX "UserType_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ChannelType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserType";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "webhookToken" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Channel" ("discordId", "id", "name", "webhookId", "webhookToken") SELECT "discordId", "id", "name", "webhookId", "webhookToken" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");
CREATE UNIQUE INDEX "Channel_discordId_key" ON "Channel"("discordId");
CREATE UNIQUE INDEX "Channel_webhookId_key" ON "Channel"("webhookId");
CREATE UNIQUE INDEX "Channel_webhookToken_key" ON "Channel"("webhookToken");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "name") SELECT "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
