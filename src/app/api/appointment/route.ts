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
        utilisateurId: user.id
      }
    });

    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch (error: any) {
    console.error('Error saving appointment:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to save appointment' },
      { status: 500 }
    );
  }
}
