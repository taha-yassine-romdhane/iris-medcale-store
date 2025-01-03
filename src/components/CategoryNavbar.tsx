'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';

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

  // Handle dropdown open/close
  const handleDropdownToggle = (categoryName: string) => {
    setOpenDropdown(openDropdown === categoryName ? null : categoryName);
  };

  return (
    <nav className="fixed top-16 left-0 right-0 bg-white z-40 border-t-2 font-spartan shadow-sm">
      <div className="flex justify-start max-w-8xl mx-auto"> {/* Changed justify-end to justify-start */}
        <div className="flex items-center h-12 ml-[420px]"> {/* Adjusted margin from ml-[300px] to ml-[250px] */}
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
                onOpenChange={(open) => handleDropdownToggle(category.name)}
              >
                <DropdownMenuTrigger
                  className="h-12 px-5 flex items-center space-x-2 text-xxl rounded-xl font-bold text-blue-900 hover:text-blue-600 hover:bg-gray-50 transition-all border-r border-blue-200 focus:outline-none group"
                  onMouseEnter={() => setOpenDropdown(category.name)}
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
                  onMouseLeave={() => setOpenDropdown(null)}
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
    </nav>
  );
}