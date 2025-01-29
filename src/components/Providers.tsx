'use client';

import { TranslationProvider } from '@/contexts/TranslationContext';
import { CartProvider } from '@/hooks/useCart';
import { FilterProvider } from '@/contexts/FilterContext';
import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TranslationProvider>
        <CartProvider>
          <FilterProvider>
          <div className="touch-action-manipulation tap-highlight-transparent relative">
            {children}
          </div>
          </FilterProvider>
        </CartProvider>
      </TranslationProvider>
    </AuthProvider>
  );
}
