'use client';

import Image from 'next/image';
import { useTranslation } from '@/contexts/TranslationContext';

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
    <section className="py-12 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t('home.brands.title')}
          </h2>
          <p className="text-gray-500 text-sm">Trusted by leading medical equipment manufacturers</p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex animate-scroll"
            style={{
              animation: 'scroll 20s linear infinite',
              width: 'fit-content'
            }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-8 md:gap-12 items-center">
                {brands.map((brand, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="flex flex-col items-center min-w-[120px] md:min-w-[160px] px-4 py-4 group"
                  >
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 bg-white rounded-lg border border-gray-200 p-3 group-hover:border-gray-300 transition-colors duration-200">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        priority={index === 0 && setIndex === 0}
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-700 text-center">
                      {brand.name}
                    </h3>
                  </div>
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