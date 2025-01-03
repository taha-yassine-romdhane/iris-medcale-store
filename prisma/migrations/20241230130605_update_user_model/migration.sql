-- AlterEnum
ALTER TYPE "StatusCommande" ADD VALUE 'DEVIS';

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "adresse" TEXT,
ADD COLUMN     "codePostal" TEXT,
ADD COLUMN     "ville" TEXT,
ALTER COLUMN "nom" DROP NOT NULL,
ALTER COLUMN "prenom" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'CLIENT';
