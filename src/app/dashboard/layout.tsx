'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as jose from 'jose';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
          router.push('/login');
          return;
        }

        // Verify token locally first
        const decodedToken = jose.decodeJwt(token);
        const user = JSON.parse(userStr);

        if (!decodedToken.role || !['ADMIN', 'EMPLOYE'].includes(decodedToken.role as string)) {
          router.push('/');
          return;
        }

        // Set up fetch interceptor
        const originalFetch = window.fetch;
        window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
          const newInit = { ...init } as RequestInit;
          if (!newInit.headers) {
            newInit.headers = {};
          }
          
          // Add both token and role headers
          (newInit.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
          (newInit.headers as Record<string, string>)['x-user-role'] = user.role;

          return originalFetch(input, newInit);
        };

        // Verify access with backend
        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        setIsAuthorized(true);
        return () => {
          window.fetch = originalFetch;
        };
      } catch (error) {
        console.error('Access verification error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    };

    verifyAccess();
  }, [router]);

  if (!isAuthorized) {
    return null; // Don't render anything until authorization is confirmed
  }

  return (
    <div className=" bg-gray-100">
      <div>{children}</div>
    </div>
  );
}
