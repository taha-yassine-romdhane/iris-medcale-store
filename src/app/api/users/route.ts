import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';

export async function GET() {
  try {
    const users = await prisma.utilisateur.findMany({
      orderBy: {
        dateCreation: 'desc'
      }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
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
      }
    });

    // Don't send the password back
    const {...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
