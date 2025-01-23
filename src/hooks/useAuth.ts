'use client';

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Assuming AuthContext is defined in AuthContext.ts

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, token, loading, error, login, logout } = context;

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
  };
};