'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

interface BreadcrumbsProps {
  productName?: string;
  categoryName?: string;
}

export default function Breadcrumbs({ productName, categoryName }: BreadcrumbsProps) {
  const { t } = useTranslation();
  const pathname = usePathname() || '';
  
  // Generate breadcrumb items based on the current path
  const generateBreadcrumbs = () => {
    const paths = pathname?.split('/').filter(Boolean) || [];
    const breadcrumbs = [];
    
    // Always add home
    breadcrumbs.push({
      name: t('navigation.home'),
      href: '/',
      current: paths.length === 0
    });
    
    // Handle different path patterns
    if (paths[0] === 'products') {
      breadcrumbs.push({
        name: t('navigation.products'),
        href: '/products',
        current: paths.length === 1
      });
      
      // If we have a category
      if (paths.length > 1 && paths[0] === 'products' && paths[1] === 'category') {
        breadcrumbs.push({
          name: categoryName || paths[2],
          href: `/products/category/${paths[2]}`,
          current: paths.length === 3
        });
      }
    } else if (paths[0] === 'product') {
      breadcrumbs.push({
        name: t('navigation.products'),
        href: '/products',
        current: false
      });
      
      // Add the product name as the last item
      breadcrumbs.push({
        name: productName || paths[1],
        href: `/product/${paths[1]}`,
        current: true
      });
    } else if (paths[0]) {
      // For other top-level pages
      breadcrumbs.push({
        name: t(`navigation.${paths[0]}`) || paths[0],
        href: `/${paths[0]}`,
        current: true
      });
    }
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Generate JSON-LD for breadcrumbs
  const generateBreadcrumbLD = () => {
    const itemListElement = breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': breadcrumb.name,
      'item': `${typeof window !== 'undefined' ? window.location.origin : ''}${breadcrumb.href}`
    }));
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': itemListElement
    };
  };
  
  return (
    <>
      <nav aria-label="Breadcrumb" className="py-3 px-4 text-sm">
        <ol className="flex items-center space-x-1">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />}
              
              {breadcrumb.current ? (
                <span className="text-gray-700 font-medium" aria-current="page">
                  {breadcrumb.name}
                </span>
              ) : (
                <Link 
                  href={breadcrumb.href}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      {/* Add JSON-LD structured data for breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbLD())
        }}
      />
    </>
  );
}
