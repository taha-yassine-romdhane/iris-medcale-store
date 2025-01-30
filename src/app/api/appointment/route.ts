import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Guest user account ID for all guest appointments
const GUEST_USER_ID = 'cm6iok3fw0008bq2klp8oqzak';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { appointment, user, isGuest } = data;

    if (!appointment) {
      return NextResponse.json(
        { error: 'Les informations de rendez-vous sont requises' },
        { status: 400 }
      );
    }

    // Create the appointment date by combining date and time
    const dateRdv = new Date(`${appointment.date}T${appointment.time}`);

    // For guests, include their details in the reason
    const appointmentReason = isGuest ? `
Guest Appointment:
Name: ${user.nom}
Email: ${user.email}
${user.telephone ? `Phone: ${user.telephone}\n` : ''}
Reason:
${appointment.reason}` : appointment.reason;

    // Save appointment to database
    const newAppointment = await prisma.appointment.create({
      data: {
        dateRdv,
        motif: appointmentReason,
        status: 'EN_ATTENTE',
        utilisateurId: isGuest ? GUEST_USER_ID : user.id
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