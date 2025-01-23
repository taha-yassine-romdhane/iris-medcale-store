'use client';

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Assuming AuthContext is defined in AuthContext.ts

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