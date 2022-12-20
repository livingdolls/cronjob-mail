/*
  Warnings:

  - A unique constraint covering the columns `[pin]` on the table `Mailer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Mailer_pin_key` ON `Mailer`(`pin`);
