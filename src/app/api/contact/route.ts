import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { message, user } = data;

    if (!message || !user || !user.id) {
      return NextResponse.json(
        { error: 'Le message et les informations utilisateur sont requis' },
        { status: 400 }
      );
    }

    // Save contact message to database
    const contact = await prisma.contact.create({
      data: {
        message,
        utilisateurId: user.id,
      },
    });

    return NextResponse.json({ success: true, contact });
  } catch (error: unknown) {
    console.error('Error saving contact:', error);

    // Return a user-friendly error message
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message" },
      { status: 500 }
    );
  }
}