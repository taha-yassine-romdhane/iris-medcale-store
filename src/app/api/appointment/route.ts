import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { appointment, user } = data;

    if (!appointment || !user) {
      return NextResponse.json(
        { error: 'Les informations de rendez-vous et utilisateur sont requises' },
        { status: 400 }
      );
    }

    // Create a proper date string from the selected day
    const [day, month, year] = new Date().toLocaleDateString('fr-FR').split('/');
    const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    // Create the appointment date by combining date and time
    const dateRdv = new Date(`${dateString}T${appointment.time}`);

    // Save appointment to database
    const newAppointment = await prisma.appointment.create({
      data: {
        dateRdv,
        motif: appointment.reason,
        status: 'EN_ATTENTE',
        utilisateurId: user.id
      },
    });

    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error('Error saving appointment:', error);

    // Handle the error safely
    let errorMessage = 'Échec de la sauvegarde du rendez-vous';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}