'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>(() => ({
    category: searchParams?.get('category') ?? null,
    type: searchParams?.get('type') ?? null,
    subCategory: searchParams?.get('subCategory') ?? null,
  }));

  // Update filters when URL changes
  useEffect(() => {
    const newFilters = {
      category: searchParams?.get('category') ?? null,
      type: searchParams?.get('type') ?? null,
      subCategory: searchParams?.get('subCategory') ?? null,
    };

    setFilters(newFilters);
  }, [searchParams]);

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      
      // Reset dependent filters when category changes
      if (newFilters.category && newFilters.category !== prev.category) {
        updated.type = null;
        updated.subCategory = null;
      }
      
      return updated;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      category: null,
      type: null,
      subCategory: null,
    });
  }, []);

  const value = {
    ...filters,
    updateFilters,
    clearFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
