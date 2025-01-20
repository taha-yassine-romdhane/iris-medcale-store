'use client';

import Link from 'next/link';
import { ChevronDown, Menu, Home, Heart } from 'lucide-react';
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
import { useEffect, useState } from 'react';
import { useFilters } from '@/contexts/FilterContext';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/context/TranslationContext';
import { useSearchParams } from 'next/navigation';

interface CategoryType {
  category: string;
  types: string[];
  subcategories: string[];
}

export default function CategoryNavbar() {
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { updateFilters } = useFilters();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const categoryOrder = [
    'APPAREILS CPAP/PPC',
    'ACCESSOIRES CPAP/PPC',
    'MASQUES',
    'CONCENTRATEURS D\'OXYGENE',
    'ACCESSOIRES D\'OXYGENE',
    'APPAREILS BIPAP/VNI',
    'APPAREILS NEBULISEUR',
    'APPAREILS ASPIRATUER',
    'LIT MEDICALISE'
  ];

  const sortCategories = (categories: CategoryType[]): CategoryType[] => {
    // Create a map for quick lookup of order, with trimmed categories
    const orderMap = new Map(categoryOrder.map((cat, index) => [cat.trim(), index]));
    
    return [...categories].sort((a, b) => {
      // Trim whitespace from categories before comparison
      const categoryA = a.category.trim();
      const categoryB = b.category.trim();
      
      const orderA = orderMap.get(categoryA);
      const orderB = orderMap.get(categoryB);
      
      // If both categories have a defined order
      if (orderA !== undefined && orderB !== undefined) {
        return orderA - orderB;
      }
      // If only a has a defined order
      if (orderA !== undefined) {
        return -1;
      }
      // If only b has a defined order
      if (orderB !== undefined) {
        return 1;
      }
      // If neither has a defined order
      return 0;
    });
  };

  useEffect(() => {
    const fetchCategoryTypes = async () => {
      try {
        const response = await fetch('/api/category-types');
        if (!response.ok) {
          throw new Error('Failed to fetch category types');
        }
        const data = await response.json();
        
        const processedData = data.map((cat: { category: string; types: string[]; subcategories: string[] }) => ({
          category: (cat.category || '').trim(), // Trim whitespace here too
          types: Array.isArray(cat.types) ? cat.types : [],
          subcategories: Array.isArray(cat.subcategories) ? cat.subcategories : []
        }));
        
        const sortedData = sortCategories(processedData);
        console.log('Raw data from API:', data);
        console.log('Processed data:', processedData);
        console.log('Sorted data:', sortedData);
        setCategoryTypes(sortedData);
      } catch (error) {
        console.error('Error fetching category types:', error);
        setCategoryTypes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryTypes();
  }, []);

  const handleCategoryClick = (category: string) => {
    const url = `/products?category=${encodeURIComponent(category)}`;
    
    if (pathname === '/products') {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };

  const handleTypeClick = (category: string, type: string) => {
    const url = `/products?category=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}`;
    
    if (pathname === '/products') {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };

  const handleSubcategoryClick = (category: string, subCategory: string) => {
    const url = `/products?category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(subCategory)}`;
    
    if (pathname === '/products') {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };

  return (
    <nav className="fixed top-16 left-0 right-0 bg-white z-40 border-t border-blue-100 font-spartan shadow-md">
      <div className="flex justify-start max-w-8xl mx-auto">
        <div className="flex items-center h-14 space-x-8 ml-[22%]">
          {/* Home Link */}
          <Link
            href="/"
            className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2"
          >
            <Home className="h-5 w-5 mr-2" />
            {t('CategoryNavbar.home')}
          </Link>
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2"
              >
                <Menu className="h-5 zw-5" />
                <span className="flex items-center text-blue-900 hover:text-blue-600 transition-colors px-3 py-2 font-bold">{t('navbar.ourProducts')}</span>
                <ChevronDown className="h-4 w-4 text-red-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-72 bg-white rounded-lg shadow-lg border border-blue-100"
              align="start"
            >
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
                      <DropdownMenuSubContent
                        className="min-w-[200px] bg-white rounded-lg shadow-lg border border-blue-100"
                      >
                        <DropdownMenuItem
                          className="py-2 px-4 hover:bg-blue-50 text-blue-900 font-medium"
                          onClick={() => handleCategoryClick(cat.category)}
                        >
                          {t('navbar.allProducts')}
                        </DropdownMenuItem>

                        {cat.types && cat.types.length > 0 && (
                          <>
                            <DropdownMenuSeparator className="bg-blue-100" />
                            <div className="py-1 px-4">
                              <span className="text-xs font-semibold text-blue-600 uppercase">Types</span>
                            </div>
                            {cat.types.map((type) => (
                              <DropdownMenuItem
                                key={type}
                                className="py-2 px-4 hover:bg-blue-50 text-gray-700"
                                onClick={() => handleTypeClick(cat.category, type)}
                              >
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
                              <DropdownMenuItem
                                key={subcat}
                                className="py-2 px-4 hover:bg-blue-50 text-gray-700"
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
          {/* Sleep Apnea Link */}
          <Link
            href="/apnee-du-sommeil"
            className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2"
          >
            <Heart className="h-5 w-5 mr-2" />
            {t('navbar.sleepApnea')}
          </Link>
          <Link href="/services" className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>{t('navbar.ourServices')}</span>
          </Link>
          <Link href="/a-propos" className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span>{t('navbar.aboutUs')}</span>
          </Link>
          <Link
            href="/contact"
            className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2"
          >
            <Phone className="w-5 h-5 mr-2" />
            {t('navbar.contact')}
          </Link>

          <Link
            href="/appointment"
            className="text-blue-900 hover:text-blue-600 text-lg font-semibold tracking-wide flex items-center space-x-2"
          >
            <Calendar className="w-5 h-5 mr-2" />
            <span>{t('navbar.makeAnAppointment')}</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}