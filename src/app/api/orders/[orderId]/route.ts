import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { StatusCommande } from '@prisma/client';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user role
    const user = await prisma.utilisateur.findUnique({
      where: { id: decoded.id },
      select: { role: true }
    });

    if (!user || (user.role !== 'ADMIN' && user.role !== 'EMPLOYE')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { orderId } = params;
    const body = await req.json();
    const { status } = body;

    if (!Object.values(StatusCommande).includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.commande.update({
      where: { id: orderId },
      data: { status: status },
      select: {
        id: true,
        dateCreation: true,
        status: true,
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user role
    const user = await prisma.utilisateur.findUnique({
      where: { id: decoded.id },
      select: { role: true }
    });

    if (!user || (user.role !== 'ADMIN' && user.role !== 'EMPLOYE')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { orderId } = params;

    // First delete all order items
    await prisma.commandeItem.deleteMany({
      where: { commandeId: orderId }
    });

    // Then delete the order
    await prisma.commande.delete({
      where: { id: orderId }
    });

    return NextResponse.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
