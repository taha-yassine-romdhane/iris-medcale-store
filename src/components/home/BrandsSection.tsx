'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

const brands = [
  {
    name: 'ResMed',
    logo: '/brands/ResMed.png',
  },
  {
    name: 'Löwenstein',
    logo: '/brands/Löwenstein.png',
  },
  {
    name: 'Yuwell',
    logo: '/brands/Yuwell.png',
  },
  {
    name: 'DeVilbiss Healthcare',
    logo: '/brands/DeVilbiss Healthcare.png',
  },
];

export default function BrandsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 1; // Initial scroll speed
    let isScrolling = true;

    const scroll = () => {
      if (!scrollContainer || !isScrolling) return;
      scrollContainer.scrollLeft += scrollSpeed;

      // Reset scroll position when reaching the end
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      }
    };

    const adjustSpeed = (event: WheelEvent) => {
      // Adjust scroll speed dynamically based on wheel event delta
      scrollSpeed = Math.max(1, Math.min(5, scrollSpeed + event.deltaY * 0.1));
    };

    const handleMouseEnter = () => {
      isScrolling = false; // Pause scrolling on hover
    };

    const handleMouseLeave = () => {
      isScrolling = true; // Resume scrolling on mouse leave
    };

    scrollContainer.addEventListener('wheel', adjustSpeed);
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    const intervalId = setInterval(scroll, 20);

    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('wheel', adjustSpeed);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 sm:mb-8">
          {t('home.brands.title')}
        </h2>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 sm:gap-12 items-center scroll-smooth hide-scrollbar"
            aria-label="Brand logos carousel"
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[120px] sm:min-w-[200px] px-2 sm:px-4 py-2 sm:py-4 group transition-transform hover:scale-105"
                role="listitem"
              >
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 mb-2 sm:mb-4 bg-white rounded shadow">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain p-2"
                    priority={index === 0} // Prioritize loading the first image
                  />
                </div>
                <h3 className="text-sm sm:text-lg font-medium text-blue-900">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}