import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function verifyToken(token: string): Promise<DecodedToken | null> {
  try {    
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    
    // Extract only the necessary fields
    const cleanedToken = {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as string
    };
    
    return cleanedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
