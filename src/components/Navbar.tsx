'use client';

import Link from "next/link";
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Suspense } from 'react';
import { User2, Menu } from "lucide-react";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import CategoryNavbar from './CategoryNavbar';
import Image from 'next/image';
import SearchBar from "./SearchBar";
import CartDropdown from './cart/CartDropdown';
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from '@/contexts/TranslationContext';
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const { t } = useTranslation();

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-24">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image src="/logo_nouri_new.jpeg" alt="Logo" width={72} height={72} className="object-contain" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <div className="flex flex-col">
      <nav className="bg-white z-50 border-b sticky top-0">
        {/* Mobile Search Bar */}
        <div className="lg:hidden w-full px-3 py-2 bg-gray-50 border-b">
          <SearchBar />
        </div>
        
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="flex justify-between items-center h-16 md:h-24">
            {/* Logo - Desktop - Positioned absolutely to span both navbars */}
            <div className="hidden md:block absolute left-4 top-0 z-20">
              <Link href="/" className="flex items-center">
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <Image
                    src="/logo_nouri_new.jpeg"
                    alt="Elite Medicale Service Logo"
                    width={180}
                    height={180}
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Mobile Logo and Menu */}
            <div className="md:hidden flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo_nouri_new.jpeg"
                    alt="Elite Medicale Service Logo"
                    width={56}
                    height={56}
                    className="object-contain"
                    priority
                  />
                </Link>
                
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-1.5 text-gray-600 hover:text-gray-900"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <CartDropdown />
                <LanguageSwitcher />
              </div>
            </div>

            {/* Desktop Search Bar - Centered with logo offset */}
            <div className="hidden lg:block flex-1 max-w-xl mx-8 ml-52">
              <SearchBar />
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-4">
              <CartDropdown />

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                      <User2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="hidden lg:inline-block">
                      {(user as User).prenom} {(user as User).nom}
                    </span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium text-gray-900">
                          {(user as User).prenom} {(user as User).nom}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {(user as User).email}
                        </p>
                      </div>
                      
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t('navbar.myProfile')}
                      </Link>
                      
                      <Link
                        href="/mes-commandes"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t('navbar.myOrders')}
                      </Link>
                      
                      {((user as User).role === 'ADMIN' || (user as User).role === 'EMPLOYE') && (
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          {t('navbar.dashboard')}
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t"
                      >
                        {t('navbar.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800"
                >
                  <User2 className="h-4 w-4" />
                  <span>{t('navbar.login')}</span>
                </Link>
              )}

              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavbar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          user={user}
          handleLogout={handleLogout}
        />
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <CategoryNavbar />
      </Suspense>
    </div>
  );
};

export default Navbar;