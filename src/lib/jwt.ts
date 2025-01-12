import jwt from 'jsonwebtoken';

// Load JWT_SECRET from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.log('Warning: JWT_SECRET is not defined in environment variables');
  throw new Error('JWT_SECRET is not defined');
}

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export function signToken(payload: TokenPayload): string {
  if (!JWT_SECRET) {
    throw new Error('Server configuration error: JWT_SECRET is missing');
  }
  
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid payload provided');
  }

  if (!payload.id || !payload.email || !payload.role) {
    throw new Error('Missing required fields in payload');
  }

  try {
    console.log('Signing token for user:', payload.id);
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  } catch (error) {
    console.log('Error signing token:', error);
    throw new Error('Failed to sign token');
  }
}

export function verifyToken(token: string): TokenPayload {
  console.log('Starting token verification...');

  if (!JWT_SECRET) {
    throw new Error('Server configuration error: JWT_SECRET is missing');
  }

  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token format');
  }

  try {
    console.log('Verifying token with jwt.verify...');
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Raw decoded token:', decoded);
    
    if (!decoded || typeof decoded !== 'object') {
      console.log('Invalid token structure:', decoded);
      throw new Error('Invalid token structure');
    }

    // Type guard function
    function isTokenPayload(obj: any): obj is TokenPayload {
      return (
        obj &&
        typeof obj === 'object' &&
        typeof obj.id === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.role === 'string'
      );
    }

    // Validate and transform the decoded token
    if (!isTokenPayload(decoded)) {
      console.log('Invalid token payload structure:', decoded);
      throw new Error('Invalid token payload structure');
    }

    const tokenPayload: TokenPayload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    console.log('Token verified successfully:', tokenPayload);
    return tokenPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.log('JWT verification error:', error.message);
      throw new Error(`Invalid token: ${error.message}`);
    }
    if (error instanceof jwt.TokenExpiredError) {
      console.log('Token expired');
      throw new Error('Token expired');
    }
    console.log('Unexpected token verification error:', error);
    throw error;
  }
}
