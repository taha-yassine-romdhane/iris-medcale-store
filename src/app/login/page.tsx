'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/contexts/TranslationContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, loading, error } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get('redirect') || '/';

  const validateEmail = (email: string) => {
    if (email.toLowerCase() === 'admin@elite.com') {
      return 'ADMIN';
    } else if (email.toLowerCase().endsWith('@elite.com')) {
      return 'EMPLOYE';
    }
    return 'CLIENT';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
  
    if (!email || !password) {
      setErrorMessage(t('login.error.fillAllFields'));
      return;
    }
  
    const role = validateEmail(email.toLowerCase());
    
    try {
      await login(email, password);
      
      // Determine the target route
      const targetRoute =
        role === 'ADMIN' || role === 'EMPLOYE'
          ? '/dashboard'
          : redirectPath || '/';

      // Use replace to navigate and force a refresh
     
      router.replace(targetRoute);
      router.refresh();
    } catch {
      setErrorMessage(t('login.error.invalidCredentials'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Decorative */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white p-12 flex-col justify-between relative">
        <div>
          <h1 className="py-10 text-4xl font-bold mb-6">
            {t('login.leftSide.title')}
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            {t('login.leftSide.description')}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6" />
            <span>{t('login.leftSide.bullet1')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Lock className="h-6 w-6" />
            <span>{t('login.leftSide.bullet2')}</span>
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

          <div className="w-full max-w-md space-y-8 p-10 rounded-lg shadow-lg bg-white">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                {t('login.form.title')}
              </h2>
            </div>

            {(errorMessage || error) && (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex items-center"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                {errorMessage || error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('login.form.emailLabel')}
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
                      placeholder={t('login.form.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('login.form.passwordLabel')}
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
                      placeholder={t('login.form.passwordPlaceholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    t('login.form.submitButton')
                  )}
                </button>
              </div>
              <div className="text-sm text-center">
                <p className="mt-2">
                  {t('login.form.noAccount')}{' '}
                  <Link
                    href="/signup"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    {t('login.form.signupLink')}
                  </Link>
                </p>
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  {t('login.form.forgotPassword')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}