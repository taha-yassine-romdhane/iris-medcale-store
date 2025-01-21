'use client';

import Link from 'next/link';
import { ChevronDown, Menu, Home, Heart, X, User } from 'lucide-react';
import { FileText, Info, Phone, Calendar } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from 'react'; 
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/context/TranslationContext';
import Image from 'next/image';

interface CategoryType {
  category: string;
  types: string[];
  subcategories: string[];
}

// Move categoryOrder outside the component as a constant
const CATEGORY_ORDER = [
  'APPAREILS CPAP/PPC',
  'CONCENTRATEURS D\'OXYGENE',
  'ACCESSOIRES D\'OXYGENE',
  'APPAREILS BIPAP/VNI',
  'APPAREILS NEBULISEUR',
  'APPAREILS ASPIRATUER',
  'LIT MEDICALISE'
] as const;

export default function CategoryNavbar() {
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  // Memoize sortCategories with no dependencies since it uses constant CATEGORY_ORDER
  const sortCategories = useCallback((categories: CategoryType[]): CategoryType[] => {
    const orderMap = new Map(CATEGORY_ORDER.map((cat, index) => [cat.trim(), index]));
    return [...categories].sort((a, b) => {
      const categoryA = a.category.trim();
      const categoryB = b.category.trim();
      const orderA = orderMap.get(categoryA);
      const orderB = orderMap.get(categoryB);
      if (orderA !== undefined && orderB !== undefined) return orderA - orderB;
      if (orderA !== undefined) return -1;
      if (orderB !== undefined) return 1;
      return 0;
    });
  }, []); 

  useEffect(() => {
    const fetchCategoryTypes = async () => {
      try {
        const response = await fetch('/api/category-types');
        if (!response.ok) throw new Error('Failed to fetch category types');
        const data = await response.json();
        const processedData = data.map((cat: { category: string; types: string[]; subcategories: string[] }) => ({
          category: (cat.category || '').trim(),
          types: Array.isArray(cat.types) ? cat.types : [],
          subcategories: Array.isArray(cat.subcategories) ? cat.subcategories : []
        }));
        const sortedData = sortCategories(processedData);
        setCategoryTypes(sortedData);
      } catch (error) {
        console.error('Error fetching category types:', error);
        setCategoryTypes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryTypes();
  }, [sortCategories]); 

  const handleCategoryClick = (category: string) => {
    const url = `/products?category=${encodeURIComponent(category)}`;
    if (pathname === '/products') router.push(url);
    else window.location.href = url;
    setIsMobileMenuOpen(false); 
  };

  const handleTypeClick = (category: string, type: string) => {
    const url = `/products?category=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}`;
    if (pathname === '/products') router.push(url);
    else window.location.href = url;
    setIsMobileMenuOpen(false); 
  };

  const handleSubcategoryClick = (category: string, subCategory: string) => {
    const url = `/products?category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(subCategory)}`;
    if (pathname === '/products') router.push(url);
    else window.location.href = url;
    setIsMobileMenuOpen(false); 
  };

  return (
    <nav className="fixed top-16 left-0 right-0 bg-white z-40 border-t border-blue-100 font-spartan shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden sm:flex justify-start max-w-8xl mx-auto">
        <div className="flex items-center h-14 space-x-8 ml-[22%]">
          {/* Home Link */}
          <Link href="/" className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
            <Home className="h-5 w-5 mr-2" />
            {t('CategoryNavbar.home')}
          </Link>
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
                <Menu className="h-5 w-5" />
                <span className="flex items-center text-blue-900 hover:text-blue-600 transition-colors px-3 py-2 font-bold">{t('navbar.ourProducts')}</span>
                <ChevronDown className="h-4 w-4 text-red-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white rounded-lg shadow-lg border border-blue-100" align="start">
              {isLoading ? (
                <DropdownMenuItem disabled>
                  <span className="text-gray-500">{t('CategoryNavbar.loading')}</span>
                </DropdownMenuItem>
              ) : categoryTypes.length === 0 ? (
                <DropdownMenuItem disabled>
                  <span className="text-gray-500">{t('CategoryNavbar.noCategories')}</span>
                </DropdownMenuItem>
              ) : (
                categoryTypes.map((cat) => (
                  <DropdownMenuSub key={cat.category}>
                    <DropdownMenuSubTrigger className="flex items-center justify-between py-3 px-4 hover:bg-blue-50 focus:bg-blue-50">
                      <span className="font-semibold text-blue-900">{cat.category}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="min-w-[200px] bg-white rounded-lg shadow-lg border border-blue-100">
                        <DropdownMenuItem className="py-2 px-4 hover:bg-blue-50 text-blue-900 font-medium" onClick={() => handleCategoryClick(cat.category)}>
                          {t('navbar.allProducts')}
                        </DropdownMenuItem>
                        {cat.types && cat.types.length > 0 && (
                          <>
                            <DropdownMenuSeparator className="bg-blue-100" />
                            <div className="py-1 px-4">
                              <span className="text-xs font-semibold text-blue-600 uppercase">Types</span>
                            </div>
                            {cat.types.map((type) => (
                              <DropdownMenuItem key={type} className="py-2 px-4 hover:bg-blue-50 text-gray-700" onClick={() => handleTypeClick(cat.category, type)}>
                                {type}
                              </DropdownMenuItem>
                            ))}
                          </>
                        )}
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <>
                            <DropdownMenuSeparator className="bg-blue-100" />
                            <div className="py-1 px-4">
                              <span className="text-xs font-semibold text-red-600 uppercase">Autres types</span>
                            </div>
                            {cat.subcategories.map((subcat) => (
                              <DropdownMenuItem key={subcat} className="py-2 px-4 hover:bg-blue-50 text-gray-700" onClick={() => handleSubcategoryClick(cat.category, subcat)}>
                                {subcat}
                              </DropdownMenuItem>
                            ))}
                          </>
                        )}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Other Links */}
          <Link href="/apnee-du-sommeil" className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
            <Heart className="h-5 w-5 mr-2" />
            {t('navbar.sleepApnea')}
          </Link>
         
          <Link href="/a-propos" className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span>{t('navbar.aboutUs')}</span>
          </Link>
          <Link href="/contact" className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
            <Phone className="w-5 h-5 mr-2" />
            {t('navbar.contact')}
          </Link>
          <Link href="/appointment" className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{t('navbar.makeAnAppointment')}</span>
          </Link>
          <Link href="#" className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>{t('navbar.ourServices')}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="sm:hidden flex justify-between items-center h-14 px-4 bg-white">
        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -ml-2 hover:bg-blue-50 transition-colors"
        >
          {isMobileMenuOpen ? 
            <X className="h-6 w-6 text-blue-900" /> : 
            <Menu className="h-6 w-6 text-blue-900" />
          }
        </Button>
        {/* Home Link */}
        <Link href="/" className="text-blue-900 font-semibold">
          <Image
            src="/logo_No_BG.png"
            alt="Logo"
            width={100}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Mobile Menu with Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 sm:hidden ${
          isMobileMenuOpen ? 'opacity-50 z-30' : 'opacity-0 -z-10'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Mobile Menu Content */}
      <div 
        className={`fixed top-14 left-0 right-0 bg-white z-40 shadow-lg sm:hidden transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          {/* Categories Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">
                {t('navbar.ourProducts')}
              </h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-blue-50 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-blue-900" />
              </button>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-900"></div>
              </div>
            ) : categoryTypes.map((cat) => (
              <div key={cat.category} className="mb-2 last:mb-0 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleCategoryClick(cat.category)}
                    className="flex-grow text-left font-medium text-blue-900 hover:text-blue-700 transition-colors py-3"
                  >
                    {cat.category}
                  </button>
                  {(cat.types?.length > 0 || cat.subcategories?.length > 0) && (
                    <button
                      onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
                      className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <ChevronDown 
                        className={`h-5 w-5 text-blue-900 transition-transform duration-200 ${
                          openCategory === cat.category ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openCategory === cat.category ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  {/* Types */}
                  {cat.types && cat.types.length > 0 && (
                    <div className="ml-4 py-2 space-y-2">
                      <div className="text-xs font-semibold text-blue-600 uppercase mb-2">Types</div>
                      {cat.types.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleTypeClick(cat.category, type)}
                          className="block w-full text-left text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-colors py-2 px-2 rounded"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Subcategories */}
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="ml-4 py-2 space-y-2">
                      <div className="text-xs font-semibold text-red-600 uppercase mb-2">Autres types</div>
                      {cat.subcategories.map((subcat) => (
                        <button
                          key={subcat}
                          onClick={() => handleSubcategoryClick(cat.category, subcat)}
                          className="block w-full text-left text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-colors py-2 px-2 rounded"
                        >
                          {subcat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-4 bg-gray-50">
            <Link 
              href="/apnee-du-sommeil" 
              className="flex items-center space-x-3 text-blue-900 hover:text-blue-700 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className="h-5 w-5" />
              <span className="font-medium">{t('navbar.sleepApnea')}</span>
            </Link>
            
            <Link 
              href="#" 
              className="flex items-center space-x-3 text-blue-900 hover:text-blue-700 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FileText className="h-5 w-5" />
              <span className="font-medium">{t('navbar.ourServices')}</span>
            </Link>
            
            <Link 
              href="/a-propos" 
              className="flex items-center space-x-3 text-blue-900 hover:text-blue-700 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Info className="h-5 w-5" />
              <span className="font-medium">{t('navbar.aboutUs')}</span>
            </Link>
            
            <Link 
              href="/contact" 
              className="flex items-center space-x-3 text-blue-900 hover:text-blue-700 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">{t('navbar.contact')}</span>
            </Link>
            
            <Link 
              href="/appointment" 
              className="flex items-center space-x-3 text-blue-900 hover:text-blue-700 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Calendar className="h-5 w-5" />
              <span className="font-medium">{t('navbar.makeAnAppointment')}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}