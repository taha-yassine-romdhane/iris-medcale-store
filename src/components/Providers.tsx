'use client';

import { TranslationProvider } from '@/context/TranslationContext';
import { CartProvider } from '@/hooks/useCart';
import { FilterProvider } from '@/contexts/FilterContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      <CartProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </CartProvider>
    </TranslationProvider>
  );
}
