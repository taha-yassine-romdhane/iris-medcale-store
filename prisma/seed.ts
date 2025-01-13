import { PrismaClient, RoleUtilisateur } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Delete existing records in the correct order
    console.log('Deleting existing records...');
    await prisma.utilisateur.deleteMany();

    console.log('Creating admin user...');
    // Create admin user
    const adminPassword = await bcrypt.hash('Admin123!', 10);
    const admin = await prisma.utilisateur.create({
      data: {
        email: 'admin@elite.com',
        motDePasse: adminPassword,
        nom: 'Admin',
        prenom: 'Elite',
        role: RoleUtilisateur.ADMIN,
        actif: true,
        telephone: '+216 00 000 000',
        adresse: 'Elite Medical Service',
        ville: 'Sousse',
        codePostal: '4000'
      },
    });

    console.log('Admin user created:', admin);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });