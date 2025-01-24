import jwt from 'jsonwebtoken';

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
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    
    // Extract only the necessary fields
    const cleanedToken = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };
    
    return cleanedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
