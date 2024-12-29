'use client';

import Link from "next/link";
import { ShoppingCart, Menu, X, User, Heart } from "lucide-react";
import { useState } from "react";
import { Flags } from "./ui/flags";
import CategoryNavbar from './CategoryNavbar';
import Image from 'next/image';
import SearchBar from "./SearchBar";

const languages = [
  { code: 'fr', name: 'Français', flag: Flags.fr },
  { code: 'ar', name: 'العربية', flag: Flags.ar },
  { code: 'en', name: 'English', flag: Flags.en }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow">
        <div className="max-w-[1536px] mx-auto px-5">
          <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Elite Medicale Service Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <SearchBar />
            </div>

            {/* Right Section */}

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-blue-600 text-lg font-bold tracking-wide">
                Nos Services
              </Link>
              <Link href="/a-propos" className="text-gray-700 hover:text-blue-600 text-lg font-bold tracking-wide">
                À Propos
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 text-lg font-bold tracking-wide">
                Contact
              </Link>
              <Link href="/appointment" className="text-gray-700 hover:text-blue-600 text-lg font-bold tracking-wide">
                Prenez RDV
              </Link>




              {/* Language Picker */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2">
                    {languages.find(lang => lang.code === currentLang)?.flag}
                    <span className="font-bold text-sm">{languages.find(lang => lang.code === currentLang)?.name}</span>
                  </span>
                </button>
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-20 border border-gray-100">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2 font-bold text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {lang.flag}
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="text-gray-700 hover:text-blue-600">
                <Heart className="h-6 w-6" />
              </button>
              <button className="text-gray-700 hover:text-blue-600">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 flex font-bold items-center gap-2">
                <User className="h-6 w-6" />
                <span className="text-sm"></span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-md p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <Link href="/services" className="block py-2 text-gray-700 hover:text-blue-600">Nos Services</Link>
                <Link href="/a-propos" className="block py-2 text-gray-700 hover:text-blue-600">À Propos</Link>
                <Link href="/contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</Link>
                <Link href="/appointment" className="block py-2 text-gray-700 hover:text-blue-600">Prenez RDV</Link>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Changer la langue</p>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full py-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      {lang.flag}
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="fixed top-16 left-0 right-0 z-40">
        <CategoryNavbar />
      </div>
    </div>
  );
};

export default Navbar;
