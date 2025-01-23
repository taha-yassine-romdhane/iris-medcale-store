'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  telephone?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  role: 'ADMIN' | 'EMPLOYE' | 'CLIENT';
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialAuthState: AuthState = {
  user: null,
  token: null,
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  if (typeof window === 'undefined') return {};
  
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token || !userStr) return {};
  
  return {
    'Authorization': `Bearer ${token}`,
    'Authorization-User': encodeURIComponent(userStr),
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuthState({ user, token });
      } catch (err) {
        console.error('Error parsing user data:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Set up request interceptor to add auth headers
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      // Always create a new init object if it doesn't exist
      const modifiedInit: RequestInit = { ...init } ;
      
      // Always create headers object if it doesn't exist
      modifiedInit.headers = {
        ...modifiedInit.headers,
        ...getAuthHeaders(), // Add auth headers to every request
      } as any;

      try {
        const response = await originalFetch(input, modifiedInit);
        
        // Handle authentication errors
        if (response.status === 401 || response.status === 403) {
          console.log('Authentication error, clearing state...');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuthState(initialAuthState);
          router.push('/login');
        }
        
        return response;
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    };

    // Cleanup function to restore original fetch
    return () => {
      window.fetch = originalFetch;
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      if (!data.token || !data.user) {
        throw new Error('Invalid response data');
      }

      // Store auth data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Update state
      setAuthState({
        token: data.token,
        user: data.user,
      });

      console.log('Login successful');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset state
    setAuthState(initialAuthState);
    
    // Redirect to home
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ ...authState, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};