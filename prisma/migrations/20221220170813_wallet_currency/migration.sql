-- CreateTable
CREATE TABLE `Wallet` (
    `id_wallet` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id_wallet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Currency` (
    `id_currency` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `walletId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Currency_walletId_key`(`walletId`),
    PRIMARY KEY (`id_currency`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Currency` ADD CONSTRAINT `Currency_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id_wallet`) ON DELETE RESTRICT ON UPDATE CASCADE;
