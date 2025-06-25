'use client';

import Link from 'next/link';
import { ChevronDown, Heart, Info, Menu, Phone, User } from 'lucide-react';
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
import { useTranslation } from '@/contexts/TranslationContext';

interface CategoryType {
  category: string;
  types: string[];
  subcategories: string[];
}

const CATEGORY_ORDER = [
  'CPAP/PPC',
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

export default function CategoryNavbar() {
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1600 || window.innerHeight < 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    window.location.href = `/products?category=${encodeURIComponent(category)}`;
  };

  const handleTypeClick = (category: string, type: string) => {
    window.location.href = `/products?category=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}`;
  };

  const handleSubcategoryClick = (category: string, subCategory: string) => {
    window.location.href = `/products?category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(subCategory)}`;
  };

  return (
    <nav className="hidden md:block bg-gradient-to-r from-blue-100 via-white to-green-100 z-40 border-t border-green-100 font-spartan shadow-md">
      <div className="flex justify-start max-w-8xl mx-auto">
      <div className="flex items-center h-14 space-x-8 ml-0 md:ml-[300px] lg:ml-[22%]">
          <Link href="/" className="text-green-900 hover:text-green-600 text-lg hover:bg-green-50 rounded-lg px-2 py-1 font-semibold tracking-wide flex items-center space-x-2">
            <span>{t('CategoryNavbar.home')}</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-green-900 hover:text-green-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
                <Menu className="h-5 w-5" />
                <span className="flex items-center text-green-900 hover:text-green-600 transition-colors px-3 py-2 font-bold">
                  {t('navbar.ourProducts')}
                </span>
                <ChevronDown className="h-4 w-4 text-blue-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white rounded-lg shadow-lg border border-green-100" align="start">
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
                    <DropdownMenuSubTrigger className="flex items-center justify-between py-3 px-4 hover:bg-green-50 focus:bg-green-50">
                      <span className="font-semibold text-green-900">{cat.category}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="min-w-[200px] bg-white rounded-lg shadow-lg border border-green-100">
                        <DropdownMenuItem 
                          className="py-2 px-4 hover:bg-green-50 text-green-900 font-medium"
                          onClick={() => handleCategoryClick(cat.category)}
                        >
                          {t('navbar.allProducts')}
                        </DropdownMenuItem>
                        {cat.types && cat.types.length > 0 && (
                          <>
                            <DropdownMenuSeparator className="bg-green-100" />
                            <div className="py-1 px-4">
                              <span className="text-xs font-semibold text-green-600 uppercase">Types</span>
                            </div>
                            {cat.types.map((type) => (
                              <DropdownMenuItem 
                                key={type} 
                                className="py-2 px-4 hover:bg-green-50 text-green-900"
                                onClick={() => handleTypeClick(cat.category, type)}
                              >
                                {type}
                              </DropdownMenuItem>
                            ))}
                          </>
                        )}
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <>
                            <DropdownMenuSeparator className="bg-green-100" />
                            <div className="py-1 px-4">
                              <span className="text-xs font-semibold text-blue-600 uppercase">Autres-types</span>
                            </div>
                            {cat.subcategories.map((subcat) => (
                              <DropdownMenuItem 
                                key={subcat} 
                                className="py-2 px-4 hover:bg-green-50 text-green-900"
                                onClick={() => handleSubcategoryClick(cat.category, subcat)}
                              >
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
        </div>
        <div className="flex items-center space-x-4">
          {isSmallScreen ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-green-900 hover:text-green-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
                  <Menu className="h-5 w-5" />
                  <span>Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white rounded-lg shadow-lg border border-green-100">
                <DropdownMenuItem asChild>
                  <Link href="/apnee-du-sommeil" className="w-full text-green-900 hover:text-green-600">
                    <Heart className="h-5 w-5 mr-2" />
                    {t('navbar.sleepApnea')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/a-propos" className="w-full text-green-900 hover:text-green-600">
                    <Info className="w-5 h-5 mr-2" />
                    {t('navbar.aboutUs')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="w-full text-green-900 hover:text-green-600">
                    <Phone className="w-5 h-5 mr-2" />
                    {t('navbar.contact')}
                  </Link>
                </DropdownMenuItem>
            
                <DropdownMenuItem asChild>
                  <Link href="/space-pro" className="w-full text-green-900 hover:text-green-600">
                    <User className="w-5 h-5 mr-2" />
                    {t('navbar.ourServices')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/apnee-du-sommeil" className="text-green-900 hover:text-green-600 text-lg hover:bg-green-50 rounded-lg px-2 py-1 font-semibold tracking-wide flex items-center space-x-2">
                <Heart className="h-5 w-5 mr-2" />
                {t('navbar.sleepApnea')}
              </Link>
              <Link href="/a-propos" className="text-green-900 hover:text-green-600 text-lg hover:bg-green-50 rounded-lg px-2 py-1 font-semibold tracking-wide flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>{t('navbar.aboutUs')}</span>
              </Link>
              <Link href="/contact" className="text-green-900 hover:text-green-600 text-lg hover:bg-green-50 rounded-lg px-2 py-1 font-semibold tracking-wide flex items-center space-x-2">
                <Phone className="w-5 h-5 mr-2" />
                {t('navbar.contact')}
              </Link>
          
              <Link href="/space-pro" className="text-green-900 hover:text-green-600 text-lg hover:bg-green-50 rounded-lg px-2 py-1 font-semibold tracking-wide flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{t('navbar.ourServices')}</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}