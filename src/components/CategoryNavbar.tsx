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

  return (
    <nav className="fixed top-16 left-0 right-0 bg-white z-40 border-t-2 border-t-red-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-12">
          {/* Home Link */}
          <Link 
            href="/"
            className="px-5 h-full flex items-center text-gray-700 hover:text-blue-600 font-bold transition-colors border-r border-gray-200"
          >
            Accueil
          </Link>

          {/* Categories */}
          <div className="flex overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <DropdownMenu 
                key={category.name}
                open={openDropdown === category.name}
                onOpenChange={(open) => {
                  if (open) {
                    setOpenDropdown(category.name);
                  } else {
                    setOpenDropdown(null);
                  }
                }}
              >
                <DropdownMenuTrigger 
                  className="h-12 px-5 flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all border-r border-gray-200 focus:outline-none group"
                  onMouseEnter={() => setOpenDropdown(category.name)}
                >
                  <span className="whitespace-nowrap text-sm font-bold">{category.displayName}</span>
                  <ChevronDown className="h-4 w-4 text-red-500 transition-transform duration-200 group-hover:rotate-180" />
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
                        className="w-full px-3 py-2 text-sm font-bold hover:bg-blue-50 hover:text-blue-600"
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
