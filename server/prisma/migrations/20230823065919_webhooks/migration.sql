/*
  Warnings:

  - Added the required column `webhookId` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webhookToken` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "webhookToken" TEXT NOT NULL
);
INSERT INTO "new_Channel" ("discordId", "id", "name") SELECT "discordId", "id", "name" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");
CREATE UNIQUE INDEX "Channel_discordId_key" ON "Channel"("discordId");
CREATE UNIQUE INDEX "Channel_webhookId_key" ON "Channel"("webhookId");
CREATE UNIQUE INDEX "Channel_webhookToken_key" ON "Channel"("webhookToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
