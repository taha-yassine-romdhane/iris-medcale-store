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
        utilisateurId: user.id
      }
    });

    return NextResponse.json({ success: true, contact });
  } catch (error: any) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to save message' },
      { status: 500 }
    );
  }
}
