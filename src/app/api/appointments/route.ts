import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        dateCreation: 'desc'
      },
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            adresse: true,
            ville: true,
            codePostal: true
          }
        }
      }
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error in appointments API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.appointment.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}
