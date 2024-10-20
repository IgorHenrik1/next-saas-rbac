/*
  Warnings:

  - Made the column `slug` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "slug" SET NOT NULL;
