'use client';

import { CartProvider } from '@/hooks/useCart';
import { FilterProvider } from '@/contexts/FilterContext';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <FilterProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
