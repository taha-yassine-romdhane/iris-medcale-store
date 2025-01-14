'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from '@/context/TranslationContext';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!searchParams) {
          setStatus('error');
          setMessage('Navigation parameters not available');
          return;
        }

        const token = searchParams.get('token');
        if (!token) {
          setStatus('error');
          setMessage('Verification token is missing');
          return;
        }

        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          setStatus('error');
          setMessage(data.error);
        } else {
          setStatus('success');
          setMessage('Email verified successfully!');
          // Redirect to login page after 3 seconds
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      } catch {
        console.error('Error verifying email:');
        setStatus('error');
        setMessage('An error occurred while verifying email');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t('verifyEmail.title')}
          </h2>
          <div className="mt-4">
            {status === 'loading' && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
            {status === 'success' && (
              <div className="text-green-600">
                <p className="text-lg">{message}</p>
                <p className="mt-2 text-sm">
                  {t('verifyEmail.redirecting')}
                </p>
              </div>
            )}
            {status === 'error' && (
              <div className="text-red-600">
                <p className="text-lg">{message}</p>
                <button
                  onClick={() => router.push('/login')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {t('verifyEmail.goToLogin')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
