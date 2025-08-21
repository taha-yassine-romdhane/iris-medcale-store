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
  types: Array<{ original: string; display: string }>;
  subcategories: Array<{ original: string; display: string }>;
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
          types: Array.isArray(cat.types) ? cat.types.map(type => ({ original: type, display: type.toLowerCase() })) : [],
          subcategories: Array.isArray(cat.subcategories) ? cat.subcategories.map(subcat => ({ original: subcat, display: subcat.toLowerCase() })) : []
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
    <nav className="hidden md:block bg-gray-50 z-40 border-b border-gray-200 relative">
      {/* White gradient background for logo area */}
      <div className="absolute left-0 top-0 bottom-0 w-52 bg-gradient-to-r from-white via-white to-gray-50"></div>
      <div className="flex justify-start max-w-7xl mx-auto relative">
        <div className="flex items-center h-12 space-x-6 px-4 ml-48">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center"
          >
            {t('CategoryNavbar.home')}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1">
                <Menu className="h-4 w-4" />
                <span>{t('navbar.ourProducts')}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-white rounded-md shadow-lg border" align="start">
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
                    <DropdownMenuSubTrigger className="flex items-center justify-between py-2 px-3 hover:bg-gray-50">
                      <span className="font-medium text-gray-700 capitalize">{cat.category.toLowerCase()}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="min-w-[200px] bg-white rounded-md shadow-lg border">
                        <DropdownMenuItem 
                          className="py-2 px-3 hover:bg-gray-50 text-gray-700 font-medium"
                          onClick={() => handleCategoryClick(cat.category)}
                        >
                          {t('navbar.allProducts')}
                        </DropdownMenuItem>
                        {cat.types && cat.types.length > 0 && (
                          <>
                            <DropdownMenuSeparator className="bg-gray-200" />
                            <div className="py-1 px-3">
                              <span className="text-xs font-medium text-gray-500 uppercase">Types</span>
                            </div>
                            {cat.types.map((type) => (
                              <DropdownMenuItem 
                                key={type.original} 
                                className="py-2 px-3 hover:bg-gray-50 text-gray-700"
                                onClick={() => handleTypeClick(cat.category, type.original)}
                              >
                                <span className="capitalize">{type.display}</span>
                              </DropdownMenuItem>
                            ))}
                          </>
                        )}
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <>
                            <DropdownMenuSeparator className="bg-gray-200" />
                            <div className="py-1 px-3">
                              <span className="text-xs font-medium text-gray-500 uppercase">Autres-types</span>
                            </div>
                            {cat.subcategories.map((subcat) => (
                              <DropdownMenuItem 
                                key={subcat.original} 
                                className="py-2 px-3 hover:bg-gray-50 text-gray-700"
                                onClick={() => handleSubcategoryClick(cat.category, subcat.original)}
                              >
                                <span className="capitalize">{subcat.display}</span>
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

        <div className="flex items-center space-x-6 ml-auto px-4">
          {isSmallScreen ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1">
                  <Menu className="h-4 w-4" />
                  <span>Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white rounded-md shadow-lg border">
                <DropdownMenuItem asChild>
                  <Link href="/apnee-du-sommeil" className="w-full text-gray-700 hover:text-gray-900">
                    <Heart className="h-4 w-4 mr-2" />
                    {t('navbar.sleepApnea')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/a-propos" className="w-full text-gray-700 hover:text-gray-900">
                    <Info className="w-4 h-4 mr-2" />
                    {t('navbar.aboutUs')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="w-full text-gray-700 hover:text-gray-900">
                    <Phone className="w-4 h-4 mr-2" />
                    {t('navbar.contact')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/space-pro" className="w-full text-gray-700 hover:text-gray-900">
                    <User className="w-4 h-4 mr-2" />
                    {t('navbar.ourServices')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link 
                href="/apnee-du-sommeil" 
                className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
              >
                <Heart className="h-4 w-4" />
                {t('navbar.sleepApnea')}
              </Link>
              <Link 
                href="/a-propos" 
                className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
              >
                <Info className="w-4 h-4" />
                {t('navbar.aboutUs')}
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                {t('navbar.contact')}
              </Link>
              <Link 
                href="/space-pro" 
                className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
              >
                <User className="w-4 h-4" />
                {t('navbar.ourServices')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}