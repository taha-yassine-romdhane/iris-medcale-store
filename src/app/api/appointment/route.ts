import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { appointment, user } = data;

    if (!appointment || !user) {
      return NextResponse.json(
        { error: 'Appointment and user information are required' },
        { status: 400 }
      );
    }

    // Create the appointment date by combining date and time
    const dateRdv = new Date(appointment.date + 'T' + appointment.time);

    // Save appointment to database
    const newAppointment = await prisma.appointment.create({
      data: {
        dateRdv,
        motif: appointment.reason,
        utilisateurId: user.id,
      },
    });

    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error('Error saving appointment:', error);

    // Handle the error safely
    let errorMessage = 'Failed to save appointment';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}