'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-[50px]">
      {/* Left side - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white p-12 flex-col justify-between relative">
        <div>
          <h1 className="py-10 text-4xl font-bold mb-6">
            Espace Client Elite Medicale Service
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Connectez-vous pour accéder à vos informations et services personnalisés.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6" />
            <span>Accès sécurisé aux données de l&apos;entreprise</span>
          </div>
          <div className="flex items-center space-x-3">
            <Lock className="h-6 w-6" />
            <span>Double authentification pour plus de sécurité</span>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="Elite Medicale Service Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Connexion Client
            </h2>
            <p className="text-gray-600 text-sm">
              Veuillez vous connecter avec vos identifiants personnels
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre_email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              >
                Se connecter
              </button>
            </div>
            <div className="text-sm text-center">
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
