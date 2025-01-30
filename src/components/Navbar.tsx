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
import { motion, AnimatePresence } from "framer-motion";
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

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white z-50 shadow-sm relative"
      >
        {/* Mobile Search Bar - Added this new section */}
        <div className="lg:hidden w-full px-4 py-2 bg-white border-b">
          <SearchBar />
        </div>
        <div className="max-w-[1836px] mx-auto relative">
          {/* Desktop Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-1 -bottom-12 z-50 bg-white rounded-b-lg p-2 hidden md:block"
          >
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
          </motion.div>

          <div className="flex justify-between items-center h-16 px-4">
            {/* Mobile Logo */}
            <div className="md:hidden">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo_No_BG.png"
                  alt="Elite Medicale Service Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block w-[600px]"
            >
              <SearchBar />
            </motion.div>

            <div className="flex items-center space-x-4 ml-auto">
              <CartDropdown />

              {/* Desktop User Menu */}
              <div className="hidden md:block">
                {user ? (
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-1 focus:outline-none"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                        <User2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-bold text-sm hidden lg:inline-block">
                        {(user as User).prenom} {(user as User).nom}
                      </span>
                    </motion.button>
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={dropdownVariants}
                          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-20 border border-gray-100"
                        >
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-semibold text-blue-900">{(user as User).prenom} {(user as User).nom}</p>
                            <p className="text-xs text-gray-500">{(user as User).email}</p>
                          </div>
                          <Link
                            href="/profile"
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span>{t('navbar.myProfile')}</span>
                          </Link>
                          <Link
                            href="/mes-commandes"
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span>{t('navbar.myOrders')}</span>
                          </Link>
                          {((user as User).role === 'ADMIN' || (user as User).role === 'EMPLOYE') && (
                            <Link
                              href="/dashboard"
                              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-900 hover:bg-blue-50"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <span>{t('navbar.dashboard')}</span>
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <span>{t('navbar.logout')}</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      href="/login"
                      className="text-blue-900 hover:text-blue-600 flex font-bold items-center gap-2"
                    >
                      <User2 className="h-6 w-6" />
                      <span>{t('navbar.login')}</span>
                    </Link>
                  </motion.div>
                )}
              </div>

              <div className="md:block">
                <LanguageSwitcher />
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded hover:bg-blue-100 flex items-center gap-2"
              >
                <Menu className="h-6 w-6 text-blue-900" />
                <span className="text-blue-900 font-medium">{t('navbar.title')}</span>
              </motion.button>
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
      </motion.nav>

      <Suspense fallback={<div>Loading...</div>}>
        <CategoryNavbar />
      </Suspense>
    </div>
  );
};

export default Navbar;