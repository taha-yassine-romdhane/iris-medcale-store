import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';

export async function GET() {
  try {
    const users = await prisma.utilisateur.findMany({
      orderBy: {
        dateCreation: 'desc',
      },
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        role: true,
        telephone: true,
        dateCreation: true,
        dateMiseAJour: true,
        actif: true,
        adresse: true,
        ville: true,
        codePostal: true,
        photo: true,
        // Exclude motDePasse for security
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Hash the password
    const hashedPassword = await hash(data.motDePasse, 12);

    const user = await prisma.utilisateur.create({
      data: {
        ...data,
        motDePasse: hashedPassword,
      },
    });

    // Don't send the password back
    const userWithoutPassword = { ...user, motDePasse: undefined };
    delete userWithoutPassword.motDePasse;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
      );
    }

    // If password is being updated and not empty, hash it
    if (updateData.motDePasse) {
      updateData.motDePasse = await hash(updateData.motDePasse, 12);
    } else {
      // If password is empty or not provided, remove it from the update
      delete updateData.motDePasse;
    }

    const user = await prisma.utilisateur.update({
      where: { id },
      data: updateData,
    });

    // Don't send the password back
    const userWithoutPassword = { ...user, motDePasse: undefined };
    delete userWithoutPassword.motDePasse;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } } // Use params to get userId
) {
  try {
    const { userId } = params; // Extract userId from params

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
      );
    }

    await prisma.utilisateur.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}