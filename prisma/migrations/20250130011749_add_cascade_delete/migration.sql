-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "CommandeItem" DROP CONSTRAINT "CommandeItem_commandeId_fkey";

-- DropForeignKey
ALTER TABLE "CommandeItem" DROP CONSTRAINT "CommandeItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeItem" ADD CONSTRAINT "CommandeItem_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeItem" ADD CONSTRAINT "CommandeItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
