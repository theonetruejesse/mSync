/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contact";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Discord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "discordId" TEXT NOT NULL,
    CONSTRAINT "Discord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Twilio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,
    "channelId" INTEGER NOT NULL,
    CONSTRAINT "Twilio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Discord_userId_key" ON "Discord"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Discord_discordId_key" ON "Discord"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Twilio_userId_key" ON "Twilio"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Twilio_contact_key" ON "Twilio"("contact");
