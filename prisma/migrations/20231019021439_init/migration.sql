/*
  Warnings:

  - You are about to drop the column `user_role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `user_role`,
    ADD COLUMN `role` VARCHAR(191) NULL;
