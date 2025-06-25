'use client';

import { useTranslation } from '@/contexts/TranslationContext';
import { useRouter } from 'next/navigation';

export default function CheckEmailPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t('checkEmail.title')}
          </h2>
          <div className="mt-4">
            <div className="text-gray-600">
              <p className="text-lg mb-4">
                {t('checkEmail.description')}
              </p>
              <p className="text-sm text-gray-500">
                {t('checkEmail.spam')}
              </p>
              <button
                onClick={() => router.push('/login')}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                {t('checkEmail.goToLogin')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
