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

  useEffect(() => {
    const fetchCategoryTypes = async () => {
      try {
        const response = await fetch('/api/category-types');
        if (!response.ok) {
          throw new Error('Failed to fetch category types');
        }
        const data = await response.json();
        const processedData = data.map((cat: { category: string; types: string[]; subcategories: string[] }) => ({
          category: cat.category || '',
          types: Array.isArray(cat.types) ? cat.types : [],
          subcategories: Array.isArray(cat.subcategories) ? cat.subcategories : []
        }));
        setCategoryTypes(processedData);
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
    if (pathname !== '/products') return; // Only update filters on products page
    updateFilters({ category, type: null, subCategory: null });
  };

  const handleTypeClick = (category: string, type: string) => {
    if (pathname !== '/products') return;
    updateFilters({ category, type, subCategory: null });
  };

  const handleSubcategoryClick = (category: string, subCategory: string) => {
    if (pathname !== '/products') return;
    updateFilters({ category, type: null, subCategory });
  };

  return (
    <nav className="fixed top-16 left-0 right-0 bg-white z-40 border-t border-blue-100 font-spartan shadow-md">
      <div className="flex justify-start max-w-8xl mx-auto">
        <div className="flex items-center h-14 space-x-8 ml-[22%]">
          {/* Home Link */}
          <Link
            href="/"
            className=" flex items-center text-blue-900 hover:text-blue-600 transition-colors px-3 py-2 font-bold"
          >
            <Home className="h-5 w-5 mr-2" />
            Accueil
          </Link>
             {/* Categories Dropdown */}
             <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-blue-900 hover:text-blue-600 hover:bg-blue-50 transition-colors font-semibold"
              >
                <Menu className="h-5 w-5" />
                <span className="font-bold" >Catégories</span>
                <ChevronDown className="h-4 w-4 text-red-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-72 bg-white rounded-lg shadow-lg border border-blue-100"
              align="start"
            >
              {isLoading ? (
                <DropdownMenuItem disabled>
                  <span className="text-gray-500">Chargement...</span>
                </DropdownMenuItem>
              ) : categoryTypes.length === 0 ? (
                <DropdownMenuItem disabled>
                  <span className="text-gray-500">Aucune catégorie trouvée</span>
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
                        {pathname === '/products' ? (
                          <DropdownMenuItem
                            className="py-2 px-4 hover:bg-blue-50 text-blue-900 font-medium"
                            onClick={() => handleCategoryClick(cat.category)}
                          >
                            Tous les produits
                          </DropdownMenuItem>
                        ) : (
                          <Link href={`/products?category=${encodeURIComponent(cat.category)}`}>
                            <DropdownMenuItem className="py-2 px-4 hover:bg-blue-50 text-blue-900 font-medium">
                              Tous les produits
                            </DropdownMenuItem>
                          </Link>
                        )}

                        {cat.types && cat.types.length > 0 && (
                          <>
                            <DropdownMenuSeparator className="bg-blue-100" />
                            <div className="py-1 px-4">
                              <span className="text-xs font-semibold text-blue-600 uppercase">Types</span>
                            </div>
                            {cat.types.map((type) => (
                              pathname === '/products' ? (
                                <DropdownMenuItem
                                  key={type}
                                  className="py-2 px-4 hover:bg-blue-50 text-gray-700"
                                  onClick={() => handleTypeClick(cat.category, type)}
                                >
                                  {type}
                                </DropdownMenuItem>
                              ) : (
                                <Link
                                  key={type}
                                  href={`/products?category=${encodeURIComponent(cat.category)}&type=${encodeURIComponent(type)}`}
                                >
                                  <DropdownMenuItem className="py-2 px-4 hover:bg-blue-50 text-gray-700">
                                    {type}
                                  </DropdownMenuItem>
                                </Link>
                              )
                            ))}
                          </>
                        )}

                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <>
                            <DropdownMenuSeparator className="bg-blue-100" />
                            <div className="py-1 px-4">
                              <span className="text-xs font-semibold text-red-600 uppercase">Other Types</span>
                            </div>
                            {cat.subcategories.map((subcat) => (
                              pathname === '/products' ? (
                                <DropdownMenuItem
                                  key={subcat}
                                  className="py-2 px-4 hover:bg-blue-50 text-gray-700"
                                  onClick={() => handleSubcategoryClick(cat.category, subcat)}
                                >
                                  {subcat}
                                </DropdownMenuItem>
                              ) : (
                                <Link
                                  key={subcat}
                                  href={`/products?category=${encodeURIComponent(cat.category)}&subcategory=${encodeURIComponent(subcat)}`}
                                >
                                  <DropdownMenuItem className="py-2 px-4 hover:bg-blue-50 text-gray-700">
                                    {subcat}
                                  </DropdownMenuItem>
                                </Link>
                              )
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
            className=" flex items-center text-blue-900 hover:text-blue-600 transition-colors px-3 py-2 font-bold"
          >
            <Heart className="h-5 w-5 mr-2" />
            Apnée de sommeil
          </Link>
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
       
        </div>
      </div>
    </nav>
  );
}