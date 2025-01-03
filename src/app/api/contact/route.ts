import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { message, user } = data;

    if (!message || !user) {
      return NextResponse.json(
        { error: 'Message and user information are required' },
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
    // Handle the error safely
    console.error('Error saving contact:', error);

    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'Failed to save message' },
        { status: 500 }
      );
    }

    // Fallback for unknown errors
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  }
}