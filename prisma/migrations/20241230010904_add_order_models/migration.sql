-- CreateEnum
CREATE TYPE "StatusCommande" AS ENUM ('EN_ATTENTE', 'CONFIRMEE', 'EN_COURS', 'LIVREE', 'ANNULEE');

-- CreateTable
CREATE TABLE "Commande" (
    "id" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateMiseAJour" TIMESTAMP(3) NOT NULL,
    "status" "StatusCommande" NOT NULL DEFAULT 'EN_ATTENTE',
    "total" DECIMAL(10,2) NOT NULL,
    "utilisateurId" TEXT NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandeItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "commandeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "CommandeItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeItem" ADD CONSTRAINT "CommandeItem_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeItem" ADD CONSTRAINT "CommandeItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
