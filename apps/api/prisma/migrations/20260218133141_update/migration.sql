/*
  Warnings:

  - You are about to drop the `batches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `daily_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `email_digests_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "batches" DROP CONSTRAINT "batches_user_id_fkey";

-- DropForeignKey
ALTER TABLE "daily_logs" DROP CONSTRAINT "daily_logs_batch_id_fkey";

-- DropTable
DROP TABLE "batches";

-- DropTable
DROP TABLE "daily_logs";

-- DropTable
DROP TABLE "email_digests_log";

-- DropTable
DROP TABLE "users";
