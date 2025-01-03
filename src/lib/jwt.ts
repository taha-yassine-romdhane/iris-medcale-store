import jwt from 'jsonwebtoken';

// Load JWT_SECRET from environment variable
const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET loaded:', JWT_SECRET ? 'Yes' : 'No');

if (!JWT_SECRET) {
  console.error('WARNING: JWT_SECRET is not defined in environment variables');
}

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export function signToken(payload: TokenPayload) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  console.log('Signing token with secret length:', JWT_SECRET.length);
  console.log('Payload:', payload);
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): TokenPayload {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  console.log('Verifying token with secret length:', JWT_SECRET.length);
  console.log('Token to verify:', token);
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Raw decoded token:', decoded);
    
    if (!decoded || typeof decoded !== 'object') {
      throw new Error('Token payload is not an object');
    }

    const payload = decoded as TokenPayload;
    if (!payload.id || !payload.email || !payload.role) {
      throw new Error('Token payload missing required fields');
    }

    console.log('Token verified successfully. Payload:', payload);
    return payload;
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
}
