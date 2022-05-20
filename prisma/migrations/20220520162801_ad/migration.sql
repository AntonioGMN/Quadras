/*
  Warnings:

  - The primary key for the `participantes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `participanteId` on the `participantes` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `partidas` table. All the data in the column will be lost.
  - You are about to drop the column `localId` on the `partidas` table. All the data in the column will be lost.
  - You are about to drop the `locals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `participantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `partidas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `partidas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "participantes" DROP CONSTRAINT "participantes_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "partidas" DROP CONSTRAINT "partidas_localId_fkey";

-- AlterTable
ALTER TABLE "participantes" DROP CONSTRAINT "participantes_pkey",
DROP COLUMN "participanteId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "participantes_pkey" PRIMARY KEY ("partidaId", "userId");

-- AlterTable
ALTER TABLE "partidas" DROP COLUMN "data",
DROP COLUMN "localId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "local" TEXT NOT NULL;

-- DropTable
DROP TABLE "locals";

-- AddForeignKey
ALTER TABLE "participantes" ADD CONSTRAINT "participantes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
