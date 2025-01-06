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
    console.log('Received request to create user');

    const data = await request.json();
    console.log('Received data:', data);

    // Validate required fields
    if (!data.email || !data.motDePasse) {
      console.error('Validation failed: Email and password are required');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if the user already exists
    console.log('Checking for existing user with email:', data.email);
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      console.error('User already exists:', data.email);
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    console.log('Hashing password');
    const hashedPassword = await hash(data.motDePasse, 12);
    console.log('Password hashed successfully');

    // Create the user
    console.log('Creating user in database');
    const user = await prisma.utilisateur.create({
      data: {
        ...data,
        motDePasse: hashedPassword,
      },
    });
    console.log('User created successfully:', user);

    // Exclude the password from the response
    const userWithoutPassword = { ...user, motDePasse: undefined };
    delete userWithoutPassword.motDePasse;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);

    // Handle Prisma-specific errors
    if (error instanceof Error && 'code' in error) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
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
