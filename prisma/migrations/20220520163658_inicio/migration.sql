/*
  Warnings:

  - You are about to drop the column `incio` on the `partidas` table. All the data in the column will be lost.
  - Added the required column `inicio` to the `partidas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "partidas" DROP COLUMN "incio",
ADD COLUMN     "inicio" TIMESTAMP(3) NOT NULL;
