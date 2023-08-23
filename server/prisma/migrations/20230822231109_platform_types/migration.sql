/*
  Warnings:

  - Added the required column `platform` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("contact", "id", "userId") SELECT "contact", "id", "userId" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE UNIQUE INDEX "Contact_contact_key" ON "Contact"("contact");
CREATE UNIQUE INDEX "Contact_userId_platform_key" ON "Contact"("userId", "platform");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
