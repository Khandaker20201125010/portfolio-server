/*
  Warnings:

  - You are about to drop the column `repoUrl` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "repoUrl",
ADD COLUMN     "backendRepoUrl" TEXT,
ADD COLUMN     "frontendRepoUrl" TEXT;
