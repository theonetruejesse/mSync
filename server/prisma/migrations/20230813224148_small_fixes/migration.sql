/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Contact_platformId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Channel_discordId_key" ON "Channel"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- CreateIndex
CREATE INDEX "Contact_userId_platformId_idx" ON "Contact"("userId", "platformId");
