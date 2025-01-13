'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/translations/en.json';
import fr from '@/translations/fr.json';

type Language = 'en' | 'fr';
type NestedTranslations = {
  [key: string]: string | string[] | NestedTranslations;
};

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Record<Language, NestedTranslations> = {
  en,
  fr,
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
        setLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  }, [language, isInitialized]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: NestedTranslations | string = translations[language];
    
    for (const k of keys) {
      if (typeof value === 'string') {
        return value;
      }
      value = value[k] as NestedTranslations | string;
    }
    
    return typeof value === 'string' ? value : key;
  };

  if (!isInitialized) {
    return null; 
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
