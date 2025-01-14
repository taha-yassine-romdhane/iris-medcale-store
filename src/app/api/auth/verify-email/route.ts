import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      );
    }

    // Update user and delete token
    await prisma.$transaction([
      prisma.utilisateur.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: true },
      }),
      prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      }),
    ]);

    return NextResponse.json({
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { error: 'An error occurred while verifying email' },
      { status: 500 }
    );
  }
}
