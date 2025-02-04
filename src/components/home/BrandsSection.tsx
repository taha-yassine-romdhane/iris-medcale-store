'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';
import { motion } from 'framer-motion';

const brands = [
  {
    name: 'Yuwell',
    logo: '/brands/Yuwell.png',
  },
  {
    name: 'ResMed',
    logo: '/brands/ResMed.png',
  },
  {
    name: 'Löwenstein',
    logo: '/brands/Löwenstein.png',
  },
  {
    name: 'DeVilbiss Healthcare',
    logo: '/brands/DeVilbiss Healthcare.png',
  },
];

export default function BrandsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-12 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 sm:mb-8">
          {t('home.brands.title')}
        </h2>
        <div className="relative overflow-hidden">
          <div 
            className="flex animate-scroll"
            style={{
              animation: 'scroll 20s linear infinite',
              width: 'fit-content'
            }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 sm:gap-12 items-center">
                {brands.map((brand, index) => (
                  <motion.div
                    key={`${setIndex}-${index}`}
                    className="flex flex-col items-center min-w-[120px] sm:min-w-[200px] px-2 sm:px-4 py-2 sm:py-4 group"
                    whileHover={{ scale: 1.05, cursor: 'pointer' }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div 
                      className="relative w-16 h-16 sm:w-24 sm:h-24 mb-2 sm:mb-4 bg-white rounded shadow"
                      whileHover={{ y: -5 }}
                    >
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain p-2"
                        priority={index === 0 && setIndex === 0}
                      />
                    </motion.div>
                    <h3 className="text-sm sm:text-lg font-medium text-blue-900">
                      {brand.name}
                    </h3>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}