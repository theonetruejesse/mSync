/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contact";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DiscordContact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "discordId" TEXT NOT NULL,
    CONSTRAINT "DiscordContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TwilioContact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,
    CONSTRAINT "TwilioContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordContact_userId_key" ON "DiscordContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordContact_discordId_key" ON "DiscordContact"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "TwilioContact_userId_key" ON "TwilioContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TwilioContact_contact_key" ON "TwilioContact"("contact");
