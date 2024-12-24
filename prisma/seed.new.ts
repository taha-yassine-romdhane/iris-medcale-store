/* import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Delete existing records
  await prisma.Utilisateur.deleteMany();

  // Créer les utilisateurs
  const adminPassword = await bcrypt.hash('admin123', 10);
  const employePassword = await bcrypt.hash('employe123', 10);

  const admin = await prisma.Utilisateur.create({
    data: {
      email: 'admin@elitemedicale.com',
      motDePasse: adminPassword,
      nom: 'Admin',
      prenom: 'Super',
      role: 'ADMIN',
      telephone: '+216 XX XXX XXX',
      photo: '/avatars/admin.jpg',
    },
  });

  const employe = await prisma.Utilisateur.create({
    data: {
      email: 'employe@elitemedicale.com',
      motDePasse: employePassword,
      nom: 'Dupont',
      prenom: 'Jean',
      role: 'EMPLOYE',
      telephone: '+216 XX XXX XXX',
      photo: '/avatars/employe.jpg',
    },
  });

  console.log('Utilisateurs créés:', { admin, employe });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
  */
