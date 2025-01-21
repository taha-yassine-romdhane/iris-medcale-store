'use client';

import Link from "next/link";
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Suspense } from 'react';
import { ShoppingCart, Search, X, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import CategoryNavbar from './CategoryNavbar';
import Image from 'next/image';
import SearchBar from "./SearchBar";
import CartDropdown from './cart/CartDropdown';
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from '@/context/TranslationContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

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
          <span>{t('navbar.dashboard')}</span>
        </Link>
      ];
    }

    return [
      ...commonItems,
      <Link
        key="orders"
        href="/mes-commandes"
        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 hover:text-blue-600"
        onClick={() => setIsUserMenuOpen(false)}
      >
        <ShoppingCart className="h-4 w-4" />
        <span>{t('navbar.myOrders')}</span>
      </Link>,
      <Link
        key="user-profile"
        href="/mon-profil"
        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 hover:text-blue-600"
        onClick={() => setIsUserMenuOpen(false)}
      >
        <User className="h-4 w-4" />
        <span>{t('navbar.myProfile')}</span>
      </Link>
    ];
  };

  return (
    <div className="flex flex-col gap-0">
      <nav className=" bg-white z-50 shadow-sm">
        <div className="max-w-[1836px] mx-auto relative">
          {/* Hide logo on mobile, show on larger screens */}
          <div className="absolute left-1 -bottom-12 z-50 bg-white rounded-b-lg p-2 hidden md:block">
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

          <div className="flex justify-between items-center h-16 px-4">
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block w-[600px]">
              <SearchBar />
            </div>

            <div className="flex items-center space-x-4 ml-auto">
              <div className="relative">
                <div
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="text-blue-900 hover:text-blue-600 flex items-center space-x-2"
                >
                  <CartDropdown />
                </div>
              </div>

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
                        <span>{t('navbar.logout')}</span>
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
                  <span>{t('navbar.login')}</span>
                </Link>
              )}

              <LanguageSwitcher />
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-blue-900 hover:text-blue-600"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <SearchBar />
            </div>
          </div>
        )}
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryNavbar />
      </Suspense>
    </div>
  );
};

export default Navbar;