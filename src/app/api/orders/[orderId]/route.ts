import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get('authorization');
    console.log('Auth header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    console.log('Decoded token:', decoded);

    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user role
    const user = await prisma.utilisateur.findUnique({
      where: { id: decoded.id },
      select: { role: true },
    });
    console.log('User role:', user?.role);

    if (!user || (user.role !== 'ADMIN' && user.role !== 'EMPLOYE')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Required role: ADMIN or EMPLOYE, Current role: ' + user?.role },
        { status: 403 }
      );
    }

    // Extract orderId from the URL
    const orderId = req.nextUrl.pathname.split('/').pop();
    console.log('Order ID:', orderId);

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Order ID is required' },
        { status: 400 }
      );
    }

    // First delete all order items
    await prisma.commandeItem.deleteMany({
      where: { commandeId: orderId },
    });

    // Then delete the order
    await prisma.commande.delete({
      where: { id: orderId },
    });

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
