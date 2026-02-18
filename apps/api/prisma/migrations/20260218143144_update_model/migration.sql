/*
  Warnings:

  - You are about to drop the column `createdAt` on the `DailyLog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `DailyLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyLog" DROP COLUMN "createdAt",
DROP COLUMN "userId";
