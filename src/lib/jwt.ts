import jwt from 'jsonwebtoken';

// Load JWT_SECRET from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
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

  // Validate payload
  if (!payload.id || !payload.email || !payload.role) {
    throw new Error('Invalid token payload: missing required fields');
  }

  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  } catch {
    throw new Error('Failed to sign token');
  }
}

export function verifyToken(token: string): TokenPayload {
  if (!JWT_SECRET) {
    throw new Error('Server configuration error: JWT_SECRET is missing');
  }

  if (!token) {
    throw new Error('Token is required');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || typeof decoded !== 'object') {
      throw new Error('Invalid token structure');
    }

    // Type guard function
    function isTokenPayload(obj: unknown): obj is TokenPayload {
      return (
        typeof obj === 'object' &&
        obj !== null &&
        'id' in obj &&
        'email' in obj &&
        'role' in obj &&
        typeof obj.id === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.role === 'string'
      );
    }

    // Validate and transform the decoded token
    if (!isTokenPayload(decoded)) {
      throw new Error('Invalid token payload structure');
    }

    const tokenPayload: TokenPayload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    return tokenPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error(`Invalid token: ${error.message}`);
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    throw error;
  }
}
