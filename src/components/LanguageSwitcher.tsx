import { useTranslation } from '@/contexts/TranslationContext';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '/flags/en.svg',
    dir: 'ltr'
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '/flags/fr.svg',
    dir: 'ltr'
  },
  {
    code: 'ar',
    name: 'العربية',
    flag: '/flags/ar.svg',
    dir: 'rtl'
  }
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-300 transition-colors duration-200 text-black"
      >
        <div className="relative w-5 h-5 rounded-full overflow-hidden">
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="hidden sm:inline text-sm font-medium" dir={currentLanguage.dir}>{currentLanguage.name}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'en' | 'fr' | 'ar');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                language === lang.code
                  ? 'bg-green-200 text-black'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium" dir={lang.dir}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}