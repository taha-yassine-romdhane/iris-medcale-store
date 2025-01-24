import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const userHeader = request.headers.get('Authorization-User');

    if (!authHeader || !userHeader) {
      return NextResponse.json({ error: 'Missing authentication headers' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const userData = JSON.parse(decodeURIComponent(userHeader));

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Verify that the token matches the user data
    if (decoded.id !== userData.id || decoded.email !== userData.email || decoded.role !== userData.role) {
      return NextResponse.json({ error: 'Token user mismatch' }, { status: 401 });
    }

    return NextResponse.json({ 
      valid: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Invalid token or user data' }, { status: 401 });
  }
}
