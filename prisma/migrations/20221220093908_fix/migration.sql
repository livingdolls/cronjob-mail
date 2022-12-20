-- DropForeignKey
ALTER TABLE `Mailer` DROP FOREIGN KEY `Mailer_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Mailer` ADD CONSTRAINT `Mailer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
