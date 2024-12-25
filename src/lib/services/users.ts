import prisma from '@/lib/prisma';

// Define the type for updating a user
type UserUpdateInput = {
  email?: string;
  motDePasse?: string;
  nom?: string;
  prenom?: string;
  role?: 'ADMIN' | 'EMPLOYE';
  actif?: boolean;
  telephone?: string;
  photo?: string;
};

export async function getUserById(id: string) {
  return await prisma.utilisateur.findUnique({
    where: { id },
  });
}

export async function updateUserById(id: string, data: UserUpdateInput) {
  return await prisma.utilisateur.update({
    where: { id },
    data,
  });
}