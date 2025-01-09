import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

enum StatusRdv {
  EN_ATTENTE = 'EN_ATTENTE',
  CONFIRME = 'CONFIRME',
  ANNULE = 'ANNULE'
}

export async function POST(request: Request) {
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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Échec de la sauvegarde du rendez-vous' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        dateCreation: 'desc',
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
            codePostal: true,
          },
        },
      },
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
    const { id } = (await request.json()) as { id: string };
    await prisma.appointment.delete({
      where: { id },
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

export async function PUT(request: Request) {
  try {
    const { id, status } = (await request.json()) as { id: string; status: StatusRdv };

    // Validate the status
    if (![StatusRdv.EN_ATTENTE, StatusRdv.CONFIRME, StatusRdv.ANNULE].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Update the appointment status in the database
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update appointment status' },
      { status: 500 }
    );
  }
}