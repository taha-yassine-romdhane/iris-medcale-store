'use client';

import Link from "next/link";
import { ShoppingCart, Menu, X, User, LogOut, Settings } from "lucide-react";
import { FileText, Info, Phone, Calendar } from 'lucide-react';
import { useState } from "react";
import { Flags } from "./ui/flags";
import CategoryNavbar from './CategoryNavbar';
import Image from 'next/image';
import SearchBar from "./SearchBar";
import CartDropdown from './cart/CartDropdown'; // Import the CartDropdown component
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'fr', name: 'Français', flag: Flags.fr },
  { code: 'en', name: 'English', flag: Flags.en },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart dropdown
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const handleLanguageChange = (langCode: string) => {
    const newPath = pathname.replace(`/${'fr'}`, `/${langCode}`);
    router.push(newPath);
    setIsLangMenuOpen(false);
  };

  // User menu items based on role
  const getMenuItems = () => {
    if (!user) return null;

    const commonItems = [
      <div key="user-info" className="px-4 py-2 border-b border-gray-100">
        <p className="text-sm font-semibold text-blue-900">{user.prenom} {user.nom}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    ];

    if (user.role === 'ADMIN' || user.role === 'EMPLOYE') {
      return [
        ...commonItems,
        <Link
          key="dashboard"
          href="/dashboard"
          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 hover:text-blue-600"
          onClick={() => setIsUserMenuOpen(false)}
        >
          <Settings className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      ];
    }

    // Client menu items
    return [
      ...commonItems,
      <Link
        key="orders"
        href="/mes-commandes"
        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 hover:text-blue-600"
        onClick={() => setIsUserMenuOpen(false)}
      >
        <ShoppingCart className="h-4 w-4" />
        <span>Mes Commandes</span>
      </Link>,
      <Link
        key="user-profile"
        href="/mon-profil"
        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 hover:text-blue-600"
        onClick={() => setIsUserMenuOpen(false)}
      >
        <User className="h-4 w-4" />
        <span>Mon Profil</span>
      </Link>
    ];
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="max-w-[1836px] mx-auto relative">
          {/* Logo Section */}
          <div className="absolute left-1 -bottom-12 z-50 bg-white rounded-b-lg p-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_No_BG.png"
                alt="Elite Medicale Service Logo"
                width={250}
                height={250}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex justify-end items-center h-16 pr-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <SearchBar />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/services" className="text-blue-900 hover:text-blue-600 text-lg font-bold tracking-wide flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Nos Services</span>
              </Link>
              <Link href="/a-propos" className="text-blue-900 hover:text-blue-600 text-lg font-bold tracking-wide flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>À Propos</span>
              </Link>
              <Link href="/contact" className="text-blue-900 hover:text-blue-600 text-lg font-bold tracking-wide flex items-center space-x-2">
                <Phone className="w-5 h-5" /> {/* Icon for Contact */}
                <span>Contact</span>
              </Link>

              <Link href="/appointment" className="text-blue-900 hover:text-blue-600 text-lg font-bold tracking-wide flex items-center space-x-2">
                <Calendar className="w-5 h-5" /> {/* Icon for Prenez RDV */}
                <span>Prenez RDV</span>
              </Link>

              {/* Cart Dropdown */}
              <div className="relative">
                <div
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="text-blue-900 hover:text-blue-600 flex items-center space-x-2"
                >
                  <CartDropdown  />
                </div>
              </div>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-blue-900 hover:text-blue-600"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-sm hidden lg:inline-block">
                      {user.prenom} {user.nom}
                    </span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-20 border border-gray-100">
                      {getMenuItems()}
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Se déconnecter</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-blue-900 hover:text-blue-600 flex font-bold items-center gap-2"
                >
                  <User className="h-6 w-6" />
                  <span>Se connecter</span>
                </Link>
              )}

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  <span>{languages.find(lang => lang.code === 'fr')?.flag}</span>
                </button>
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-blue-900 hover:text-blue-600"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <SearchBar />
              <Link
                href="/services"
                className="block px-3 py-2 text-base font-medium text-blue-900 hover:text-blue-600"
              >
                Nos Services
              </Link>
              <Link
                href="/a-propos"
                className="block px-3 py-2 text-base font-medium text-blue-900 hover:text-blue-600"
              >
                À Propos
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-blue-900 hover:text-blue-600"
              >
                Contact
              </Link>
              <Link
                href="/appointment"
                className="block px-3 py-2 text-base font-medium text-blue-900 hover:text-blue-600"
              >
                Prenez RDV
              </Link>
              {user ? (
                <>
                  <div className="px-3 py-2 border-t border-gray-200">
                    <p className="text-sm font-semibold text-blue-900">{user.prenom} {user.nom}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  {user.role === 'ADMIN' || user.role === 'EMPLOYE' ? (
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 text-base font-medium text-blue-900 hover:text-blue-600"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/mon-profil"
                        className="block px-3 py-2 text-base font-medium text-blue-900 hover:text-blue-600"
                      >
                        Mon Profil
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-blue-900 hover:text-blue-600"
                >
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16"></div>
      <CategoryNavbar />
    </div>
  );
};

export default Navbar;