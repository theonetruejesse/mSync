/*
  Warnings:

  - Added the required column `name` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Channel" ("discordId", "id") SELECT "discordId", "id" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
