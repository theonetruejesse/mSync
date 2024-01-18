-- DropIndex
DROP INDEX "Membership_userId_idx";

-- DropIndex
DROP INDEX "Membership_channelId_idx";

-- CreateIndex
CREATE INDEX "Membership_channelId_userId_idx" ON "Membership"("channelId", "userId");
