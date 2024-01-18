-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Membership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER,
    CONSTRAINT "Membership_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Membership_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Membership" ("channelId", "id", "roleId", "userId") SELECT "channelId", "id", "roleId", "userId" FROM "Membership";
DROP TABLE "Membership";
ALTER TABLE "new_Membership" RENAME TO "Membership";
CREATE INDEX "Membership_channelId_idx" ON "Membership"("channelId");
CREATE INDEX "Membership_userId_idx" ON "Membership"("userId");
CREATE INDEX "Membership_roleId_idx" ON "Membership"("roleId");
CREATE UNIQUE INDEX "Membership_channelId_userId_key" ON "Membership"("channelId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
