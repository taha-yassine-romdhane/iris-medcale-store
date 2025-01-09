'use client';

import Link from 'next/link';
import { ChevronDown, X, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useRef } from 'react';

const categories = [
  {
    name: 'CPAP/PPC',
    displayName: 'CPAP/PPC',
    items: [
      { name: 'Machines CPAP', href: '/categories/cpap/machines' },
      { name: 'Accessoires CPAP', href: '/categories/cpap/accessoires' },
      { name: 'Pièces de rechange', href: '/categories/cpap/pieces' },
    ]
  },
  {
    name: 'MASQUE',
    displayName: 'Masques',
    items: [
      { name: 'Masques nasaux', href: '/categories/masques/nasal' },
      { name: 'Masques faciaux', href: '/categories/masques/facial' },
      { name: 'Masques narinaires', href: '/categories/masques/narinaire' },
      { name: 'Masques sans fuite', href: '/categories/masques/sans-fuite' },
    ]
  },
  {
    name: 'OXYGENE',
    displayName: 'Oxygène',
    items: [
      { name: 'Concentrateurs', href: '/categories/oxygene/concentrateurs' },
      { name: 'Accessoires', href: '/categories/oxygene/accessoires' },
    ]
  },
  {
    name: 'BIPAP/VNI',
    displayName: 'BiPAP/VNI',
    items: [
      { name: 'Machines BiPAP', href: '/categories/bipap/machines' },
      { name: 'Accessoires BiPAP', href: '/categories/bipap/accessoires' },
    ]
  },
  {
    name: 'AEROSOLE-THERAPIE',
    displayName: 'Aérosol-thérapie',
    items: [
      { name: 'Nébuliseurs', href: '/categories/aerosol/nebuliseurs' },
      { name: 'Accessoires', href: '/categories/aerosol/accessoires' },
    ]
  },
  {
    name: 'ASPIRATEUR-THERAPIE',
    displayName: 'Aspirateur-thérapie',
    items: [
      { name: 'Aspirateurs', href: '/categories/aspirateur/machines' },
      { name: 'Consommables', href: '/categories/aspirateur/consommables' },
    ]
  },
  {
    name: 'LIT',
    displayName: 'Lits',
    items: [
      { name: 'Lits médicalisés', href: '/categories/lit/medicalise' },
      { name: 'Accessoires de lit', href: '/categories/lit/accessoires' },
    ]
  },
];

export default function CategoryNavbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle dropdown open
  const handleDropdownOpen = (categoryName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any pending close timeout
    }
    setOpenDropdown(categoryName); // Open the dropdown immediately
  };

  // Handle dropdown close with delay
  const handleDropdownClose = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null); // Close the dropdown after a delay
    }, 150); // 150ms delay for smoother transitions
  };

  return (
    <nav className="fixed top-16 left-0 right-0 bg-white z-40 border-t border-gray-200 font-spartan shadow-sm">
      {/* Desktop Menu */}
      <div className="hidden md:flex justify-start max-w-8xl mx-auto">
        <div className="flex items-center h-12 ml-[420px]">
          {/* Home Link */}
          <Link
            href="/"
            className="px-6 py-4 h-full flex font-bold rounded-xl items-center text-blue-900 hover:text-blue-600 transition-colors border-r border-gray-200 text-lg"
            aria-label="Accueil"
          >
            Accueil
          </Link>
          <Link
            href="/apnee-du-sommeil"
            className="px-4 py-4 h-full font-bold flex rounded-xl items-center text-blue-900 hover:text-blue-600 transition-colors border-r border-gray-200 text-lg whitespace-nowrap"
            aria-label="Apnée du sommeil"
          >
            Apnée du sommeil
          </Link>

          {/* Categories */}
          <div className="flex overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <DropdownMenu
                key={category.name}
                open={openDropdown === category.name}
                onOpenChange={(open) => {
                  if (!open) {
                    handleDropdownClose();
                  }
                }}
              >
                <DropdownMenuTrigger
                  className="h-12 px-5 flex items-center space-x-2 text-xxl rounded-xl font-bold text-blue-900 hover:text-blue-600 hover:bg-gray-50 transition-all border-r border-blue-200 focus:outline-none group"
                  onMouseEnter={() => handleDropdownOpen(category.name)}
                  onMouseLeave={handleDropdownClose}
                  aria-label={category.displayName}
                >
                  <span className="whitespace-nowrap space-x-4 text-lg">
                    {category.displayName}
                  </span>
                  <ChevronDown className="h-4 w-4 text-red-700 transition-transform duration-200 group-hover:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-64"
                  onMouseEnter={() => handleDropdownOpen(category.name)}
                  onMouseLeave={handleDropdownClose}
                >
                  {category.items.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className="h-12 px-5 flex items-center font-semibold space-x-4 text-blue-900 hover:text-blue-600 transition-all text-xl focus:outline-none group"
                        aria-label={item.name}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <Link
            href="/"
            className="text-blue-900 font-bold text-lg"
          >
            Accueil
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="bg-white">
            <Link
              href="/apnee-du-sommeil"
              className="block px-4 py-3 text-blue-900 hover:bg-blue-50 font-bold border-b border-gray-200"
            >
              Apnée du sommeil
            </Link>

            {categories.map((category) => (
              <div key={category.name} className="border-b border-gray-200">
                <button
                  onClick={() => setOpenDropdown(openDropdown === category.name ? null : category.name)}
                  className="w-full px-4 py-3 flex items-center justify-between text-blue-900 hover:bg-blue-50"
                >
                  <span className="font-bold">{category.displayName}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === category.name ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openDropdown === category.name && (
                  <div className="bg-blue-50 py-2">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-8 py-2 text-blue-900 hover:bg-blue-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}