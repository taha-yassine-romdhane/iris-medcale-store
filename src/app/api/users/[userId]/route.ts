import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';


export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const id = params.userId;

  if (!prisma) {
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
    const data = await request.json();

    // Check if user exists
    const existingUser = await prisma.utilisateur.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = { ...data }; // Use const instead of let
    if (data.motDePasse) {
      updateData.motDePasse = await hash(data.motDePasse, 10);
    }

    // Update user
    const updatedUser = await prisma.utilisateur.update({
      where: { id },
      data: updateData,
    });

    const { motDePasse: _, ...userWithoutPassword } = updatedUser; // eslint-disable-line @typescript-eslint/no-unused-vars
    return NextResponse.json(userWithoutPassword);
  } catch (error: unknown) {
    console.error('Error updating user:', error);

    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update user' },
      { status: 500 }
    );
  }
}



export async function DELETE(request: Request) {
  try {
    // Extract userId from the request URL
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop(); // Extract the last segment of the URL

    console.log('DELETE request received for user ID:', userId);

    // Validate userId
    if (!userId) {
      console.error('User ID is required');
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if the user exists
    const existingUser = await prisma.utilisateur.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      console.error('User not found:', userId);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Attempt to delete the user
    console.log('Deleting user:', userId);
    await prisma.utilisateur.delete({
      where: { id: userId },
    });

    console.log('User deleted successfully:', userId);
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);

    // Handle Prisma-specific errors
    if (error instanceof Error && 'code' in error) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      if (error.code === 'P2003') {
        return NextResponse.json(
          { error: 'Cannot delete user due to related records' },
          { status: 400 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}


