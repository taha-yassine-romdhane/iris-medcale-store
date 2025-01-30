'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LogOut, User2, X, Heart, Info, Phone, ChevronDown, ShoppingCart, Settings2,  LucideSquareActivity, SquareChevronRight, Calendar } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';
import { User } from '@/types/user'
 
interface CategoryType {
  category: string;
  types: string[];
  subcategories: string[];
}

interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
  user: null | User ;
  handleLogout: () => void;
}
const CATEGORY_ORDER = [
  'APPAREILS CPAP/PPC',
  'ACCESSOIRES CPAP/PPC',
  'CONCENTRATEURS D\'OXYGENE',
  'ACCESSOIRES D\'OXYGENE',
  'MASQUES',
  'APPAREILS BIPAP/VNI',
  'APPAREILS NEBULISEUR',
  'APPAREILS ASPIRATUER',
  'APPAREILS AEROSOL',
  'ACCESSOIRES AEROSOL',
  'ACCESSOIRE ASPIRATEUR',
  'LIT MEDICALISE'
] as const;

const MobileNavbar = ({ isOpen, onClose, user, handleLogout }: MobileNavbarProps) => {
  const { t } = useTranslation();
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchCategoryTypes = async () => {
      try {
        const response = await fetch('/api/category-types');
        if (!response.ok) throw new Error('Failed to fetch category types');
        const data = await response.json();
        // Sort the categories according to CATEGORY_ORDER
        const sortedCategories = sortCategoriesByOrder(data);
        setCategoryTypes(sortedCategories);
      } catch (error) {
        console.error('Error fetching category types:', error);
        setCategoryTypes([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) fetchCategoryTypes();
  }, [isOpen]);
 
  // Click handlers remain the same
  const sortCategoriesByOrder = (categories: CategoryType[]): CategoryType[] => {
    return [...categories].sort((a, b) => {
      const indexA = CATEGORY_ORDER.findIndex(
        order => order.toLowerCase() === a.category.toLowerCase()
      );
      const indexB = CATEGORY_ORDER.findIndex(
        order => order.toLowerCase() === b.category.toLowerCase()
      );
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  };
 

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: { opacity: 0, y: "-100vh" }
  };
  const handleCategoryClick = (category: string) => {
    window.location.href = `/products?category=${encodeURIComponent(category)}`;
  };

  const handleTypeClick = (category: string, type: string) => {
    window.location.href = `/products?category=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}`;
  };

  const handleSubcategoryClick = (category: string, subCategory: string) => {
    window.location.href = `/products?category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(subCategory)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          onClick={onClose}
        >
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-white shadow-xl rounded-t-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-cover bg-center text-white bg-blue-600">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">{t('navbar.title')}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              
            </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4">
              {/* User Section */}
              {user && (
                <div className="py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.prenom} {user.nom}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}
            {/* Account Section */}
            <div className="py-4 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 px-4">
                Account
              </h3>
              <div className="space-y-1">

                {user ? (
                  <>
                    <Link
                      href="/mes-commandes"
                      className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg"
                      onClick={onClose}
                    >
                      <ShoppingCart className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-800">{t('navbar.myOrders')}</span>
                    </Link>
                    <Link
                      href="/mon-profil"
                      className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg"
                      onClick={onClose}
                    >
                      <User2 className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-800">{t('navbar.myProfile')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 rounded-lg text-red-600"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>{t('navbar.logout')}</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg"
                    onClick={onClose}
                  >
                    <User2 className="h-5 w-5 text-blue-800" />
                    <span className="text-blue-800">{t('navbar.login')}</span>
                  </Link>
                )}
              </div>
            </div>

        

              {/* Categories */}
              <div className="py-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Menu
                </h3>
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-10 bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {categoryTypes.map((cat, index) => (
                      <motion.div
                        key={cat.category}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                      >
                        <motion.div
                          className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg"
                          whileHover={{ scale: 1.02 }}
                        >
                          <button
                            onClick={() => handleCategoryClick(cat.category)}
                            className="flex items-center space-x-2"
                          >
                            <LucideSquareActivity className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-gray-800">{cat.category}</span>
                          </button>
                          {(cat.types?.length > 0 || cat.subcategories?.length > 0) && (
                            <motion.button
                              onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
                              className="p-1 hover:bg-blue-100 rounded-full"
                              animate={{ rotate: openCategory === cat.category ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-5 w-5 text-gray-600" />
                            </motion.button>
                          )}
                        </motion.div>

                        <AnimatePresence>
                          {openCategory === cat.category && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-8 pl-3 border-l-2 border-blue-100"
                            >
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ staggerChildren: 0.05 }}
                              >
                                {cat.types?.length > 0 && (
                                  <div className="py-2 space-y-2">
                                    <h4 className="text-xs font-medium text-gray-500 uppercase">
                                      {t('navbar.types')}
                                    </h4>
                                    {cat.types.map((type) => (
                                      <motion.button
                                        key={type}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -10, opacity: 0 }}
                                        onClick={() => handleTypeClick(cat.category, type)}
                                        className="flex items-center w-full text-left p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                      >
                                        <SquareChevronRight className="m-1 h-5 w-5 text-blue-600" />
                                        {type}
                                      </motion.button>
                                    ))}
                                  </div>
                                )}
                                {cat.subcategories?.length > 0 && (
                                  <div className="py-2 space-y-2">
                                    <h4 className="text-xs font-medium text-gray-500 uppercase">
                                      {t('navbar.otherTypes')}
                                    </h4>
                                    {cat.subcategories.map((subcat) => (
                                      <motion.button
                                        key={subcat}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -10, opacity: 0 }}
                                        onClick={() => handleSubcategoryClick(cat.category, subcat)}
                                        className="flex items-center w-full text-left p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                      >
                                        {/* Center the icon and text */}
                                        <div className="flex items-center space-x-2 w-full">
                                          <SquareChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                          <span>{subcat}</span>
                                        </div>
                                      </motion.button>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="py-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Liens Rapides
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/apnee-du-sommeil"
                    className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <Heart className="h-6 w-6 text-blue-600 mb-1" />
                    <span className="text-sm font-medium">{t('navbar.sleepApnea')}</span>
                  </Link>
                  <Link
                    href="/services"
                    className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <Settings2 className="h-6 w-6 text-blue-600 mb-1" />
                    <span className="text-sm font-medium">{t('navbar.services')}</span>
                  </Link>
                  <Link
                    href="/a-propos"
                    className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <Info className="h-6 w-6 text-blue-600 mb-1" />
                    <span className="text-sm font-medium">{t('navbar.about')}</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <Phone className="h-6 w-6 text-blue-600 mb-1" />
                    <span className="text-sm font-medium">{t('navbar.contact')}</span>
                  </Link>
                  <Link
                    href="/appointment"
                    className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <Calendar className="h-6 w-6 text-blue-600 mb-1" />
                    <span className="text-sm font-medium">{t('navbar.appointment')}</span>
                  </Link>
                  <Link
                    href="/space-pro"
                    className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <User2 className="h-6 w-6 text-blue-600 mb-1" />
                    <span className="text-sm font-medium">Espace Professionnel</span>
                  </Link>
                </div>
              </div>


            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">

                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Elite Médicale Services</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavbar;