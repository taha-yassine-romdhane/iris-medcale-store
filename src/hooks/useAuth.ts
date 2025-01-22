import { useState, useEffect } from 'react';
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

interface RegisterParams {
  email: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  role: 'ADMIN' | 'EMPLOYE' | 'CLIENT';
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Vérifier le token stocké au chargement
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setAuthState({
        token,
        user: JSON.parse(user),
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // This is important for cookie handling
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la connexion');
      }

      // Sauvegarder les données d'authentification
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setAuthState({
        token: data.token,
        user: data.user,
      });
      
      // Set cookie manually as fallback
      document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=strict`;
      document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=86400; samesite=strict`;
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterParams) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      // Automatically log in after successful registration
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setAuthState({
        token: data.token,
        user: data.user,
      });

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API endpoint to clear cookies
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Clear auth state
      setAuthState({ user: null, token: null });
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user: authState.user,
    token: authState.token,
    loading,
    error,
    login,
    logout,
    register
  };
};
