'use client';

import Link from 'next/link';
import { LogOut, User2, X, Heart, Info, Phone, ChevronDown, ShoppingCart, Settings2, Activity, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import CartDropdown from './cart/CartDropdown';
 
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
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-50"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-white overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gray-900 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
                  <h2 className="text-lg font-semibold">{t('navbar.title')}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-md"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4">
              {/* User Section */}
              {user && (
                <div className="py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <User2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.prenom} {user.nom}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}
            {/* Account Section */}
            <div className="py-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">
                Account
              </h3>
              <div className="space-y-2">
                {user ? (
                  <>
                    <Link
                      href="/mes-commandes"
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md border border-gray-200"
                      onClick={onClose}
                    >
                      <ShoppingCart className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-900">{t('navbar.myOrders')}</span>
                    </Link>
                    <Link
                      href="/mon-profil"
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md border border-gray-200"
                      onClick={onClose}
                    >
                      <User2 className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-900">{t('navbar.myProfile')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 rounded-md border border-red-200 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('navbar.logout')}</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md border border-gray-200"
                    onClick={onClose}
                  >
                    <User2 className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-900">{t('navbar.login')}</span>
                  </Link>
                )}
              </div>
            </div>

        

              {/* Categories */}
              <div className="py-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">
                  Menu
                </h3>
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-10 bg-gray-100 animate-pulse rounded-md" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {categoryTypes.map((cat) => (
                      <div
                        key={cat.category}
                        className="border border-gray-200 rounded-md overflow-hidden"
                      >
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                          <button
                            onClick={() => handleCategoryClick(cat.category)}
                            className="flex items-center space-x-2 flex-1"
                          >
                            <Activity className="h-4 w-4 text-emerald-600" />
                            <span className="font-medium text-gray-900 text-left">{cat.category}</span>
                          </button>
                          {(cat.types?.length > 0 || cat.subcategories?.length > 0) && (
                            <button
                              onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
                              className="p-1 hover:bg-gray-100 rounded-md"
                            >
                              <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${
                                openCategory === cat.category ? 'rotate-180' : ''
                              }`} />
                            </button>
                          )}
                        </div>

                        {openCategory === cat.category && (
                          <div className="bg-gray-50 border-t border-gray-200">
                            <div className="p-3 space-y-2">
                              {cat.types?.length > 0 && (
                                <div className="space-y-1">
                                  <h4 className="text-xs font-medium text-gray-500 uppercase">
                                    {t('navbar.types')}
                                  </h4>
                                  {cat.types.map((type) => (
                                    <button
                                      key={type}
                                      onClick={() => handleTypeClick(cat.category, type)}
                                      className="flex items-center w-full text-left p-2 text-gray-600 hover:text-emerald-600 hover:bg-white rounded-md"
                                    >
                                      <ChevronRight className="h-3 w-3 text-emerald-600 mr-2" />
                                      {type}
                                    </button>
                                  ))}
                                </div>
                              )}
                              {cat.subcategories?.length > 0 && (
                                <div className="space-y-1">
                                  <h4 className="text-xs font-medium text-gray-500 uppercase">
                                    {t('navbar.otherTypes')}
                                  </h4>
                                  {cat.subcategories.map((subcat) => (
                                    <button
                                      key={subcat}
                                      onClick={() => handleSubcategoryClick(cat.category, subcat)}
                                      className="flex items-center w-full text-left p-2 text-gray-600 hover:text-emerald-600 hover:bg-white rounded-md"
                                    >
                                      <ChevronRight className="h-3 w-3 text-emerald-600 mr-2" />
                                      <span>{subcat}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="py-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">
                  Liens Rapides
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/apnee-du-sommeil"
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <Heart className="h-5 w-5 text-emerald-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900">{t('navbar.sleepApnea')}</span>
                  </Link>
                  <Link
                    href="/services"
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <Settings2 className="h-5 w-5 text-emerald-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900">{t('navbar.services')}</span>
                  </Link>
                  <Link
                    href="/a-propos"
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <Info className="h-5 w-5 text-emerald-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900">{t('navbar.about')}</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md flex flex-col items-center text-center"
                    onClick={onClose}
                  >
                    <Phone className="h-5 w-5 text-emerald-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900">{t('navbar.contact')}</span>
                  </Link>
           
                  <Link
                    href="/space-pro"
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md flex flex-col items-center text-center col-span-2"
                    onClick={onClose}
                  >
                    <User2 className="h-5 w-5 text-emerald-600 mb-1" />
                    <span className="text-xs font-medium text-gray-900">Espace Professionnel</span>
                  </Link>
                </div>
              </div>


            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-500 text-center">&copy; {new Date().getFullYear()} Iris Medical</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;