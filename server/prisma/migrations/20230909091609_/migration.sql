/*
  Warnings:

  - A unique constraint covering the columns `[contact]` on the table `Proxy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `Proxy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Proxy_contact_key" ON "Proxy"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Proxy_type_key" ON "Proxy"("type");
