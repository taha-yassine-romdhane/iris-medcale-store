import  prisma  from '@/lib/prisma';

export async function getUserById(id: string) {
  return await prisma.utilisateur.findUnique({
    where: { id },
  });
}

export async function updateUserById(id: string, data: any) {
  return await prisma.utilisateur.update({
    where: { id },
    data,
  });
}