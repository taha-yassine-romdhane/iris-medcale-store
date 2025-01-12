'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface FilterContextType {
  category: string | null;
  type: string | null;
  subCategory: string | null;
  updateFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
}

interface FilterState {
  category: string | null;
  type: string | null;
  subCategory: string | null;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get('category'),
    type: searchParams.get('type'),
    subCategory: searchParams.get('subCategory'),
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.type) params.set('type', filters.type);
    if (filters.subCategory) params.set('subCategory', filters.subCategory);
    
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl, { scroll: false });
  }, [filters, pathname, router]);

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      category: null,
      type: null,
      subCategory: null,
    });
  }, []);

  return (
    <FilterContext.Provider 
      value={{ 
        ...filters, 
        updateFilters, 
        clearFilters 
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
